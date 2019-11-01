import React from 'react';


const BlogForm = ({
	handleSubmit,
	title,
	url,
	author
}) => (
	<form onSubmit={handleSubmit}>
		<h3>Add Post</h3>
		Title
		<input {...title} />
		<br />
		Author
		<input {...author} />
		<br />
		URL
		<input {...url} />
		<p>
			<button type="submit">save</button>
		</p>
	</form>
);



export default BlogForm;
