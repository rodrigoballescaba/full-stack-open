import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [styleMessage, setStyleMessage] = useState(null)
  const blogFormRef = useRef()

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 5,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const notificationErrorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogApp')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogApp', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setStyleMessage(
        'error'
      )
      setNewMessage(
        'wrong username or password'
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setStyleMessage(
        'ok'
      )
      setNewMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
      )
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      setStyleMessage(
        'error'
      )
      setNewMessage(
        'Missing parameters'
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const updatedBlog = await blogService.update(blog.id, blogObject)
      setBlogs((prevBlogs) => {
        const updatedBlogs = prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        return updatedBlogs.sort((a, b) => b.likes - a.likes)
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs((prevBlogs) => {
          const removedBlogs = prevBlogs.filter((b) => b.id !== blog.id)
          return removedBlogs
        })
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const blogList = () => (
    <div>
      <span>{user.name} logged-in</span><button onClick={handleLogout}>logout</button>

      <p style={{ margin: '10px 0' }}></p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      <p style={{ margin: '20px 0' }}></p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ? <h2>log in to application</h2> : <h2>blogs</h2>}

      <Notification
        message={newMessage}
        notificationStyle={styleMessage === 'error' ? notificationErrorStyle : notificationStyle}
      />

      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App