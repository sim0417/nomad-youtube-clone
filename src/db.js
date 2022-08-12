import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('MongoDB error : ', error);
});

db.on('open', () => {
  console.log('Connected to MongoDB');
});
