import React from 'react';

const BlogForm = ({
	handleSubmit,
	post,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange
}) => (
	<form onSubmit={handleSubmit}>
		<h3>Add Post</h3>
		Title
		<input value={post.title} onChange={handleTitleChange} />
		<br />
		Author
		<input value={post.author} onChange={handleAuthorChange} />
		<br />
		URL
		<input value={post.url} onChange={handleUrlChange} />
		<p>
			<button type="submit">save</button>
		</p>
	</form>
);

export default BlogForm;
