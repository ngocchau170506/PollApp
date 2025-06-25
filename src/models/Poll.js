import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  options: [{
    id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    userVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isLocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

export default mongoose.model('Poll', pollSchema);