/**
 * supplybridge/backend
 *
 * src/models/user_files.model.ts
 */

export enum EnumUploadStatus { // this is for client only
  DONE,
  PENDING,
  FAILED,
}

export interface IUserFile {
  id: number;
  userId: number;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  uploadStatus: EnumUploadStatus;
}
