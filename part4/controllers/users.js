const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username === undefined) {
    return response.status(400).json({ error: 'username missing' })
  }

  if (body.password === undefined) {
    return response.status(400).json({ error: 'password missing' })
  }

  if (body.username.length < 3) {
    return response.status(400).json({ error: 'username must be longer than 2 characters' })
  }

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be longer than 2 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter