import pollService from '../services/pollService.js';
import sendResponse from '../utils/response.js';
import validate from '../utils/validate.js';

const pollController = {
  createPoll: async (req, res) => {
    try {
      const error = validate.createPoll(req.body);
      if (error) return sendResponse(res, false, error, null, 400);
      const poll = await pollService.createPoll(req.body, req.user.id);
      sendResponse(res, true, 'Create Poll successfully', poll, 201);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  getPolls: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const data = await pollService.getPolls(parseInt(page) || 1, parseInt(limit) || 10);
      sendResponse(res, true, 'Get all polls successfully', data);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  getPollById: async (req, res) => {
    try {
      const poll = await pollService.getPollById(req.params.id);
      sendResponse(res, true, 'Get poll successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 404);
    }
  },

  updatePoll: async (req, res) => {
    try {
      const poll = await pollService.updatePoll(req.params.id, req.body);
      sendResponse(res, true, 'Update Poll successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  lockPoll: async (req, res) => {
    try {
      const poll = await pollService.lockPoll(req.params.id);
      sendResponse(res, true, 'Locked Poll successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  unlockPoll: async (req, res) => {
    try {
      const poll = await pollService.unlockPoll(req.params.id);
      sendResponse(res, true, 'Unlocked Poll successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  addOption: async (req, res) => {
    try {
      const poll = await pollService.addOption(req.params.id, req.body.text);
      sendResponse(res, true, 'Added Option successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  removeOption: async (req, res) => {
    try {
      const poll = await pollService.removeOption(req.params.id, req.body.optionId);
      sendResponse(res, true, 'Option removed successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  }
};

export default pollController;