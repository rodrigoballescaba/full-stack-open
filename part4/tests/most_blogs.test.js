const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
  ]

  const listWithSeveralBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 0
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2
    }
  ]

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('when the list has only one blog, returns that author and blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const blog = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toEqual(blog)
  })

  test('from a larger list, the author with the most blogs is calculated', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogs)
    const blog = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(blog)
  })
})