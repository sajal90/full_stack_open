const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((s, b) => s + b.likes, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return {};
	}
	return blogs.reduce(
		(max, curr) => curr.likes > max.likes ? curr : max,
		blogs[0],
	);
};

module.exports = { dummy, totalLikes, favoriteBlog };
