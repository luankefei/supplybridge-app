import React, { useState } from "react";
import { Stack } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import Image from "next/image";
import Input from "@mui/material/Input";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { useUserFiles } from "requests/useUserFiles";
import { IUserFile } from "models/userFile";
import { FormatFileSize } from "utils/formatters";

// const FILE_TYPE_ICON = {}

interface IFileCardProps {
  file: IUserFile;
  onDownload: (url: string) => void;
  onDelete: (fileId: number, url: string) => void;
}

const itemHoverStyle: React.CSSProperties = {
  cursor: "pointer",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow:
    "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
};

export default function FileCard({
  file,
  onDownload,
  onDelete,
}: IFileCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: "16px", display: "flex", ":hover": itemHoverStyle }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "20%" }} onClick={() => onDownload(file.url)}>
          <Image
            src={"/icons/fileTypes/excel.svg"}
            alt="excel"
            width={48}
            height={48}
          />
        </div>
        <div onClick={() => onDownload(file.url)}>
          <div
            style={{
              width: "170px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {file.name}
          </div>
          <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
            <span>{FormatFileSize(file.size)}</span>&nbsp;·&nbsp;
            <span>{file.createdAt.toLocaleDateString()}</span>{" "}
          </div>
        </div>
        <div
          style={{ width: "10%" }}
          onClick={() => onDelete(file.id, file.url)}
        >
          <Image
            src={"/icons/delete.svg"}
            alt="delete user file"
            width={22}
            height={22}
          />
        </div>
      </div>
    </Paper>
  );
}

interface IFileAddProps {
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (evt: React.MouseEvent<HTMLInputElement>) => void;
}

const FileCardAddBtn = ({ onChange, onClick }: IFileAddProps) => {
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: "16px", display: "flex", ":hover": itemHoverStyle }}
    >
      <label
        htmlFor="user-file-add"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Image
          src={"/icons/add.svg"}
          alt="add user file"
          width={16}
          height={16}
        />{" "}
        &nbsp;&nbsp;Add Files
      </label>
      <input
        type="file"
        onChange={onChange}
        onClick={onClick}
        style={{ display: "none" }}
        id="user-file-add"
        name="user-file-add"
      />
    </Paper>
  );
};

export { FileCardAddBtn };

// check if window obj is null, not null means client, do stuff here,
/*
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

  const upload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    uploadFile(evt.target.files as FileList); // name, size, type
  };

  useEffect(() => {
    getFiles();
  }, []);

  console.log("userFile: ", userFiles);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0}>hehe</Paper>
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}

// check if window obj is null, not null means client, do stuff here,
/*
  <Stack>
      <TitleText>File Management</TitleText>
      <Input type="file" onChange={upload} />
    </Stack>

*/
