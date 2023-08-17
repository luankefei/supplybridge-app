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
import { EnumUploadStatus } from "models/userFile";
import { FormatFileSize } from "utils/formatters";

interface IFileCardProps {
  file: IUserFile;
  onDownload: (url: string, name: string) => void;
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
  // const labelStyle
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        display: "flex",
        ":hover": itemHoverStyle,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            file.uploadStatus == EnumUploadStatus.UPLOADING
              ? "rgba(0,0,255,0.2)"
              : "unset",
        }}
      >
        <div
          style={{ width: "20%" }}
          onClick={() => onDownload(file.url, file.name)}
        >
          <Image
            src={`/icons/fileTypes/${file.icon}`}
            alt={file.name}
            width={48}
            height={48}
          />
        </div>
        <div onClick={() => onDownload(file.url, file.name)}>
          <div
            style={{
              width: "170px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "6px",
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
        // multiple
      />
    </Paper>
  );
};

export { FileCardAddBtn };
