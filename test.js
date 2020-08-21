const {LOCAL_DATABASE, SECRET_KEY} = require('./config');

const Video = require('./Model/videoModel');
const User = require('./Model/userModel');

const generateToken = (user) => {
	return JWT.sign(
		{
			id: user.id,
			email: user.email,
			name: user.rname,
		},
		SECRET_KEY,
		{expiresIn: '1h'}
	);
};

const typeDefs = gql`
	type Users {
		id: ID!
		name: String!
		email: String!
		photo: String!
		createdAt: String!
	}
	type User {
		id: ID!
		email: String!
		token: String!
		name: String!
		createdAt: String!
	}
	input SingUpInput {
		name: String!
		password: String!
		passwordConfirm: String!
		email: String!
	}
	type Query {
		getUsers: [Users]
	}
	type Mutation {
		singUp(singupInput: SingUpInput): User!
	}
`;

const resolvers = {
	Query: {
		async getUsers() {
			try {
				const users = await User.find().sort({createdAt: -1});
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async singUp(_, {singupInput: {name, email, password, passwordConfirm}}) {
			const newUser = await User.create({
				name,
				email,
				password,
				passwordConfirm,
			});

			const token = generateToken(newUser);

			return {
				...newUser._doc,
				id: newUser._id,
				token,
			};
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});
