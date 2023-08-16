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

export const useUserFiles = () => {
  const { setUserFiles } = useStore();

  const getFiles = async () => {
    try {
      const { data } = await request.get("/files");
      let fileList: IUserFile[] = [
        {
          id: 1,
          userId: 1,
          name: "aa",
          url: "http://",
          size: 100,
          type: "img/gif",
          createdAt: new Date("2023-08-16T10:00:30.530Z"),
          updatedAt: new Date("2023-08-16T10:00:30.530Z"),
          uploadStatus: EnumUploadStatus.DONE,
        },
        {
          id: 2,
          userId: 1,
          name: "bb",
          url: "http://",
          size: 100,
          type: "img/gif",
          createdAt: new Date("2023-08-16T10:00:30.530Z"),
          updatedAt: new Date("2023-08-16T10:00:30.530Z"),
          uploadStatus: EnumUploadStatus.DONE,
        },
        {
          id: 3,
          userId: 1,
          name: "cc",
          url: "http://",
          size: 100,
          type: "img/gif",
          createdAt: new Date("2023-08-16T10:00:30.530Z"),
          updatedAt: new Date("2023-08-16T10:00:30.530Z"),
          uploadStatus: EnumUploadStatus.DONE,
        },
        {
          id: 4,
          userId: 1,
          name: "dd",
          url: "http://",
          size: 100,
          type: "img/gif",
          createdAt: new Date("2023-08-16T10:00:30.530Z"),
          updatedAt: new Date("2023-08-16T10:00:30.530Z"),
          uploadStatus: EnumUploadStatus.DONE,
        },
        {
          id: 5,
          userId: 1,
          name: "ee",
          url: "http://",
          size: 100,
          type: "img/gif",
          createdAt: new Date("2023-08-16T10:00:30.530Z"),
          updatedAt: new Date("2023-08-16T10:00:30.530Z"),
          uploadStatus: EnumUploadStatus.DONE,
        },
        {
          id: 6,
          userId: 1,
          name: "ff",
          url: "http://",
          size: 100,
          type: "img/gif",
          createdAt: new Date("2023-08-16T10:00:30.530Z"),
          updatedAt: new Date("2023-08-16T10:00:30.530Z"),
          uploadStatus: EnumUploadStatus.DONE,
        },
        {
          id: 7,
          userId: 1,
          name: "gg",
          url: "http://",
          size: 100,
          type: "img/gif",
          createdAt: new Date("2023-08-16T10:00:30.530Z"),
          updatedAt: new Date("2023-08-16T10:00:30.530Z"),
          uploadStatus: EnumUploadStatus.DONE,
        },
      ];
      console.log("get files: ", data);

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

  const uploadFile = async (files: FileList) => {
    let f = files[0]; // upload one file first, then implement multiple
    let formData = new FormData();
    formData.append("file", f);
    console.log("uploading..... in useUseFile store: ", f);
    /*
    try {
      const { data } = await request.post("/files/upload", formData);
      console.log("upload res: ", data);
    } catch (err: any) {
      console.log("uploading err: ", err);
    }
    */
  };

  return {
    getFiles,
    deleteFiles,
    downloadFile,
    uploadFile,
  };
};
