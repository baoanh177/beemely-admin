import { IRole } from "@/services/store/role/role.model";
import { provinces } from "@/data/provinces";
import { EActiveStatus } from "@/shared/enums/status";
import { ITag } from "@/services/store/tag/tag.model";
import { handleConvertTags } from "@/pages/Tag/helpers/convertTags";
import { SUPER_ADMIN_NAME } from "@/services/config/constants";
import { array, boolean, object, string } from "yup";
import { IAccount } from "@/services/store/account/account.model";
import { TFormType } from "@/shared/utils/shared-types";
import { omit } from "lodash";
import { IAddress } from "@/services/store/address/address.modal";

export interface IAccountFormInitialValues {
  full_name: string;
  email: string;
  gender: string;
  password?: string;
  phone: string;
  roles: string[];
  addresses: IAddress[];
  avatar_url: string;
  status: EActiveStatus;
}

export const getRoleOptions = (roles: IRole[]) => {
  return roles.filter((role) => role.name !== SUPER_ADMIN_NAME).map((role) => ({ label: role.name, value: role.id }));
};

export const getProvinceOptions = () => {
  return provinces.map((province) => ({ value: province.idProvince, label: province.name }));
};

export const getDistrictOptions = (idProvince: string) => {
  const activeProvince = provinces.find((province) => province.idProvince === idProvince);
  return activeProvince ? activeProvince?.districts?.map((district) => ({ value: district.idDistrict, label: district.name })) : [];
};

export const getCommuneOptions = (idProvince: string, idDistrict: string) => {
  const activeProvince = provinces.find((province) => province.idProvince === idProvince);
  const activeDistrict = activeProvince?.districts.find((district) => district.idDistrict === idDistrict);
  return activeDistrict ? activeDistrict.communes.map((commune) => ({ value: commune.idCommune, label: commune.name })) : [];
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

export const getInitialValues = (account?: IAccount): IAccountFormInitialValues => {
  const { fullName, email, gender, phone, avatarUrl, addresses, roles, status } = account ?? {};
  return {
    full_name: fullName ?? "Bao Anh Test",
    email: email ?? "baoanhtest@gmail.com",
    gender: gender?.id ?? "Nam",
    password: "baoanh1234",
    phone: phone ?? "0987654321",
    avatar_url: avatarUrl ?? "https://res.cloudinary.com/dbju2ugir/image/upload/v1725547393/Beemely/t7e8v775uhm4togelakg.png",
    addresses: addresses ?? [],
    roles: roles?.map((role) => role.id) ?? ["66a793dc9b68efd4c2a8e58e"],
    status: status ?? EActiveStatus.INACTIVE,
  };
};

export const getSubmitData = (data: IAccountFormInitialValues, isCustomer?: boolean) => {
  if(isCustomer) {
    return { status: data.status, roles: data.roles}
  }
  return {
    ...data,
    addresses: data.addresses.map(a => ({...omit(a, "detailAddress", "id"), detail_address: a.detailAddress}))
  };
};

export const getValidationSchema = (type: TFormType) => {
  const rules = {
    full_name: string().required("Vui lòng nhập họ tên").max(50, "Họ tên không được vượt quá 50 ký tự"),
    email: string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    gender: string().required("Vui lòng chọn giới tính"),
    password: string(),
    phone: string()
      .test("check-valid", "Số điện thoại không hợp lệ", (value) => {
        if (!value?.trim()) return true;
        return +value === Number(value);
      })
      .test("check-phone", "Số điện thoại 9 đến 10 ký tự", (value) => {
        if (!value?.trim()) return true;
        return value.trim().length === 10;
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
  };

  if (type === "create") {
    rules.password = string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 ký tự");
  }

  return object().shape(rules);
};

export const getAddressFormValidation = () => {
  const rules = {
    city: string().required("Vui lòng chọn Tỉnh/Thành phố"),
    district: string().required("Vui lòng chọn Quận/Huyện"),
    commune: string(),
    detail_address: string().required("Vui lòng nhập địa chỉ chi tiết"),
    default: boolean(),
  };
  return object().shape(rules);
};
