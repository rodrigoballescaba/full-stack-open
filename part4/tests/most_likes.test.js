const listHelper = require('../utils/list_helper')

describe('most likes', () => {
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
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when the list has only one blog, returns that author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const blog = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(blog)
  })

  test('from a larger list, the author with the most likes is calculated', () => {
    const result = listHelper.mostLikes(listWithSeveralBlogs)
    const blog = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(blog)
  })
})