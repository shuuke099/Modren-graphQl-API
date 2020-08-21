const userResolvers = require('./users');
const videoResolvers = require('./videos');

module.exports ={
  Query: {
    ...userResolvers.Query,
    ...videoResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...videoResolvers.Mutation,
  },
  Video: {
    ...videoResolvers.Video
  }
};

 
