const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + (blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((prevFavorite, currentBlog) => {
    return currentBlog.likes > (prevFavorite ? prevFavorite.likes : -1) ? currentBlog : prevFavorite
  }, null)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = blogs.reduce((counts, blog) => {
    const author = blog.author
    counts[author] = (counts[author] || 0) + 1
    return counts
  }, {})

  let mostAuthor = null
  let mostBlogsCount = 0

  for (const author in authorCounts) {
    if (authorCounts[author] > mostBlogsCount) {
      mostAuthor = author
      mostBlogsCount = authorCounts[author]
    }
  }

  return {
    author: mostAuthor,
    blogs: mostBlogsCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = blogs.reduce((likes, blog) => {
    const author = blog.author
    const blogLikes = blog.likes

    if (!likes[author]) {
      likes[author] = 0
    }

    likes[author] += blogLikes

    return likes
  }, {})

  let mostAuthor = null
  let mostLikesCount = 0

  for (const author in authorLikes) {
    if (authorLikes[author] > mostLikesCount) {
      mostAuthor = author
      mostLikesCount = authorLikes[author]
    }
  }

  return {
    author: mostAuthor,
    likes: mostLikesCount
  }
}

module.exports = {
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes,
  dummy
}