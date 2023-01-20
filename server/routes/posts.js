import express from 'express';
import {
    getFeedPosts,
    getUserPosts,
    likePost,
} from '../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
//host:port/posts
//This route will return all the posts 
//from the Database
//NOTE: In Production we would want to limit the number of posts
//we would want to return only relevant posts for the user
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);
/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);
export default router;


