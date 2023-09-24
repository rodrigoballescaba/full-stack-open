const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

const initialBlogs = [
  {
    title: 'El internet de las cosas',
    author: 'Rodrigo B',
    url: 'https://google.com',
    likes: 100,
    user: new mongoose.Types.ObjectId('650f7e752a9e62908ab6434d')
  },
  {
    title: 'No hay paraiso',
    author: 'Sharay',
    url: 'https://instagram.com',
    likes: 10,
    user: new mongoose.Types.ObjectId('650f7e752a9e62908ab6434d')
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'No hay caramelos',
    author: 'Rodrigo B',
    url: 'https://google.com',
    likes: 100
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}