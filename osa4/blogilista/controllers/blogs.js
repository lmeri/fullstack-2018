const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
})

blogsRouter.post('/',  async (request, response) => {
    try {
        const blog = new Blog(request.body)

        if (blog.url === undefined || blog.title === undefined) {
            return response.status(400).json({ error: 'important information missing' })
        }

        if (blog.likes === undefined) {
            blog.likes = 0
        }
    
        const savedBlog = await blog.save()
        response.json(formatBlog(savedBlog))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

blogsRouter.delete('/:id',  async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
  
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).json({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id',  async (request, response) => {
    try {
        let blogObject = request.body
        await Blog.findByIdAndUpdate(request.params.id, blogObject)
        response.json(blogObject)
    } catch (exception) {
        console.log(exception)
        response.status(400).json({ error: 'malformatted id' })
    }
})

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

module.exports = blogsRouter