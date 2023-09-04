import { INotification } from "./notification";

export enum EnumUserNotificationStatus {
  READ = "READ",
  UNREAD = "UNREAD",
  DISMISSED = "DISMISSED",
}

/**
 * Copy from backend's model definition
 * src/models/user_notification.model.ts
 *
 */
export interface IUserNotification {
  user_id: number;
  notification_id: number;
  status: EnumUserNotificationStatus;

  Notification: INotification;
  // UIAttributes -- not from backend..
  createdAt: string;
}
