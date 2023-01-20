import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    //TODO: Add the rest of the functions
    // getFriendsSuggestions,
    // getFriendsRequests,
    // acceptFriendRequest,
    // declineFriendRequest,
    // getFriends,
    // getFriendsPosts,
    // getFriendsPostsByCategory,
    // getFriendsPostsBySearch,
    // getFriendsPostsByDate,
    // getFriendsPostsByCategoryAndSearch,
    // getFriendsPostsByCategoryAndDate,
    // getFriendsPostsBySearchAndDate,
    // getFriendsPostsByCategoryAndSearchAndDate,

} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
//host:port/users/:id
router.get("/:id", verifyToken, getUser);
//host:port/users/:id/friends
router.get("/:id/friends", verifyToken, getUserFriends);
/* UPDATE */
//host:port/users/:id/:friendId
router.patch("/:id/friends/:friendId", verifyToken, addRemoveFriend);

export default router;