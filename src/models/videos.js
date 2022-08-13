import { Schema, model } from 'mongoose';

const videoSchema = new Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, maxLength: 300 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, required: true, defult: 0 },
    rating: { type: Number, required: true, defult: 0 },
  },
});

const videoModel = model('videos', videoSchema);

export default videoModel;
