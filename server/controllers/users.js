import User from '../models/user.js';
/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({
            point: "getUser",
            message: "User not found"
        });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map(async (friend) => {
                const friendUser = await User.findById(friend);
                return friendUser;
            })
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return {
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath
            };
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({
            point: "getUserFriends",
            message: "Friends not found"
        });
    }
};

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        const isFriend = user.friends.includes(friendId);
        if (isFriend) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(async (friend) => {
                const friendUser = await User.findById(friend);
                return friendUser;
            })
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return {
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath
            };
        });

        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(404).json({
            point: "addRemoveFriend",
            message: "Friend not found"
        });
    }
};