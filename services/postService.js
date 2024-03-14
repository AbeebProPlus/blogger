const Post = require('../model/Post');
const User = require('../model/User');

const createPost = async (req, res) => {
    const { id, title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ 'message': 'Title, content' });
    }
    if (!id) return res.status(400).json({"message": "id required"})
    try {
        const foundUser = await User.findOne({
            _id: id
        }).exec()

        if (!foundUser) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        const createdPost = await Post.create({
            userId: foundUser.id, 
            title: title,
            content: content
        });
        console.log(createdPost);
        return res.status(201).json({ "message": "Post created successfully!" });
    } catch (err) {
        console.error("Error creating post:", err);
        return res.status(500).json({ "message": err.message });
    }
};

const updatePost = async (req, res) => {
    const {id, title, content} = req.body
    if (!id) return res.status(400).json({"message": "Provide post id"})
    if (!title && !content) return res.status(400).json({"message": "Provide title or content"})
    try{
        const foundPost = await Post.findOne({_id: id}).exec()
        if (!foundPost) return res.status(404).json({"message": `Post with id ${id} not found`})
        if (req.body?.title) foundPost.title = title
        if (req.body?.content) foundPost.content = content
        foundPost.edited = true
        foundPost.lastUdatedOn = Date.now()
        const editedPost = await foundPost.save()
        // console.log(editedPost)
        return res.status(200).json({"message": "Post edited successfully", editedPost})
    }catch(err){
        return res.status(500).json({"message": err.message})
    }

}

const getPost = async (req, res) => {
    if (!req.query?.id) return res.status(400).json({ "message": "Post ID param is required" });
    const postId = req.body.id
    try{
        const foundPost = await Post.findById(req.query.id)
        if (!foundPost) return res.status(404).json({"message": `Post with ID ${postId} not found`})
        return res.status(200).json({foundPost})
    }catch(err){
        return res.send(500).json({"message": err.message})
    }
}

const deletePost = async (req, res) => {
    if (!req.query?.id) return res.status(400).json({ "message": "Post ID query is required" });
    try{
        const deletedPost = await Post.findByIdAndDelete(req.query.id)
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        return res.sendStatus(500)
    }
}

module.exports = { createPost, updatePost, getPost, deletePost };
