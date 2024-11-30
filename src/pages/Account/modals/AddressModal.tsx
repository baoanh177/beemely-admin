import FormSelect from "@/components/form/FormSelect";
import { TFormType } from "@/shared/utils/shared-types";
import { useMemo, useRef } from "react";
import {
  getAddressFormValidation,
  getCommuneOptions,
  getDistrictOptions,
  getProvinceOptions,
  IAccountFormInitialValues,
} from "../data/dataForm";
import { Formik, FormikProps } from "formik";
import FormInput from "@/components/form/FormInput";
import { IAddress } from "@/services/store/address/address.modal";
import { Modal } from "antd";
import FormCheck from "@/components/form/FormCheck";
import { omit } from "lodash";
import toast from "react-hot-toast";

export interface IAddressModalProps {
  type?: TFormType;
  isOpen?: boolean;
  address?: IAddress;
  onClose?: () => void;
  values: IAccountFormInitialValues;
  setFieldValue: Function;
}

export interface IAddressFormInitialValues {
  city?: string;
  district?: string;
  commune?: string;
  detail_address?: string;
  default: boolean;
}

const AddressModal = ({ type = "create", address, isOpen, onClose, values, setFieldValue }: IAddressModalProps) => {
  const formikRef = useRef<FormikProps<IAddressFormInitialValues>>(null);
  const provinceOptions = useMemo(getProvinceOptions, []);
  const title = type === "create" ? "Thêm mới Địa chỉ" : "Cập nhật Địa chỉ";
  const initialValues: IAddressFormInitialValues = {
    city: address?.city ?? undefined,
    district: address?.district ?? undefined,
    commune: address?.commune ?? undefined,
    detail_address: address?.detailAddress ?? undefined,
    default: address?.default ?? false,
  };
  const handleSubmit = (data: IAddressFormInitialValues) => {
    setFieldValue("addresses", [...values.addresses, {...omit(data, "detail_address"), detailAddress: data.detail_address}]);
    toast.success("Cập nhật thành công, dữ liệu sẽ được lưu sau khi hoàn tất cập nhật tài khoản")
    onClose && onClose();
  };

  return (
      <Modal
        title={title}
        open={isOpen}
        okText="Xác nhận"
        cancelText="Quay lại"
        onOk={() => {
          formikRef && formikRef.current && formikRef.current.handleSubmit();
        }}
        onCancel={() => {
          onClose && onClose();
        }}
      >
        <Formik
          innerRef={formikRef}
          validationSchema={getAddressFormValidation()}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values: addressFormValues, errors, touched, setFieldValue }) => {
            return (
              <div className="flex flex-col gap-4">
                <FormSelect
                  options={provinceOptions}
                  isRequired
                  isDisabled={type === "view"}
                  label="Tỉnh/Thành phố"
                  value={addressFormValues.city}
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={(value) => {
                    setFieldValue("city", value);
                    setFieldValue("district", undefined);
                  }}
                  error={touched.city ? errors.city : ""}
                />
                <FormSelect
                  options={getDistrictOptions(addressFormValues.city ?? "")}
                  label="Quận/Huyện"
                  value={addressFormValues.district}
                  isRequired
                  placeholder="Chọn quận/huyện"
                  isDisabled={!addressFormValues.city || type === "view"}
                  onChange={(value) => {
                    setFieldValue("district", value);
                    setFieldValue("commune", undefined);
                  }}
                  error={touched.district ? errors.district : ""}
                />
                <FormSelect
                  options={getCommuneOptions(addressFormValues.city ?? "", addressFormValues.district ?? "")}
                  label="Phường/Xã"
                  value={addressFormValues.commune}
                  placeholder="Chọn phường/xã"
                  isDisabled={!addressFormValues.district || type === "view"}
                  onChange={(value) => {
                    setFieldValue("commune", value);
                  }}
                  error={touched.commune ? errors.commune : ""}
                />
                <FormInput
                  isRequired
                  isDisabled={type === "view"}
                  placeholder="10, 2nd, Sunrise A..."
                  label="Địa chỉ chi tiết"
                  value={addressFormValues.detail_address}
                  onChange={(value) => {
                    setFieldValue("detail_address", value);
                  }}
                  error={touched.detail_address ? errors.detail_address : ""}
                />
                <FormCheck
                  label="Đặt làm địa chỉ mặc định"
                  checked={addressFormValues.default}
                  onChange={(value) => {
                    setFieldValue("default", value);
                  }}
                />
              </div>
            );
          }}
        </Formik>
      </Modal>
  );
};

export default AddressModal;
