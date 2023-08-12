import { Stack } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import { useTranslation } from "react-i18next";

export default function FileManagement() {
  const { t } = useTranslation();
  return (
    <Stack>
      <TitleText>File Management</TitleText>
    </Stack>
  );
}
