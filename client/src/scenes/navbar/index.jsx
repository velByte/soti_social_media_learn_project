import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Select,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { red } from "@mui/material/colors";
const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user;
  });
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // console.log(
  //   "🚀 ~ file: index.jsx:32 ~ Navbar ~ isNonMobileScreens",
  //   isNonMobileScreens
  // );
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const iconsConfig = {
    fontSize: "25px",
    ...(theme.palette.mode === "light" && { color: dark }),
  };
  // console.log(user);
  const fullName = `${user.firstName} ${user.lastName}`;

  const Logout = () => {
    return (
      <MenuItem
        onClick={() => {
          dispatch(setLogout());
          console.log("Logout");
          navigate("/");
        }}
      >
        Logout
      </MenuItem>
    );
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => {
            console.log("Logo clicked");
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          SOTI
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton
            onClick={() => {
              console.log("Theme color toggled");
              dispatch(setMode());
            }}
          >
            {theme.palette.mode === "light" ? (
              <DarkMode sx={iconsConfig} />
            ) : (
              <LightMode sx={iconsConfig} />
            )}
          </IconButton>
          <Message sx={iconsConfig} />
          <Notifications sx={iconsConfig} />
          <Help sx={iconsConfig} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography fontWeight="bold">{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => console.log("Setting")}>
                Settings
              </MenuItem>
              <Logout />
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu sx={iconsConfig} />
        </IconButton>
      )}
      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minHeight="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography fontWeight="bold">{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => console.log("Setting")}>
                  Settings
                </MenuItem>
                <Logout />
              </Select>
            </FormControl>
            <IconButton
              onClick={() => {
                console.log("Theme color toggled");
                dispatch(setMode());
              }}
            >
              {theme.palette.mode === "light" ? (
                <DarkMode sx={iconsConfig} />
              ) : (
                <LightMode sx={iconsConfig} />
              )}
            </IconButton>
            <Message sx={iconsConfig} />
            <Notifications sx={iconsConfig} />
            <Help sx={iconsConfig} />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
