import { EActiveStatus } from "@/shared/enums/status";
import { IRole } from "../role/role.model";
import { IUserGender } from "../userGender/userGender.model";
import { IAddress } from "../address/address.modal";

export interface IAccount {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  addresses: IAddress[];
  gender: IUserGender;
  phone: string;
  roles: IRole[];
  status: EActiveStatus;
  vouchers: unknown[];
  orderCount: number;
}
