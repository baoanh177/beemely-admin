import { IPermission } from "../permission/permission.model"

export interface IRole {
  id: string
  name: string
  permissions: IPermission[]
}
