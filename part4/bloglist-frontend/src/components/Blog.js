import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}{blog.userId}
  </div>
)

export default Blog