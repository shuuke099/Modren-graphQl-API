const { gql } = require('apollo-server-express');
module.exports = gql`
  type Video {
    id: ID!
    title: String!
    description: String
    creator: User
    slug: String
    videoPath: String!
    thumbnail: String!
    comment: Boolean
    createdAt: String
  }

  input VideoInput {
    title: String
    description: String
    creator: String
    videoPath: String
    thumbnail: String
    comment: Boolean
  }

  extend type Query {
    getAllVideoS: [Video]!
    getOneVideo(videoId: ID!): Video!
    deleteVideo(videoId: ID!): String!
  }

  extend type Mutation {
    createVideo(videoInput: VideoInput): Video!
    updateVideo(videoId: ID!, videoInput: VideoInput): Video!
  }
`;
