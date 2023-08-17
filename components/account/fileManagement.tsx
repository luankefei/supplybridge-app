import React, { useState } from "react";
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
import { IUserFile, EnumUploadStatus } from "models/userFile";
import { FILE_TYPE_ICON, FILE_MIME } from "./constant";
import update from "immutability-helper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// used for to-be-uploaded fileId, using negative is to avoid collision with positive existing fileId
const randomNegInt = () => Math.floor(Math.random() * 9999999 + 1) * -1;

export default function FileManagement() {
  const { t } = useTranslation();
  const { getFiles, deleteFiles, downloadFile, uploadFile } = useUserFiles();
  const { userFiles, setUserFiles } = useStore();
  const [uploading, setUploading] = useState(false);

  const onUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = evt.target.files;
    if (fileList == null) {
      return;
    }
    console.log("uploading............: ", fileList);
    let files: File[] = Array.from(fileList);
    let toBeUploaded: IUserFile[] = files.map((f) => ({
      id: randomNegInt(),
      userId: -1, // to be replaced with current userId
      name: f.name,
      url: "",
      size: f.size,
      type: f.type,
      createdAt: new Date(f.lastModified),
      uploadStatus: EnumUploadStatus.UPLOADING,
      icon: FILE_TYPE_ICON[f.type as FILE_MIME] || "other.svg",
    }));

    let newUserFiles = update(userFiles, { $unshift: toBeUploaded });
    setUserFiles(newUserFiles);
    setUploading(true);
    try {
      const uploadRes = await uploadFile(fileList[0]); // name, size, type
      console.log("upload res: ", uploadRes);
    } catch (err) {
      console.log("err", err);
    }
  };

  const onUploadClick = (evt: React.MouseEvent<HTMLInputElement>) => {
    (evt.target! as HTMLInputElement).value = "";
  };

  useEffect(() => {
    getFiles(); // todo: add loading status with loading icon
  }, []);

  /*
  useEffect(() => {
    if (uploading) {
      const runUpload = async () => {
        let toBeUpload = userFiles.find(
          (f) => f.uploadStatus == EnumUploadStatus.PENDING
        );
        if (toBeUpload == null) {
          return;
        }
        console.log("uploading.... ", toBeUpload);
      };
      runUpload();
    }
  }, [uploading]);
  */

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
