import { Star } from "@mui/icons-material";
import { Stack, useTheme } from "@mui/material";
import Layout from "components/layout";
import PoweredBy from "components/ui-components/poweredBy";
import { SpacingVertical } from "components/ui-components/spacer";
import {
  STextBody,
  STextCaption,
  STextH1,
} from "components/ui-components/text";

export default function Notification() {
  const theme = useTheme();
  return (
    <Layout pageTitle="Notification">
      <Stack alignItems={"center"} p={10}>
        <STextH1>Notification Center</STextH1>
        <SpacingVertical space="8px" />
        <PoweredBy />
        <SpacingVertical space="48px" />
        <Star
          sx={{
            fontSize: 50,
            color: "#E5E7EB", //"#FFC107",
          }}
        />
        <STextBody color={theme.palette.text.secondary}>
          No more notifications.
        </STextBody>
      </Stack>
    </Layout>
  );
}
