import { toast } from "react-toastify";

import { request } from "config/axios";
import { usePersistentStore, useStore } from "hooks/useStore";
import { appStatus } from "hooks/appStatus";

export const useUserFiles = () => {
  const { setUserFiles } = useStore();

  const getFiles = async () => {
    try {
      const { data } = await request.get("/files");
      console.log("get files: ", data);
      // setUserFiles(data);
    } catch (err: any) {
      console.log("getting file error: ", err);
    }
  };

  const deleteFiles = async (fileId: string) => {};

  const downloadFile = async (fileId: string) => {};

  const uploadFile = async (files: FileList) => {
    let f = files[0]; // upload one file first, then implement multiple
    let formData = new FormData();
    formData.append("file", f);
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
