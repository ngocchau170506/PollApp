import userService from '../services/userService.js';
import sendResponse from '../utils/response.js';

const userController = {
  register: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      if (role === 'admin' && (!req.user || req.user.role !== 'admin')) {
        return sendResponse(res, false, 'Only admins can create another admin', null, 403);
      }
      const user = await userService.register(username, password, role || 'user');
      sendResponse(res, true, 'User registered successfully', user, 201);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  login: async (req, res) => {
    try {
      const { user, token } = await userService.login(req.body.username, req.body.password);
      sendResponse(res, true, 'Login successful', { user, token });
    } catch (error) {
      sendResponse(res, false, error.message, null, 401);
    }
  },

  getProfile: async (req, res) => {
    try {
      if (!req.user) {
        return sendResponse(res, false, 'Authentication required', null, 401);
      }
      const user = await userService.getProfile(req.user.id);
      sendResponse(res, true, 'Get Profile successfully', user);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  updateProfile: async (req, res) => {
    try {
      if (!req.user) {
        return sendResponse(res, false, 'Authentication required', null, 401);
      }
      const user = await userService.updateProfile(req.user.id, req.body);
      sendResponse(res, true, 'Update Profile successfully', user);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  }
};

export default userController;