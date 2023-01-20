import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserWidget = ({ userID, picturePath, friends }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.token;
  });
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userID}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //TODO: Handle all the loading states
  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    viewedProfile,
    impressions,
    occupation,
  } = user;
  return (
    <WidgetWrapper>
      {/* First ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${userID}`)}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  conter: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {friends.length} {t("friends")}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined color="primary" />
      </FlexBetween>
      <Divider />
      {/* Second ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="large"
            sx={{
              color: main,
            }}
          />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{
              color: main,
            }}
          />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* Third ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>{t("who_viewed_your_profile")}</Typography>
          <Typography color={medium} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>{t("impressions_text")}</Typography>
          <Typography color="primary" fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* Fourth ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={medium} fontWeight="500" mb="1rem">
          {t("socialProfiles")}
        </Typography>
        <FlexBetween gab="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={medium} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>{t("socialNetwork")}</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined color="primary" />
        </FlexBetween>
        <FlexBetween gab="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={medium} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>
                {t("socialNetworkLinkedin")}
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined color="primary" />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
