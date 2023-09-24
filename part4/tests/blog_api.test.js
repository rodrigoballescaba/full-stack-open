const helper = require('./test_helper')
const Blog = require('../models/blog')
const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'El internet de las cosas'
    )
  })

  test('verifies that the unique identifier property of the blog posts is called id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    blogsAtStart.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Rodrigo B',
      url: 'https://google.com',
      likes: 100
    }

    const userForToken = {
      username: 'root',
      id: new mongoose.Types.ObjectId('650f7e752a9e62908ab6434d')
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    )

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: 'Rodrigo B',
      likes: 100
    }

    const userForToken = {
      username: 'root',
      id: new mongoose.Types.ObjectId('650f7e752a9e62908ab6434d')
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    )

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if the likes property is missing in the request, it will have a default value of 0', async () => {
    const newBlog = {
      title: 'La luz del pantano',
      author: 'Rodrigo B',
      url: 'https://google.com'
    }

    const userForToken = {
      username: 'root',
      id: new mongoose.Types.ObjectId('650f7e752a9e62908ab6434d')
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    )

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const userForToken = {
      username: 'root',
      id: new mongoose.Types.ObjectId('650f7e752a9e62908ab6434d')
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    )

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogsAtEnd.content)
  })

  test('fails with status code 401 if token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
