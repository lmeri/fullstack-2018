const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs, blogsInDb, usersInDb } = require('./test_helper')

beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added ', async () => {
    const blogObject = {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    }

    const initialBlogs = await blogsInDb()

    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
    const response = await blogsInDb()

    const titles = response.map(b => b.title)
  
    expect(response.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('TDD harms architecture')
})

test('blog with likes undefined gets likes set to 0', async () => {
    const blogObject = {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        __v: 0
    }

    const initialBlogs = await blogsInDb()

    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await blogsInDb()

    const likes = response.map(r => r.likes)

    expect(response.length).toBe(initialBlogs.length + 1)
    expect(likes).toContain(0)
})

test('blog without title and url is not added', async () => {
    const blogObject = {
        _id: '5a422bc61b54a676234d17fc',
        author: 'Robert C. Martin',
        likes: 2,
        __v: 0
    }

    const initialBlogs = await blogsInDb()

    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(400)

    const response = await blogsInDb()

    expect(response.length).toBe(initialBlogs.length)
})

test('remove blog', async () => {
    const initialBlogs = await blogsInDb()

    await api
        .delete('/api/blogs/' + initialBlogs[0].id)
        .expect(204)

    const response = await blogsInDb()

    expect(response.length).toBe(initialBlogs.length - 1)
})

test('update blog', async () => {
    const initialBlogs = await blogsInDb()
    const initialBlog = initialBlogs[0]
    const initialLikes = initialBlogs[0].likes
    initialBlog.likes = initialLikes + 1

    await api
        .put('/api/blogs/' + initialBlogs[0].id)
        .send(initialBlog)
        .expect(200)

    const response = await blogsInDb()
    const updatedBlog = response[0]

    expect(response.length).toBe(initialBlogs.length)
    expect(updatedBlog.likes).toBe(initialLikes + 1)
})

test('POST a new user', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
        age: true
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    const usernames = usersAfterOperation.map(u=>u.username)

    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    expect(usernames).toContain(newUser.username)
})


afterAll(() => {
    server.close()
})