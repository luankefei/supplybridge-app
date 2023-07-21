import { Box, Stack } from "@mui/material";
import Icon from "components/Icon";
import { SpacingVertical } from "components/ui-components/spacer";
import { SText } from "components/ui-components/text";
import { theme } from "config/theme";

const EmptyResult = () => {
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
        No results matching to this search
        <br />
        Our SmartBridge AI will process the request
      </SText>
    </Stack>
  );
};

export default EmptyResult;
