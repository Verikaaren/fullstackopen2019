import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	/* const [blogVisible, setBlogVisible] = useState(false); */
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('mluukkai');
	// const [userId, setUserId] = useState()
	const [password, setPassword] = useState('salainen');
	const [user, setUser] = useState(null);
	const [post, setPost] = useState({
		title: '',
		author: '',
		url: '',
		userId: ''
	});

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
		event.preventDefault();
		blogFormRef.current.toggleVisibility();

		blogService.create(post).then(response => {
			setBlogs(blogs.concat(response));
		});

		setPost({});
	};

	const blogForm = () => {
		/* const hidenWhenVisible = { display: blogVisible ? 'none' : '' };
		const showWhenVisible = { display: blogVisible ? '' : 'none' }; */

		return (
			<div>
				<Togglable buttonLabel="ADD POST" ref={blogFormRef}>
					<BlogForm
						post={post}
						handleTitleChange={({ target }) =>
							setPost({
								...post,
								title: target.value,
								userId: user.userId
							})
						}
						handleAuthorChange={({ target }) =>
							setPost({
								...post,
								author: target.value
							})
						}
						handleUrlChange={({ target }) =>
							setPost({
								...post,
								url: target.value
							})
						}
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
					{console.log(blogs)}
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
