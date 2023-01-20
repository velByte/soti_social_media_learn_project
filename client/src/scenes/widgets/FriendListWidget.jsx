import { Typography, useTheme, Box } from "@mui/material";
import Friend from "components/Friend";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendsListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { t } = useTranslation();

  const getFriends = async () => {
    let url = `http://localhost:3001/users/${userId}/friends`;
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{
          mb: "1rem",
        }}
      >
        {t("frienddListWidget_title")}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              userPicturePath={friend.picturePath}
              subtitle={friend.occupation}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
