import Poll from '../models/Poll.js';

const pollService = {
  createPoll: async (data, creatorId) => {
    const poll = new Poll({ ...data, creator: creatorId });
    await poll.save();
    return poll;
  },

  getPolls: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const polls = await Poll.find().skip(skip).limit(limit).populate('creator', 'username');
    const total = await Poll.countDocuments();
    return { polls, total, page, limit };
  },

  getPollById: async (id) => {
    const poll = await Poll.findById(id).populate('creator', 'username').populate('options.userVotes', 'username');
    if (!poll) throw new Error('Poll not found');
    return poll;
  },

  updatePoll: async (id, data) => {
    const poll = await Poll.findByIdAndUpdate(id, data, { new: true });
    if (!poll) throw new Error('Poll not found');
    return poll;
  },

  lockPoll: async (id) => {
    const poll = await Poll.findByIdAndUpdate(id, { isLocked: true }, { new: true });
    if (!poll) throw new Error('Poll not found');
    return poll;
  },

  unlockPoll: async (id) => {
    const poll = await Poll.findByIdAndUpdate(id, { isLocked: false }, { new: true });
    if (!poll) throw new Error('Poll not found');
    return poll;
  },

  addOption: async (pollId, text) => {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll not found');
    poll.options.push({ text });
    await poll.save();
    return poll;
  },

  removeOption: async (pollId, optionId) => {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll not found');
    poll.options = poll.options.filter(opt => opt.id.toString() !== optionId);
    await poll.save();
    return poll;
  }
};

export default pollService;