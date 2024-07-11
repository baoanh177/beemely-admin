import lodash from "lodash"
import { IPermission } from "@/services/store/permission/permission.model";

export interface ITreePermission {
  key: string
  title: string
  children: Omit<ITreePermission, "children">[]
}

export const getTreePermissions = (permissions: IPermission[], modules: string[]) => {

  const mappingModules: {[key: string]: ITreePermission} = {}

  modules.forEach(module => {
    if(!mappingModules[module]) {
      mappingModules[module] = {
        key: `parent-${module}`,
        title: module,
        children: [] 
      }
    }
  })

  permissions.forEach(permission => {
    mappingModules[permission.module] && mappingModules[permission.module].children.push({ key: permission.name, title: permission.label })
  })

  return lodash.values(mappingModules)
}