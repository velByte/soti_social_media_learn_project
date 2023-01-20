import mongoose from "mongoose";

//userId,
//firstName,
//lastName,
//location,
//description,
//userPicturePath,
//picturePath,
//likes,
//comments,


const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    location: String,
    description: {
        type: String,
        max: 500,
    },
    userPicturePath: {
        type: String,
        default: "",
    },
    picturePath: {
        type: String,
        default: "",
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
})

const Post = mongoose.model("Post", PostSchema);
export default Post;