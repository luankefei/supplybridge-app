import { Box, Stack } from "@mui/material";
import Icon from "components/icon";
import { SpacingVertical } from "components/ui-components/spacer";
import { SText } from "components/ui-components/text";
import { theme } from "config/theme";
import { useTranslation } from "react-i18next";

const EmptyResult = () => {
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <SpacingVertical space="160px" />
      <Icon src="backdrop-logo" width={82} height={82} />
      <SText
        fontSize="24px"
        color={theme.colors.secondary}
        textAlign={"center"}
      >
        {t("scout.result.empty.title", "No results matching to this search")}
        <br />
        {t(
          "scout.result.empty.subtitle",
          "Our SmartBridge AI will process the request"
        )}
      </SText>
    </Stack>
  );
};

export default EmptyResult;
