import { Roles } from "../enums/roles"

export interface ILoginResponseData {
  userData: {
    id: string
    userName: string
    email: string
    roles: Roles
  }
  accessToken: string
  refreshToken: string
}