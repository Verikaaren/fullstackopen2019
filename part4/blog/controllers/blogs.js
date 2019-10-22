const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog');
const User = require('../models/user');

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		return authorization.substring(7)
	}

	return null
}

blogsRouter.get('/', async (request, response) => {
	/* Blog.find({}).then(blogs => {
		response.json(blogs);
	}); */

	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body;
	
	const token = getTokenFrom(request);

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({error: 'token missing or invalid'})

		}
		
	
	
	const user = await User.findById(body.userId);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		user: user._id,
		likes: body.likes
	});

	
		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();
		response.status(201).json(savedBlog.toJSON());
	} catch (exception) {
		next(exception);
	}

	/* blog.save().then(result => {
		response.status(201).json(result);
	}); */
});

blogsRouter.get('/:id', async (request, response, next) => {
	try {
		const post = await Blog.findById(request.params.id);
		if (post) {
			response.json(post.toJSON());
		} else {
			response.status(404).end();
		}
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
