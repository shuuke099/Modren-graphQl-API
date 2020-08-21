const Video = require('../../Model/videoModel');

module.exports = {
  Query: {
    async getAllVideoS() {
      try {
        const video = await Video.find().sort({ createdAt: -1 });
        return video;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getOneVideo(_, { videoId }) {
      try {
        const video = await Video.findById(videoId);
        return video;
        if (!video) {
          throw new Error('video not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteVideo(_, { videoId }) {
      try {
        const video = await Video.findByIdAndDelete(videoId);
        return 'successfully deleted the video';
        if (!video) {
          throw new Error('video not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createVideo(
      _,
      {
        videoInput: {
          title,
          description,
          creator,
          videoPath,
          thumbnail,
          comment,
        },
      }
    ) {
      try {
        const video = await Video.create({
          title,
          description,
          creator,
          videoPath,
          thumbnail,
          comment,
        });

        return {
          ...video._doc,
          id: video._id,
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    async updateVideo(parent, args) {
      const video = await Video.findByIdAndUpdate(
        args.videoId,
        args.videoInput,
        {
          new: true,
          runValidators: true,
        }
      );
      return video;
    },
  },
  Video: {
    async creator(parent, args, context, info) {
      console.log(parent);
      const video = await parent.populate('creator').execPopulate();

      return video.creator;
    },
  },
};
