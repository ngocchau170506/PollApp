import voteService from '../services/voteService.js';
import sendResponse from '../utils/response.js';
import validate from '../utils/validate.js';

const voteController = {
  vote: async (req, res) => {
    try {
      const error = validate.vote(req.body);
      if (error) return sendResponse(res, false, error, null, 400);
      const poll = await voteService.vote(req.user.id, req.params.pollId, req.body.optionId);
      sendResponse(res, true, 'Voted successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  },

  unvote: async (req, res) => {
    try {
      const poll = await voteService.unvote(req.user.id, req.params.pollId);
      sendResponse(res, true, 'Unvoted successfully', poll);
    } catch (error) {
      sendResponse(res, false, error.message, null, 400);
    }
  }
};

export default voteController;