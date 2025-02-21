import Message from '../model/Message.js';
import handleError from '../utils/errorHandler.js';

const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const message = new Message({ sender: req.user.id, recipient: recipientId, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    handleError(res, error);
  }
};

const getMessages = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: recipientId },
        { sender: recipientId, recipient: req.user.id },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    handleError(res, error);
  }
};

export { sendMessage, getMessages };