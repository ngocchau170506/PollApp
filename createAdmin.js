import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Already have admin');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('quangsanh1501', 10);
    const admin = new User({
      username: 'quangsanh',
      password: hashedPassword,
      role: 'admin'
    });
    await admin.save();
    console.log('Created Admin!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedAdmin();