const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app);


 beforeEach(async () => {
	await Blog.deleteMany({})
    
    const postObjects = helper.initialPost
        .map(post => new Blog(post))
    const promiseArray = postObjects.map(post => post.save())
    await Promise.all(promiseArray)

    /* helper.initialPost.forEach( async (post) => {
        let blogObject = new Blog(post)
        await blogObject.save()
        console.log('saved')
    }) */
    
	
  }) 

test('posts are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

 test('all posts  are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialPost.length)
})

test('a specific post is withing returnedthe reutned posts', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(p => p.title)

    expect(contents).toContain(
        'Winds of Winter'
    )
}) 

test('a valid posts can be added', async () => {
    const newPost = {
        title: 'Coldrex - imeravim või eriti mürgine mürk',
        author: 'Andrei Redi',
        url: 'https://www.neti.ee'

    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = await response.body.map(p => p.title)
   
    expect(response.body.length).toBe(helper.initialPost.length + 1)
    expect(titles).toContain(
        'Coldrex - imeravim või eriti mürgine mürk'
    )
})

describe('deletion of post', () => {
    test('succeeds with status code 204 id id is valid', async () => {
        const postsAtStart = await helper.postsInDb()
        const postToDelete = postsAtStart[0]
        

        await api 
            .delete(`/api/blogs/${postToDelete.id}`)
            .expect(204)

        const postsAtEnd = await helper.postsInDb()

       

        expect(postsAtEnd.length).toBe(
            helper.initalPosts.lenght - 1
        )

        const titles = postsAtEnd.map(p => p.title)

        expect(titles).not.toContain(postToDelete.title)
    })
})




afterAll(() => {
	mongoose.connection.close();
});
