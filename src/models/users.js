import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  type: { type: String, required: true, lowercase: true, default: 'email' },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: String,
  location: { type: String, default: null },
  avatarUrl: { type: String, default: null },
  videos: [{ type: Schema.Types.ObjectId, ref: 'videos' }],
  socialOnly: { type: Boolean, default: false },
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const saltRounds = Number(process.env.HASH_ROUNDS);
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const userModel = model('users', userSchema);
export default userModel;
