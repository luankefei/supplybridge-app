import { Box, Grid, Stack } from "@mui/material";
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
      <Grid container width={"100%"} gap={2}>
        <Grid item md={11.5} lg={7.5}>
          <SearchCriteria />
        </Grid>
        <Grid item md={11.5} lg={4}>
          <Favourite />
          <SpacingVertical space="24px" />
          <RawMaterial />
        </Grid>
      </Grid>
    </Stack>
  );
}
