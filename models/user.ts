/**
 * supplybridge/backend
 *
 * src/models/user.model.ts
 */

export enum EnumUserType {
  buyer = "buyer",
  supplier = "supplier",
  sales = "sales",
  admin = "admin",
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  emailVerifiedAt: Date;
  surveyPopupCount: number;
  type: EnumUserType;
}
