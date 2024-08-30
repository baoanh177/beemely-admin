import { EActiveStatus } from "@/shared/enums/status";
import { IRole } from "../role/role.model";
import { ICategory } from "../category/category.model";

export interface IAccount {
  id: string;
  fullName: string;
  userName: string;
  avatarUrl: string;
  email: string;
  addresses: unknown[];
  gender: ICategory;
  phone: string;
  roles: IRole[];
  status: EActiveStatus;
  vouchers: unknown[];
}
