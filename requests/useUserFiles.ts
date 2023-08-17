import { toast } from "react-toastify";
import { request } from "config/axios";
import axios, { AxiosProgressEvent } from "axios";
import { usePersistentStore, useStore } from "hooks/useStore";
import { appStatus } from "hooks/appStatus";
import { IUserFile, EnumUploadStatus } from "models/userFile";
import { FILE_TYPE_ICON, FILE_MIME } from "components/account/constant";
import update from "immutability-helper";

export const useUserFiles = () => {
  const { setUserFiles, userFiles } = useStore();

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

    try {
      const delRes = await request.delete("/files/" + fileId);
      console.log("delete res: ", delRes);
      let idx = userFiles.findIndex((f) => f.id == fileId);
      if (idx != -1) {
        let newUserFiles = update(userFiles, { $splice: [[idx, 1]] });
        setUserFiles(newUserFiles);
        console.log("after del, new userfile: ", newUserFiles);
      }
    } catch (err: any) {
      console.log("delete err: ", err);
    }
  };

  const downloadFile = async (url: string, name: string) => {
    console.log("downloading..., ", url);
    axios({
      url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const uploadFile = async (
    file: File,
    progressHandler: (evt: AxiosProgressEvent) => void
  ) => {
    let formData = new FormData();
    formData.append("file", file);
    console.log("uploading..... in useUseFile store: ", file);

    try {
      const { data } = await request.post("/files/upload", formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          progressHandler(progressEvent);
        },
      });
      console.log("upload res in useUesrFile: ", data);

      let idx = userFiles.findIndex(
        (f) => f.uploadStatus == EnumUploadStatus.UPLOADING
      );
      console.log("idx: ", idx, "///", userFiles);
      if (idx != -1) {
        let f: IUserFile = data; // userFiles[idx];
        f.icon = FILE_TYPE_ICON[f.type as FILE_MIME] || "other.svg";
        f.uploadStatus = EnumUploadStatus.DONE;
        f.createdAt = new Date(data.createdAt);
        let newUserFiles = update(userFiles, { [idx]: { $set: f } });
        setUserFiles(newUserFiles);
      }
    } catch (err: any) {
      console.log("uploading err: ", err);
      //todo: set uploadStatus = FAILED
    }
  };

  return {
    getFiles,
    deleteFiles,
    downloadFile,
    uploadFile,
  };
};
