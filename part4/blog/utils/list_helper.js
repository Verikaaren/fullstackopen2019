const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  let totalLikes = 0

  blogs.map(post => {
    totalLikes += post.likes
  })

  return totalLikes
}
  
  module.exports = {
    dummy,
    totalLikes,
  }