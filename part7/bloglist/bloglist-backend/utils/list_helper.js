const lodash = require("lodash");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((s, b) => s + b.likes, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}
	return blogs.reduce(
		(max, curr) => curr.likes > max.likes ? curr : max,
		blogs[0],
	);
};

const mostBlogs = (blogs) => {
	const authors = lodash.countBy(blogs, "author");
	let max = -1;
	let maxVal = {};
	for (const name in authors) {
		if (authors[name] > max) {
			maxVal.author = name;
			max = authors[name];
			maxVal.blogs = max;
		}
	}
	return maxVal;
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return {};
	}

	const authors = lodash.groupBy(blogs, "author");
	let sums = [];
	for (const author in authors) {
		sums.push(
			{ author: author, likes: lodash.sumBy(authors[author], "likes") },
		);
	}
	const answer = sums.reduce(
		(max, curr) => curr.likes > max.likes ? curr : max,
		sums[0],
	);
	return answer;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
