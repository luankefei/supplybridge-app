import { Button, Divider, Grid, Input, Paper, Stack } from "@mui/material";
import { SpacingVertical } from "components/ui-components/spacer";
import { STextBody16, TitleText } from "components/ui-components/text";
import { useTranslation } from "react-i18next";

export default function MyAccount() {
  const { t } = useTranslation("myAccount");
  return (
    <Stack
      width={"500px"}
      height={"400px"}
      bgcolor={"white"}
      borderRadius={2}
      m={1}
      p={4}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TitleText>{t("myAccount")}</TitleText>
        <Button variant="outlined">Log out</Button>
      </Stack>
      <SpacingVertical space="16px" />
      <Divider />
      <SpacingVertical space="16px" />
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={6}>
          <STextBody16>Email</STextBody16>
        </Grid>
        <Grid item xs={6}>
          <Input />
        </Grid>
        <Grid item xs={6}>
          <STextBody16>Display Name</STextBody16>
        </Grid>
        <Grid item xs={6}>
          <Input />
        </Grid>
      </Grid>
      <SpacingVertical space="16px" />
      <Divider />
      <SpacingVertical space="16px" />
    </Stack>
  );
}
