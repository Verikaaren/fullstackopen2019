import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import { useField } from './hooks';

import Blog from './components/Blog';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('mluukkai');

	const [password, setPassword] = useState('salainen');
	const [user, setUser] = useState(null);
	/* 	const [post, setPost] = useState({
		title: '',
		author: '',
		url: '',
		userId: ''
	}); */

	const title = useField('text');
	const author = useField('text');
	const url = useField('text');

	const blogFormRef = React.createRef();

	useEffect(() => {
		blogService.getAll().then(response => {
			setBlogs(response);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async event => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password
			});
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

			blogService.setToken(user.token);

			setUser(user);

			setUsername('');
			setPassword('');
		} catch (exception) {
			console.log('ERROR', exception);
		}
	};

	const loginForm = () => {
		return (
			<div>
				<h1>Login to Application</h1>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		);
	};

	const addBlog = event => {
		const post = {
			author: author.value,
			title: title.value,
			url: url.value,
			userId: user.userId
		};
		event.preventDefault();
		blogFormRef.current.toggleVisibility();

		blogService.create(post).then(response => {
			setBlogs(blogs.concat(response));
		});

		title.reset();
		author.reset();
		url.reset();
	};

	const blogForm = () => {
		/* const hidenWhenVisible = { display: blogVisible ? 'none' : '' };
		const showWhenVisible = { display: blogVisible ? '' : 'none' }; */

		return (
			<div>
				<Togglable buttonLabel="ADD POST" ref={blogFormRef}>
					<BlogForm
						title={title}
						author={author}
						url={url}
						handleSubmit={addBlog}
					/>
				</Togglable>
				{/* <button onClick={() => setBlogVisible(false)}>cancel</button> */}
			</div>
		);
	};

	return (
		<div className="App">
			{user === null ? (
				loginForm()
			) : (
				<div>
					<h1>Posts</h1>

					<h3>
						{`${user.name} is logged in`}
						<button onClick={() => setUser(null)}>Log out</button>
					</h3>

					{blogs.map(blog => (
						<Blog key={blog._id} blog={blog} />
					))}
					{blogForm()}
				</div>
			)}
		</div>
	);
};

export default App;
