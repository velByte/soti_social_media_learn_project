import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidgets from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendsListWidget from "scenes/widgets/FriendListWidget";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { _id, picturePath, friends } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "22%" : undefined}>
          <UserWidget
            userID={_id}
            picturePath={picturePath}
            friends={friends}
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidgets userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0">
              <FriendsListWidget userId={_id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default HomePage;
