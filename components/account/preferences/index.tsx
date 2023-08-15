import { Box, Stack } from "@mui/material";
import { SpacingVertical } from "components/ui-components/spacer";
import { STextSecondary } from "components/ui-components/text";
import { useTranslation } from "react-i18next";
import SearchCriteria from "./searchCriteria";
import RawMaterial from "./rawMaterial";
import Favourite from "./favourite";

export default function Preferences() {
  const { t } = useTranslation("myAccount");
  return (
    <Stack width={"100%"} p={"0 24px"}>
      <STextSecondary>{t("preferencesSubtitle")}</STextSecondary>
      <SpacingVertical space={"12px"} />
      <Stack direction={"row"} spacing={2} width={"100%"}>
        <Box flex={2}>
          <SearchCriteria />
        </Box>
        <Box flex={1}>
          <Favourite />
          <SpacingVertical space="24px" />
          <RawMaterial />
        </Box>
      </Stack>
    </Stack>
  );
}
