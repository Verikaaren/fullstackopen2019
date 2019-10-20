const blogsRouter = require('express').Router();
const Blog = require('../models/blog');



blogsRouter.get('/', async (request, response) => {
	/* Blog.find({}).then(blogs => {
		response.json(blogs);
	}); */

	const blogs = await Blog.find({})
	response.json(blogs)
});

blogsRouter.post('/', async (request, response) => {
	const blog =  new Blog(request.body);

	try {
		const savedBlog = await blog.save()
		response.status(201).json(savedBlog.toJSON())
	} catch(exception) {
		next(exception)
	}

	/* blog.save().then(result => {
		response.status(201).json(result);
	}); */
});

blogsRouter.get('/:id', async(request, response, next) => {
	try{
		const post = await Blog.findById(request.params.id)
		if (post) {
			response.json(post.toJSON())
		} else {
			response.status(404).end()
		}
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try{
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} catch(exception) {
		next(exception)
	}
})



module.exports = blogsRouter;
