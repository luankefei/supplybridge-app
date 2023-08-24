import React, { CSSProperties, useState } from "react";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import { IUserFile } from "models/userFile";
import { FormatFileSize } from "utils/formatters";
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ConfirmModal from "components/ui-components/confirmModal";
import { CloseOutlined } from "@mui/icons-material";

interface IFileCardProps {
  file: IUserFile;
  progress?: number;
  deleting?: boolean;
  onDownload?: (file: IUserFile) => void;
  onDelete?: (file: IUserFile) => void;
}

// when file is being uploaded(or in pending mode, or failed upload), it's disabled
// in other word, only when file.uploadStatus == DONE, can it be clicked
// for AddBtn, only when no file is being uploadd, can it be clicked.
const itemHoverStyle = (disabled: boolean): CSSProperties => {
  return {
    cursor: disabled ? "not-allowed" : undefined,
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  };
};

export default function FileCard({
  file,
  progress,
  deleting,
  onDownload,
  onDelete,
}: IFileCardProps) {
  const { t } = useTranslation("myAccount");
  const [open, setOpen] = useState(false);

  const downloadHandler = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onDownload && onDownload(file);
  };

  const deleteHandler = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        display: "flex",
        position: "relative",
        ":hover": itemHoverStyle(progress !== undefined),
      }}
    >
      <ConfirmModal
        useDoubleConfirm
        title={t(
          "confirmDeleteFile",
          "Are you sure you want to delete this file?"
        )}
        open={open}
        subTitle={t("deleteFileWarning", "This action is irreversible.")}
        onClose={(confirmed) => {
          if (confirmed) {
            onDelete && onDelete(file);
          }
          setOpen(false);
        }}
      />
      <Box
        sx={{
          position: "absolute",
          borderRadius: "16px",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: progress !== undefined || !!deleting ? "block" : "none",
        }}
      >
        <LinearProgress
          sx={{
            borderRadius: "16px",
            height: "100%",
            opacity: 0.4,
          }}
          variant="determinate"
          value={progress || 0}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          borderRadius: "16px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: !!deleting ? "block" : "none",
        }}
      >
        <CircularProgress />
      </Box>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
        p={1}
        alignItems={"center"}
      >
        <Box style={{ width: "20%" }}>
          <Image
            src={`/icons/fileTypes/${file.icon}`}
            alt={file.name}
            width={48}
            height={48}
          />
        </Box>
        <Tooltip title={t("downloadFile", "Click to download File")}>
          <Stack
            onClick={downloadHandler}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
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
              <span>{file.createdAt.toLocaleDateString()}</span>
            </div>
          </Stack>
        </Tooltip>
        <Box style={{ width: "10%" }}>
          <IconButton onClick={deleteHandler}>
            <CloseOutlined />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}

interface IFileAddProps {
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (evt: React.MouseEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const FileCardAddBtn = ({ onChange, onClick, disabled }: IFileAddProps) => {
  const { t } = useTranslation("myAccount");
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "16px",
        display: "flex",
        ":hover": itemHoverStyle(disabled),
      }}
    >
      <label
        htmlFor="user-file-add"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <Image
          src={"/icons/add.svg"}
          alt="add user file"
          width={16}
          height={16}
        />
        <span style={{ marginLeft: "8px" }}>{t("addFile", "Add File")}</span>
      </label>
      <input
        type="file"
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        style={{ display: "none" }}
        id="user-file-add"
        name="user-file-add"
        // multiple
      />
    </Paper>
  );
};

export { FileCardAddBtn };
