const Blog = require('../models/blog');
const User = require('../models/user');

const initialPost = [
	{
		title: 'Winds of Winter',
		author: 'GRRM',
		url: 'htttp; dsfasdfad'
	},
	{
		title: 'Miks programmeerimine on imelik ja tasuta kanaburger on inimõigus',
		author: 'Andrei Redi',
		url: 'htttp; dsfasdfad'
	}
];

const nonExistingId = async () => {
	const post = new Blog({ title: 'kustutamisele' });
	await post.save();
	await post.remove();

	return post._id.toString;
};

const postsInDb = async () => {
	const posts = await Blog.find({});
	return posts.map(post => post.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};

module.exports = {
	initialPost,
	nonExistingId,
    postsInDb,
    usersInDb
};
