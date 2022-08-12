import { Schema, model } from 'mongoose';

const videoSchema = new Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const videoModel = model('videos', videoSchema);

export default videoModel;
