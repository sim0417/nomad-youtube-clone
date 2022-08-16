import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  type: { type: String, required: true, lowercase: true, default: 'email' },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: String,
  location: { type: String, default: null },
  avatarUrl: { type: String, default: null },
});

userSchema.pre('save', async function () {
  const saltRounds = Number(process.env.HASH_ROUNDS);
  const hashPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashPassword;
});

const userModel = model('users', userSchema);
export default userModel;
