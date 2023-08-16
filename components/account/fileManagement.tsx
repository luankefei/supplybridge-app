import React from "react";
import { Stack, Container } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserFiles } from "requests/useUserFiles";
import { useStore } from "hooks/useStore";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FileCard, { FileCardAddBtn } from "./fileCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FileManagement() {
  const { t } = useTranslation();
  const { getFiles, deleteFiles, downloadFile, uploadFile } = useUserFiles();
  const { userFiles } = useStore();

  const onUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log("uploading............: ", evt.target.files);
    let files = evt.target.files;
    // evt.target.value = "";
    uploadFile(files as FileList); // name, size, type
  };

  const onUploadClick = (evt: React.MouseEvent<HTMLInputElement>) => {
    (evt.target! as HTMLInputElement).value = "";
  };

  useEffect(() => {
    getFiles();
  }, []);

  console.log("userFile: ", userFiles);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 288,
            height: 72,
          },
        }}
      >
        <FileCardAddBtn onChange={onUpload} onClick={onUploadClick} />
        {userFiles.map((f) => (
          <FileCard
            key={f.id}
            file={f}
            onDownload={downloadFile}
            onDelete={deleteFiles}
          />
        ))}
      </Box>
    </Container>
  );
}

// check if window obj is null, not null means client, do stuff here,
/*
  <Stack>
      <TitleText>File Management</TitleText>
      <Input type="file" onChange={upload} />
    </Stack>

*/
