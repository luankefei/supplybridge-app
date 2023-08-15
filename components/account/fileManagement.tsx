import { Stack } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserFiles } from "requests/useUserFiles";

export default function FileManagement() {
  const { t } = useTranslation();
  const { getFiles, deleteFiles, downloadFile, uploadFile } = useUserFiles();

  useEffect(() => {
    getFiles();
  });
  return (
    <Stack>
      <TitleText>File Management</TitleText>
    </Stack>
  );
}

// check if window obj is null, not null means client, do stuff here,
