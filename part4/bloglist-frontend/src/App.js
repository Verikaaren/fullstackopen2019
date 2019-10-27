import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
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

	useEffect(() => {
		blogService.getAll().then(response => {
			setBlogs(response);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

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

		blogService.create(post).then(response => {
			setBlogs(blogs.concat(response));
		});

		setPost({});
	};

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<h3>Add Post</h3>
			Title
			<input
				value={post.title}
				onChange={({ target }) =>
					setPost({
						...post,
						title: target.value,
						userId: user.userId
					})
				}
			/>
			<br />
			Author
			<input
				value={post.author}
				onChange={({ target }) =>
					setPost({
						...post,
						author: target.value
					})
				}
			/>
			<br />
			URL
			<input
				value={post.url}
				onChange={({ target }) =>
					setPost({
						...post,
						url: target.value
					})
				}
			/>
			<p>
				<button type="submit">save</button>
			</p>
		</form>
	);

	

	return (
		<div className="App">
			{user === null ? (
				loginForm()
				
			) : (
				<div>
					<h1>Posts</h1>

					<h3>
						{`${user.name} is logged in`}
						<button
						 onClick={() => setUser(null)}>Log out</button>
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
