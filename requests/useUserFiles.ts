import { toast } from "react-toastify";

import { request } from "config/axios";
import { usePersistentStore, useStore } from "hooks/useStore";
import { appStatus } from "hooks/appStatus";
import { IUserFile, EnumUploadStatus } from "models/userFile";

/*
{
    "id": 1,
    "userId": 1,
    "name": "moonwalk.gif",
    "url": "https://cdn-stage.supplybridge.com/user-files/user_baec83b0-3c1b-11ee-b014-b3814c8bb374.gif",
    "size": 157930,
    "type": "image/gif",
    "createdAt": "2023-08-16T10:00:30.530Z",
    "updatedAt": "2023-08-16T10:00:30.530Z"
}
*/

const FILE_TYPE_ICON = {
  "image/png": "img.svg",
  "image/jpeg": "img.svg",
  "image/gif": "img.svg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "word.svg",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "excel.svg",
  "application/zip": "zip.svg",
  "application/pdf": "pdf.svg",
};
type FILE_MIME = keyof typeof FILE_TYPE_ICON;

export const useUserFiles = () => {
  const { setUserFiles } = useStore();

  const getFiles = async () => {
    try {
      const { data } = await request.get("/files");
      console.log("get files: ", data);
      let fileList: IUserFile[] = data.map((f: any) => ({
        ...f,
        uploadStatus: EnumUploadStatus.DONE,
        createdAt: new Date(f.createdAt),
        updatedAt: new Date(f.updatedAt),
        icon: FILE_TYPE_ICON[f.type as FILE_MIME] || "other.svg",
      }));
      setUserFiles(fileList);
    } catch (err: any) {
      console.log("getting file error: ", err);
    }
  };

  const deleteFiles = async (fileId: number, url: string) => {
    console.log("deleting..., ", fileId, "///", url);
  };

  // const downloadFile = async (fileId: string) => {};
  const downloadFile = async (url: string) => {
    console.log("downloading..., ", url);
  };

  const uploadFile = async (file: File) => {
    let f = file; // upload one file first, then implement multiple
    let formData = new FormData();
    formData.append("file", f);
    console.log("uploading..... in useUseFile store: ", f);

    try {
      const { data } = await request.post("/files/upload", formData);
      console.log("upload res: ", data);
    } catch (err: any) {
      console.log("uploading err: ", err);
    }
  };

  return {
    getFiles,
    deleteFiles,
    downloadFile,
    uploadFile,
  };
};
