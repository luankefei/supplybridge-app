import React, { useState, useRef } from "react";
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
import { AxiosProgressEvent } from "axios";
import { keyframes } from "@mui/system";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RotatedBox = styled("div")({
  backgroundColor: "pink",
  width: 30,
  height: 30,
  animation: `${rotate} 1s infinite ease`,
});

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
  const [progress, setProgress] = useState(0);
  let toBeUploadedFile = useRef<File | null>(null); // this refers to the selected File to be uploaded, after upload, reset it to null

  const progressHandler = (p: AxiosProgressEvent) => {
    console.log("progressing: ", p);
    setProgress(p.progress || 0);
  };

  const onUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = evt.target.files;
    if (fileList == null) {
      return;
    }
    toBeUploadedFile.current = fileList[0];
    console.log("uploading............: ", fileList);
    let newFile: IUserFile = {
      id: randomNegInt(), // each file need a uniqueId, this will be repalced with new id returned from backend
      userId: -1, // to be replaced with current userId
      name: toBeUploadedFile.current.name,
      size: toBeUploadedFile.current.size,
      type: toBeUploadedFile.current.type,
      createdAt: new Date(),
      uploadStatus: EnumUploadStatus.UPLOADING,
      icon:
        FILE_TYPE_ICON[toBeUploadedFile.current.type as FILE_MIME] ||
        "other.svg",
    };

    let newUserFiles = update(userFiles, { $unshift: [newFile] });
    setUserFiles(newUserFiles);
    setUploading(true);
  };

  const onUploadClick = (evt: React.MouseEvent<HTMLInputElement>) => {
    (evt.target! as HTMLInputElement).value = "";
  };

  useEffect(() => {
    getFiles(); // todo: add loading status with loading icon
  }, []);

  useEffect(() => {
    if (uploading) {
      const runUpload = async () => {
        try {
          await uploadFile(toBeUploadedFile.current as File, progressHandler);
          setUploading(false);
          toBeUploadedFile.current = null;
        } catch (err) {
          // todo: set uploadStatus to FAILED with retry button.
          console.log("err", err);
          setUploading(false);
        }
      };
      runUpload();
    }
  }, [uploading]);

  return (
    <Container>
      <RotatedBox />
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
        <FileCardAddBtn
          onChange={onUpload}
          onClick={onUploadClick}
          disabled={uploading}
        />
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
