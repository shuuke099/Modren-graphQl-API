const mongoose = require('mongoose');
const slugify = require('slugify');
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'video must have a title'],
  },
  description: String,
  videoPath: {
    type: String,
    required: [true, 'video must have a path'],
  },
  thumbnail: {
    type: String,
    required: [true, 'video must have a thumbnail'],
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'video must belong to user'],
    ref: 'User',
  },
  comment: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: String,
});

videoSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});


const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
