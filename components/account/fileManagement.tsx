import React from "react";
import { Stack } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserFiles } from "requests/useUserFiles";

export default function FileManagement() {
  const { t } = useTranslation();
  const { getFiles, deleteFiles, downloadFile, uploadFile } = useUserFiles();

  const upload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    uploadFile(evt.target.files as FileList); // name, size, type
  };

  useEffect(() => {
    getFiles();
  }, []);
  return (
    <Stack>
      <TitleText>File Management</TitleText>
      <Input type="file" onChange={upload} />
    </Stack>
  );
}

// check if window obj is null, not null means client, do stuff here,
