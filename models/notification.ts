/**
 * Copied from backend:
 * src/models/notification.model.ts
 */
export interface INotification {
  title: string;
  content: string;
  type: string;
  is_active: boolean;
  meta_data: any;

  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
