const {ApolloServer, PubSub} = require('apollo-server-express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	// a () => {} to build our context object.
	context: ({req}) => {
		// get the authorization from the request headers
		// return a context obj with our token. if any!
		const auth = req.headers.authorization || '';
		return {
			auth,
		};
	},
});
server.applyMiddleware({app});
const DB = process.env.LOCAL_DATABASE;

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.catch((err) => {
		console.log(Error, err.message);
	})
	.then(console.log('DB successfully connected'));

const port = process.env.PORT;

app.listen(port, () => console.log(`app is running on Port ${port}`));
