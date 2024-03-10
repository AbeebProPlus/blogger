const Comment = require("../model/Comment");
const User = require("../model/User");
const Post = require("../model/Post");

const commentOnPost = async (req, res) => {
  const {content, postId, userId} = req.body;
  if (!content || !postId || !userId)
    return res
      .status(400)
      .json({message: "content, postId and userId are required"});
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({message: `User with ID ${userId} not found`});
    }
    const foundPost = await Post.findById(postId);
    if (!foundPost)
      return res.status(404).json({message: `Post with ${postId} not found`});
    const createdComment = await Comment.create({
      postId: postId,
      userId: userId,
      content: content,
    });
    foundPost.comments.push(createdComment);
    await foundPost.save();
    res.status(201).json({message: `Comment added to post with id ${postId}`});
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports = {commentOnPost};
