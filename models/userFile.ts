/**
 * supplybridge/backend
 *
 * src/models/user_files.model.ts
 */

export enum EnumUploadStatus { // this is for client only
  DONE, // 0
  UPLOADING, // 1
  PENDING, // 2
  FAILED, // 3
}

export interface IUserFile {
  id: number;
  userId: number;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: Date;
  updatedAt?: Date;
  uploadStatus: EnumUploadStatus; // client use only
  icon: string; // client use only
}
