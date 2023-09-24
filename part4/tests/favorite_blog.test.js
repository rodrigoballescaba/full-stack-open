const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when the list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(blog)
  })

  test('from a larger list, the blog with the most likes is calculated', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    const blog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(blog)
  })
})