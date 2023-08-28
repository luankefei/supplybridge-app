import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Stack, Container } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserFiles } from "requests/useUserFiles";
import { useStore } from "hooks/useStore";
import Box from "@mui/material/Box";
import FileCard, { FileCardAddBtn } from "./fileCard";
import { IUserFile, EnumUploadStatus } from "models/userFile";
import { FILE_TYPE_ICON, FILE_MIME } from "./constant";
import update from "immutability-helper";
import { AxiosProgressEvent } from "axios";

// used for to-be-uploaded fileId, using negative is to avoid collision with positive existing fileId
const randomNegInt = () => Math.floor(Math.random() * 9999999 + 1) * -1;

export default function FileManagement() {
  const { t } = useTranslation("myAccount");
  const { getFiles, deleteFile, downloadFile, uploadFile } = useUserFiles();
  const { userFiles, setUserFiles } = useStore();

  const [newFile, setNewFile] = useState<IUserFile | null>(null);
  const [uploading, setUploading] = useState(false);
  // deletingFile = id
  const [deletingFile, setDeletingFile] = useState(-1);
  const [progress, setProgress] = useState(0);
  let toBeUploadedFile = useRef<File | null>(null);

  const progressHandler = (p: AxiosProgressEvent) => {
    console.log("progressing: ", p);
    setProgress((p.progress || 0) * 100);
  };

  const onUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = evt.target.files;
    if (fileList == null) {
      return;
    }
    if (userFiles.length >= 20) {
      toast.error("You can have at most 20 files");
      return;
    }
    toBeUploadedFile.current = fileList[0];
    if (toBeUploadedFile.current.size > 1024 * 1024 * 40) {
      toast.error("Max file size: 20MB");
      return;
    }
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
    setNewFile(newFile);
    upload();
  };
  const onDelete = async (file: IUserFile) => {
    setDeletingFile(file.id);
    const resp = await deleteFile(file);
    setDeletingFile(-1);
    if (resp.error) {
      toast.error(resp.error || t("deleteFailed"));
    } else {
      toast.success(t("deleteSuccess"));
    }
  };

  const upload = async () => {
    try {
      setUploading(true);
      const resp = await uploadFile(
        toBeUploadedFile.current as File,
        progressHandler
      );
      if (!resp.data) {
        toast.error(resp.error || t("uploadFailed"));
      } else {
        toast.success(t("uploadSuccess"));
        let thatNewFile: any = {
          id: resp.data.id,
          userId: resp.data.userId,
          name: resp.data.name,
          size: resp.data.size,
          type: resp.data.type,
          createdAt: new Date(resp.data.updatedAt),
        };
        let newUserFiles = update(userFiles, { $unshift: [thatNewFile] });
        setUserFiles(newUserFiles);
      }
    } catch (err) {
    } finally {
      toBeUploadedFile.current = null;
      setUploading(false);
      setNewFile(null);
      setProgress(0);
      getFiles();
    }
  };

  const onUploadClick = (evt: React.MouseEvent<HTMLInputElement>) => {
    (evt.target! as HTMLInputElement).value = "";
  };

  useEffect(() => {
    getFiles();
  }, []);

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
        {newFile && <FileCard file={newFile} progress={progress} />}
        {userFiles.map((f) => (
          <FileCard
            key={f.id}
            file={f}
            deleting={deletingFile == f.id}
            onDownload={downloadFile}
            onDelete={onDelete}
          />
        ))}
      </Box>
    </Container>
  );
}
