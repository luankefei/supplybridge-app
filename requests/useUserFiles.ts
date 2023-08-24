import { request } from "config/axios";
import { AxiosProgressEvent } from "axios";
import { useStore } from "hooks/useStore";
import { IUserFile, EnumUploadStatus } from "models/userFile";
import { FILE_TYPE_ICON, FILE_MIME } from "components/account/constant";
import update from "immutability-helper";

export const useUserFiles = () => {
  const { setUserFiles, userFiles } = useStore();

  const getFiles = async () => {
    try {
      const { data } = await request.get("/files");
      let fileList: IUserFile[] = data.map((f: any) => ({
        ...f,
        uploadStatus: EnumUploadStatus.DONE,
        // uploadStatus: EnumUploadStatus.UPLOADING,
        createdAt: new Date(f.createdAt),
        updatedAt: new Date(f.updatedAt),
        icon: FILE_TYPE_ICON[f.type as FILE_MIME] || "other.svg",
      }));
      setUserFiles(fileList);
    } catch (err: any) {
      console.log("getting file error: ", err);
    }
  };

  const deleteFiles = async (file: IUserFile) => {
    try {
      const delRes = await request.delete("/files/" + file.id);
      console.log("delete res: ", delRes);
      let idx = userFiles.findIndex((f) => f.id == file.id);
      if (idx != -1) {
        let newUserFiles = update(userFiles, { $splice: [[idx, 1]] });
        setUserFiles(newUserFiles);
      }
    } catch (err: any) {
      console.log("delete err: ", err);
    }
  };

  const downloadFile = async (file: IUserFile) => {
    const { data } = await request.get("/files/download/" + file.id);
    if (data.url) {
      const href = data.url;
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } else {
      console.log("download error: ", data);
    }
  };

  const uploadFile = async (
    file: File,
    progressHandler: (evt: AxiosProgressEvent) => void
  ) => {
    let formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await request.post("/files/upload", formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          progressHandler(progressEvent);
        },
      });
      return { data };
    } catch (err: any) {
      console.log("uploading err: ", err);
      return {
        data: null,
        error: err.response?.data.message || "Error uploading file",
      };
    }
  };

  return {
    getFiles,
    deleteFiles,
    downloadFile,
    uploadFile,
  };
};
