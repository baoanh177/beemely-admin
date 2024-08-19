import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { getCommuneOptions, getDistrictOptions, getProvinceOptions, IAccountFormInitialValues } from "../data/dataForm";
import { useMemo } from "react";
import FormSelect from "@/components/form/FormSelect";
import { FormikProps } from "formik";

interface IGeneralGroupProps extends FormikProps<IAccountFormInitialValues> {}

const GeneralGroup = ({ values, errors, touched, setFieldValue }: IGeneralGroupProps) => {
  const provinceOptions = useMemo(getProvinceOptions, []);
  return (
    <FormGroup title="Thông tin tổng quan">
      <FormInput
        placeholder="Nhập họ tên ở đây..."
        label="Họ tên"
        onChange={(value) => {
          setFieldValue("full_name", value);
        }}
        isRequired
        error={touched.full_name ? errors.full_name : ""}
      />
      <FormInput
        placeholder="Nhập email ở đây..."
        label="Email"
        onChange={(value) => {
          setFieldValue("email", value);
        }}
        isRequired
        error={touched.email ? errors.email : ""}
      />
      <FormInput
        placeholder="Nhập mật khẩu ở đây..."
        label="Mật khẩu"
        type="password"
        onChange={(value) => {
          setFieldValue("password", value);
        }}
        isRequired
        error={touched.password ? errors.password : ""}
      />
      <FormInput
        // type="number"
        placeholder="Nhập số điện thoại ở đây..."
        label="Số điện thoại"
        onChange={(value) => {
          setFieldValue("phone", value);
        }}
        error={touched.phone ? errors.phone : ""}
      />
      <div className="flex flex-wrap gap-4 [&>*]:grow [&>*]:basis-64">
        <FormSelect
          options={provinceOptions}
          label="Tỉnh/Thành phố"
          value={values.city}
          placeholder="Chọn tỉnh/thành phố"
          onChange={(value) => {
            setFieldValue("city", value);
            setFieldValue("district", undefined);
          }}
        />
        <FormSelect
          options={getDistrictOptions(values.city ?? "")}
          label="Quận/Huyện"
          value={values.district}
          placeholder="Chọn quận/huyện"
          isDisabled={!values.city}
          onChange={(value) => {
            setFieldValue("district", value);
            setFieldValue("commune", undefined);
          }}
        />
        <FormSelect
          options={getCommuneOptions(values.district ?? "")}
          label="Phường/Xã"
          value={values.commune}
          placeholder="Chọn phường/xã"
          isDisabled={!values.district}
          onChange={(value) => {
            setFieldValue("commune", value);
          }}
        />
        <FormInput
          placeholder="10, 2nd, Sunrise A..."
          label="Địa chỉ chi tiết"
          value={values.detail_address}
          onChange={(value) => {
            setFieldValue("detail_address", value);
          }}
        />
      </div>
    </FormGroup>
  );
};

export default GeneralGroup;
