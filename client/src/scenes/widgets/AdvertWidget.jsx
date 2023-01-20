import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useTranslation } from "react-i18next";
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const { t } = useTranslation();

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          {t("sponsored")}
        </Typography>
        <Typography color={medium}>{t("create_ad")}</Typography>
      </FlexBetween>
      <img
        width="100%"
        heigth="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>RandomCosmetics</Typography>
        <Typography color={medium}>@randomcosmetics</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem">
        {t("advert_text")}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
