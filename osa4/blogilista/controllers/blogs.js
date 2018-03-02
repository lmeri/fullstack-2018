const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1})
    response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id',  async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (blog) {
            response.json(Blog.format(blog))
        } else {
            response.status(404).json({ error: 'cannot find blog' })
        }
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

blogsRouter.post('/',  async (request, response) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (body.url === undefined || body.title === undefined) {
            return response.status(400).json({ error: 'important information missing' })
        }

        if (body.likes === undefined) {
            body.likes = 0
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog(body)
        blog.user = user._id
    
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(Blog.format(savedBlog))
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError' ) {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.delete('/:id',  async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(request.params.id)

        if (decodedToken.id.toString() === blog.user.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'action not allowed for this user' })
        }
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

module.exports = blogsRouter