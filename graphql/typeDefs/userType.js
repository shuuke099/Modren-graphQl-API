const {gql} = require('apollo-server-express');
module.exports = gql`
	type User {
		id: ID!
		name: String
		token: String!
		email: String
		photo: String
		createdAt: String
	}

	input SingUpInput {
		name: String!
		password: String!
		passwordConfirm: String!
		email: String!
	}

	input SingInInput {
		email: String!
		password: String!
	}

	extend type Query {
		getAllUSers: [User]
		getOneUSer(userId: ID!): User!
		deleteUSer(userId: ID!): String!
	}

	extend type Mutation {
		singUp(singupInput: SingUpInput): User!
		singIn(singInInput: SingInInput): User!
	}
`;
