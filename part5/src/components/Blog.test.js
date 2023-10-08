import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Sample Blog',
    author: 'John Doe',
    url: 'https://sampleblog.com',
    likes: 10,
    user: {
      username: 'johndoe',
    },
  };

  const user = {
    username: 'johndoe',
  };

  test('initially show title and author, hides URL and likes', () => {
    const component = render(<Blog blog={blog} user={user} updateBlog={()=>{}} removeBlog={()=>{}}/>);
    
    expect(component.container.querySelector('#blog-preview')).toHaveStyle('display: block')
    expect(component.container.querySelector('#blog-complete')).toHaveStyle('display: none')
  });

  test('displays URL and likes when "view" button is clicked', () => {
    const component = render(<Blog blog={blog} user={user} updateBlog={()=>{}} removeBlog={()=>{}}/>);
    
    fireEvent.click(component.getByText('view'));
    
    expect(component.container.querySelector('#blog-preview')).toHaveStyle('display: none')
    expect(component.container.querySelector('#blog-complete')).toHaveStyle('display: block')
  });

  test('clicking the button twice triggers the event handler twice', async () => {
    const blog = {
      title: 'El círculo',
      author: 'Rodrigo B',
      user: {username: "root"}
    }
  
    const user = {
      username: "root"
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Blog key={blog.id} blog={blog} updateBlog={mockHandler} removeBlog={()=>{}} user={user} />
    )
  
    const userE = userEvent.setup()
    const button = screen.getByText('like')
    await userE.click(button)
    await userE.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
});
