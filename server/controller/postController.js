import Post from '../model/Post.js';

const createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    handleError(res, error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    handleError(res, error);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user comments.user');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    handleError(res, error);
  }
};

export { createPost, getPosts, getPostById };