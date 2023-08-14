import { IUser } from "models/user";

export type TUserInfo = Pick<IUser, "id" | "name" | "email" | "type">;
