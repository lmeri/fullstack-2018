const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { blogs, usersInDb } = require('./test_helper')

describe('at start one user in db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })
  
    test('POST a new user succeeds', async () => {
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
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
        const usernames = usersAfterOperation.map(u=>u.username)
        expect(usernames).toContain(newUser.username)
    })
})

test('POST cannot create account with username that is taken', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
        age: true
    }
  
    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
    expect(result.body).toEqual({ error: 'username must be unique'})
  
    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
})

test('POST cannot create account with password less than 3 characters', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
        username: 'noot',
        name: 'Superuser',
        password: 's',
        age: true
    }
  
    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
    expect(result.body).toEqual({ error: 'password must be minimum 3 characters'})
  
    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
})

test('POST if age is not given default is true', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
        username: 'poot',
        name: 'Superuser',
        password: 'salainen'
    }
  
    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const ages = usersAfterOperation.map(u => u.age)
    expect(ages).toContain(newUser.age)
})

afterAll(() => {
    server.close()
})