import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div id='blog-preview' style={hideWhenVisible}>
        <span>{blog.title}</span> <span>{blog.author}</span> <button onClick={toggleVisibility}>view</button>
      </div>
      <div id='blog-complete' style={showWhenVisible}>
        <span>{blog.title}</span> <button onClick={toggleVisibility}>hide</button>
        <br />
        <span>{blog.url}</span>
        <br />
        likes <span id="like-count" >{blog.likes}</span> <button id="button-like" onClick={() => updateBlog(blog)}>like</button>
        <br />
        <span>{blog.author}</span>
        <br />
        {user.username === blog.user.username && <button onClick={() => removeBlog(blog)}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog