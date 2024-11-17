import FormGroup from "@/components/form/FormGroup";
import { FormikProps } from "formik";
import { IAccountFormInitialValues } from "../data/dataForm";
import FormInput from "@/components/form/FormInput";
import { HiOutlinePencil } from "react-icons/hi";
import { getCommune, getDistrict, getProvince } from "@/utils/getAddress";
import RoundedIcon from "@/components/common/RoundedIcon";
import AddressModal, { IAddressModalProps } from "../modals/AddressModal";
import { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import Button from "@/components/common/Button";
import { Modal } from "antd";
import toast from "react-hot-toast";
interface IAddressGroupProps extends FormikProps<IAccountFormInitialValues> {
  isFormLoading?: boolean;
  type: "create" | "update" | "view";
  isCustomer?: boolean;
}

const { confirm } = Modal

const AddressGroup = ({ values, errors, touched, setFieldValue, isFormLoading, type, isCustomer }: IAddressGroupProps) => {
  const [modal, setModal] = useState<IAddressModalProps>({ values, setFieldValue, isOpen: false, address: undefined, type: "view" });
  const isView = type === "view";

  return (
    <>
      <AddressModal {...{ ...modal, values, setFieldValue, onClose: () => setModal({ ...modal, address: undefined, isOpen: false }) }} />
      <FormGroup title="Địa chỉ" isLoading={isFormLoading}>
        {values.addresses.length === 0 && <div className="text-center">Chưa thêm địa chỉ</div>}
        {values.addresses.map((address) => {
          const city = getProvince(address.city) ?? { name: "" };
          const district = getDistrict(address.city, address.district) ?? { name: "" };
          const commune = getCommune(address.city, address.district, address.commune) ?? { name: "" };
          const completedAddress = `${address.detailAddress}, ${commune.name}, ${district.name}, ${city.name}`.replaceAll(",,", ",");

          return (
            <div className="flex gap-4 [&>*:first-child]:grow">
              <FormInput isReadonly isDisabled value={completedAddress} />
              {!isCustomer && !isView && (
                <>
                  <RoundedIcon
                    shape="square"
                    icon={HiOutlinePencil}
                    color="primary"
                    size="large"
                    className="cursor-pointer"
                    onClick={() => {
                      setModal({
                        values,
                        setFieldValue,
                        address,
                        isOpen: true,
                        type: "update",
                      });
                    }}
                  />
                  <RoundedIcon shape="square" icon={IoTrashBinOutline} color="red" size="large" className="cursor-pointer" onClick={() => {
                    confirm({
                      title: "Xóa bản ghi?",
                      content: "Bạn có chắc chắn muốn xóa bản ghi này?",
                      onOk: () => {
                        setFieldValue("addresses", values.addresses.filter(a => a.id !== address.id))
                        toast.success("Xóa thành công, dữ liệu sẽ được lưu sau khi hoàn tất cập nhật tài khoản")
                      },
                    });
                  }} />
                </>
              )}
            </div>
          );
        })}
        {!isCustomer && !isView && (
          <Button
            text="Thêm địa chỉ"
            type="ghost"
            className="self-end"
            onClick={() => setModal({ values, setFieldValue, isOpen: true, type: "create" })}
          />
        )}
      </FormGroup>
    </>
  );
};

export default AddressGroup;
