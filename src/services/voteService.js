import Poll from '../models/Poll.js';
import Vote from '../models/Vote.js';

const voteService = {
  vote: async (userId, pollId, optionId) => {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error('Poll not found');
    if (poll.isLocked) throw new Error('Poll is locked');
    if (!poll.options.find(opt => opt.id.toString() === optionId)) throw new Error('Invalid option');

    const existingVote = await Vote.findOne({ user: userId, poll: pollId });
    if (existingVote) throw new Error('User already voted');

    const vote = new Vote({ user: userId, poll: pollId, optionId });
    await vote.save();

    const option = poll.options.find(opt => opt.id.toString() === optionId);
    option.votes += 1;
    option.userVotes.push(userId);
    await poll.save();

    return poll;
  },

  unvote: async (userId, pollId) => {
    const vote = await Vote.findOneAndDelete({ user: userId, poll: pollId });
    if (!vote) throw new Error('Vote not found');

    const poll = await Poll.findById(pollId);
    const option = poll.options.find(opt => opt.id.toString() === vote.optionId.toString());
    option.votes -= 1;
    option.userVotes = option.userVotes.filter(id => id.toString() !== userId);
    await poll.save();

    return poll;
  }
};

export default voteService;