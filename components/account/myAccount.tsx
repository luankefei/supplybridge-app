import { Stack } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import { useTranslation } from "react-i18next";

export default function MyAccount() {
  const { t } = useTranslation();
  return (
    <Stack>
      <TitleText>My Account</TitleText>
    </Stack>
  );
}
