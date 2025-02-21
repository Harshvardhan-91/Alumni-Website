import Connection from '../model/Connection.js';
import handleError  from '../utils/errorHandler.js';

const sendConnectionRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const connection = new Connection({ requester: req.user.id, recipient: recipientId });
    await connection.save();
    res.status(201).json({ message: 'Connection request sent' });
  } catch (error) {
    handleError(res, error);
  }
};

const getConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [
        { requester: req.user.id },
        { recipient: req.user.id },
      ],
      status: 'accepted',
    }).populate('requester recipient');
    res.json(connections);
  } catch (error) {
    handleError(res, error);
  }
};

const updateConnectionStatus = async (req, res) => {
  try {
    const { connectionId, status } = req.body;
    const connection = await Connection.findByIdAndUpdate(connectionId, { status }, { new: true });
    res.json(connection);
  } catch (error) {
    handleError(res, error);
  }
};

export { sendConnectionRequest, getConnections, updateConnectionStatus };