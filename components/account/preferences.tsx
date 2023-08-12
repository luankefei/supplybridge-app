import { Stack } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import { useTranslation } from "react-i18next";

export default function Preferences() {
  const { t } = useTranslation();
  return (
    <Stack>
      <TitleText>Preferences</TitleText>
    </Stack>
  );
}
