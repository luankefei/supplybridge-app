import { toast } from "react-toastify";
import { request } from "config/axios";
import axios from "axios";
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

  // const downloadFile = async (fileId: string) => {};
  const downloadFile = async (url: string, name: string) => {
    console.log("downloading..., ", url);
    axios({
      url,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const uploadFile = async (file: File) => {
    let f = file; // upload one file first, then implement multiple
    let formData = new FormData();
    formData.append("file", f);
    console.log("uploading..... in useUseFile store: ", f);

    try {
      const { data } = await request.post("/files/upload", formData);
      console.log("upload res in useUesrFile: ", data);
      let idx = userFiles.findIndex(
        //  EnumUploadStatus.UPLOADING
        (f) => f.uploadStatus == 1
      );
      console.log("idx: ", idx, "///", userFiles);
      if (idx != -1) {
        let f: IUserFile = data; // userFiles[idx];
        f.icon = FILE_TYPE_ICON[f.type as FILE_MIME] || "other.svg";
        f.uploadStatus = EnumUploadStatus.DONE;
        let newUserFiles = update(userFiles, { [idx]: { $set: f } });
        setUserFiles(newUserFiles);
      }
      // return data;
    } catch (err: any) {
      console.log("uploading err: ", err);
      // return err;
    }
  };

  return {
    getFiles,
    deleteFiles,
    downloadFile,
    uploadFile,
  };
};
