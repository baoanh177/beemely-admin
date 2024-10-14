import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { IAccountFormInitialValues } from "../data/dataForm";
import { FormikProps } from "formik";
import Button from "@/components/common/Button";
import { useState } from "react";
import PasswordModal from "../modals/PasswordModal";
import Label from "@/components/form/Label";
import { EGender } from "@/shared/enums/genders";
import FormCheck from "@/components/form/FormCheck";

interface IGeneralGroupProps extends FormikProps<IAccountFormInitialValues> {
  isFormLoading?: boolean;
  type: "create" | "update" | "view";
  isCustomer?: boolean;
}

const GeneralGroup = ({ values, errors, touched, setFieldValue, isFormLoading, type, isCustomer }: IGeneralGroupProps) => {
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  return (
    <>
      <PasswordModal {...{ isOpen: passwordModal, onClose: () => setPasswordModal(false) }} />
      <FormGroup title="Thông tin tổng quan" isLoading={isFormLoading}>
        <FormInput
          placeholder="Nhập họ tên ở đây..."
          label="Họ tên"
          onChange={(value) => {
            if (type === "view") return;
            setFieldValue("full_name", value);
          }}
          isRequired
          isDisabled={type === "view" || isCustomer}
          value={values.full_name}
          error={touched.full_name ? errors.full_name : ""}
        />
        <FormInput
          placeholder="Nhập email ở đây..."
          label="Email"
          onChange={(value) => {
            if (type === "view" || type === "update" || isCustomer) return;
            setFieldValue("email", value);
          }}
          isRequired
          isDisabled={type === "view" || type === "update" || isCustomer}
          value={values.email}
          error={touched.email ? errors.email : ""}
        />

        {type === "update" || type === "view" ? (
          <div className="flex items-end justify-between gap-4 [&>*:first-child]:grow">
            <FormInput placeholder="Nhập mật khẩu ở đây..." label="Mật khẩu" type="password" isRequired isDisabled value="matkhautuongtrung" />
            {type === "update" && !isCustomer && <Button text="Đổi mật khẩu" type="ghost" onClick={() => { setPasswordModal(true) }} />}
          </div>
        ) : (
          <FormInput
            placeholder="Nhập mật khẩu ở đây..."
            label="Mật khẩu"
            type="password"
            onChange={(value) => {
              setFieldValue("password", value);
            }}
            isRequired
            value={values.password}
            error={touched.password ? errors.password : ""}
          />
        )}
        <FormInput
          placeholder="Nhập số điện thoại ở đây..."
          isRequired
          isDisabled={type === "view" || isCustomer}
          label="Số điện thoại"
          onChange={(value) => {
            if (type === "view") return;
            setFieldValue("phone", value);
          }}
          value={values.phone}
          error={touched.phone ? errors.phone : ""}
        />
        <div className="">
        <Label text="Giới tính" isRequired />
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            {(Object.keys(EGender) as Array<keyof typeof EGender>).map((key, index) => {
              return (
                <FormCheck
                  key={index}
                  type="radio"
                  label={EGender[key]}
                  name="gender"
                  isDefaultChecked
                  checked={values.gender === EGender[key]}
                  value={EGender[key]}
                  onChange={(checked) => {
                    if (type !== "view") {
                      setFieldValue("gender", checked ? EGender[key] : "");
                    }
                  }}
                />
              );
            })}
          </div>
          {errors.gender && <span className="text-red-500">{errors.gender}</span>}
        </div>
      </div>
      </FormGroup>
    </>
  );
};

export default GeneralGroup;
