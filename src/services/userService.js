import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userService = {
  register: async (username, password, role = 'user') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    return user;
  },

  login: async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  },

  getProfile: async (userId) => {
    return await User.findById(userId).select('-password');
  },

  updateProfile: async (userId, data) => {
    return await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');
  }
};

export default userService;