import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
const Message = mongoose.model('Message', messageSchema);
export default Message;