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

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url:
			"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url:
			"http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

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
