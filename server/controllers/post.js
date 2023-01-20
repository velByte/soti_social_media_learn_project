import Post from '../models/post.js';
import User from '../models/user.js';
/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: {},
        });
        await newPost.save();
        //Grab all posts
        const post = await Post.find();

        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({
            point: "createPost",
            message: error.message,
        });

    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            point: "getPosts",
            message: error.message,
        })
    }
}
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        //Get Post ID
        const { id } = req.params;
        //Get User ID
        const { userId } = req.body;
        //Find Post
        const post = await Post.findById(id);
        //Check if user has already liked the post
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            //If liked, remove like
            post.likes.delete(userId);
        } else {
            //If not liked, add like
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(404).json({
            point: "likePost",
            message: error.message,
        })
    }
}