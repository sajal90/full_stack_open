const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book.js");
const Author = require("./models/author.js");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message);
	});

let authors = [
	{
		name: "Robert Martin",
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: "Martin Fowler",
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963,
	},
	{
		name: "Fyodor Dostoevsky",
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821,
	},
	{
		name: "Joshua Kerievsky", // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: "Sandi Metz", // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
];

let books = [
	{
		title: "Clean Code",
		published: 2008,
		author: "Robert Martin",
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Agile software development",
		published: 2002,
		author: "Robert Martin",
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ["agile", "patterns", "design"],
	},
	{
		title: "Refactoring, edition 2",
		published: 2018,
		author: "Martin Fowler",
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Refactoring to patterns",
		published: 2008,
		author: "Joshua Kerievsky",
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "patterns"],
	},
	{
		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
		published: 2012,
		author: "Sandi Metz",
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "design"],
	},
	{
		title: "Crime and punishment",
		published: 1866,
		author: "Fyodor Dostoevsky",
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "crime"],
	},
	{
		title: "Demons",
		published: 1872,
		author: "Fyodor Dostoevsky",
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "revolution"],
	},
];

const typeDefs = `
	type Query {
		bookCount: Int!,
		authorCount: Int!,
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!,
			author: String!,
			published: Int!,
			genres: [String!]!,
		): Book!
		editAuthor(
			name: String!,
			setBornTo: Int!,
		): Author
	}

	type Author {
		name: String!,
		id: ID!,
		born: Int,
		bookCount: Int,
	}

	type Book {
		title: String!,
		published: Int!,
		author: Author!,
		id: ID!,
		genres: [String!]!,
	}
`;

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			const query = {};
			if (args.author) {
				query.author = args.author;
			}
			if (args.genre) {
				query.genre = { $in: [args.genre] };
			}

			return Book.find(query);
		},
		allAuthors: async () => {
			const authors = await Author.find({});

			const authorsWithCounts = await Promise.all(
				authors.map(async (a) => {
					const bookCount = await Book.countDocuments({
						author: a.name,
					});
					return { ...a.toObject(), bookCount };
				}),
			);

			return authorsWithCounts;
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			let author = authors.find((a) => a.name == args.author);
			if (!author) {
				author = new Author({ name: args.author });
				await author.save();
			}
			const book = new Book({ ...args, author: author._id });
			await book.save();
			return book;
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name });
			if (!author) {
				return null;
			}
			author.born = args.setBornTo;

			await author.save();
			return author;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
