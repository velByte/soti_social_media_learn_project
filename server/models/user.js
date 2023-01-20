import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    viewedProfile: Number,
    impressions: Number,
    occupation: String,

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;


//firstName, lastName, email, picturePath, friends, location, viewedProfile, impressions, occupation