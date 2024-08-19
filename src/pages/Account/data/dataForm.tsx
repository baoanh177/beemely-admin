import { IRole } from "@/services/store/role/role.model";
import { IDistrict, IProvince, provinces } from "@/data/provinces";
import { EActiveStatus } from "@/shared/enums/status";
import { ITag } from "@/services/store/tag/tag.model";
import { handleConvertTags } from "@/pages/Tag/helpers/convertTags";
import { SUPER_ADMIN_NAME } from "@/services/config/constants";
import { array, object, string } from "yup";

export interface IAccountFormInitialValues {
  full_name: string;
  email: string;
  gender: string;
  password: string;
  phone: string;
  roles: string[];
  city?: string;
  district?: string;
  commune?: string;
  detail_address?: string;
  status: EActiveStatus;
}

export const getRoleOptions = (roles: IRole[]) => {
  return roles.filter((role) => role.name !== SUPER_ADMIN_NAME).map((role) => ({ label: role.name, value: role.id }));
};

export const getProvinceOptions = () => {
  return provinces.map((province) => ({ value: JSON.stringify(province), label: province.name }));
};

export const getDistrictOptions = (activeProvinceJSON: string) => {
  if (!activeProvinceJSON) return [];
  const activeProvince: IProvince = JSON.parse(activeProvinceJSON);
  return activeProvince ? activeProvince.districts.map((district) => ({ value: JSON.stringify(district), label: district.name })) : [];
};

export const getCommuneOptions = (activeDistrictJSON: string) => {
  if (!activeDistrictJSON) return [];
  const activeDistrict: IDistrict = JSON.parse(activeDistrictJSON);
  return activeDistrict ? activeDistrict.communes.map((commune) => ({ value: JSON.stringify(commune), label: commune.name })) : [];
};

export const getTreeTagOptions = (tags: ITag[]) => {
  // const convertTreeOptions = (tags: ITreeTag[]) => {
  //   return tags.map(tag => {
  //     return {
  //       title: tag.id,
  //       value: tag.id,
  //       children: convertTreeOptions(tag.children)
  //     }
  //   })
  // }
  return handleConvertTags(tags);
};

export const getInitialValues = (): IAccountFormInitialValues => {
  return {
    full_name: "",
    email: "",
    gender: "",
    password: "",
    phone: "",
    city: undefined,
    district: undefined,
    commune: undefined,
    detail_address: "",
    roles: [],
    status: EActiveStatus.INACTIVE,
  };
};

export const getSubmitData = (data: IAccountFormInitialValues) => {
  const { city, district, commune } = data;
  return {
    ...data,
    city: city ? JSON.parse(city).name : "",
    district: district ? JSON.parse(district).name : "",
    commune: commune ? JSON.parse(commune).name : "",
  };
};

export const getValidationSchema = () => {
  return object().shape({
    full_name: string().required("Vui lòng nhập họ tên").max(50, "Họ tên không được vượt quá 50 ký tự"),
    email: string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    gender: string().required("Vui lòng chọn giới tính"),
    password: string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 ký tự"),
    phone: string()
      .test("check-valid", "Số điện thoại không hợp lệ", (value) => {
        if (!value?.trim()) return true;
        return +value === Number(value);
      })
      .test("check-phone", "Số điện thoại 9 đến 10 ký tự", (value) => {
        if (!value?.trim()) return true;
        return value.trim().length === 9 || value.trim().length === 10;
      }),
    roles: array()
      .required("Vui lòng chọn vai trò")
      .test("check-role", "Vui lòng chọn vai trò", (value) => {
        return Array.isArray(value) ? value.length > 0 : false;
      }),
    status: string()
      .required("Vui lòng chọn trạng thái kích hoạt")
      .test("check-status", "Trạng thái kích hoạt không hợp lệ", (value) => {
        return +value === EActiveStatus.ACTIVE || +value === EActiveStatus.INACTIVE;
      }),
  });
};
