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
// import { keyframes } from "@mui/system";

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
    if (p.progress && p.progress >= 0.8) {
      // file need to be uploaded to backend server, then upload to AzureStorage, but I can only get the progress for the first upload
      // so I leave 0.2 for Azure upload, when the Azure upload completes, front-end received 200, then the progressBar will disappear.
      return;
    }
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
          setProgress(0);
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

  /* useEffect(() => {
    setInterval(() => {
      if (progress == 1) {
        return;
      }
      setProgress(progress + 0.1);
    }, 1000);
  }, []);
  */

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
            progress={progress}
          />
        ))}
      </Box>
    </Container>
  );
}
