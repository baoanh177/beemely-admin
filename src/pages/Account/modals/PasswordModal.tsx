import { useRef } from "react";
import { Formik, FormikProps } from "formik";
import FormInput from "@/components/form/FormInput";
import { Modal } from "antd";
import { object, ref, string } from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/store";
import { changePassword } from "@/services/store/account/account.thunk";
import { useParams } from "react-router-dom";

export interface IPasswordModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface IChangePasswordFormInitialValues {
  password: string;
  confirm: string;
}

const PasswordModal = ({ isOpen, onClose }: IPasswordModalProps) => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const formikRef = useRef<FormikProps<IChangePasswordFormInitialValues>>(null);
  const validationSchema = object().shape({
    password: string().min(6, "Mật khẩu cần tối thiểu 6 ký tự").required("Vui lòng nhập mật khẩu"),
    confirm: string()
      .oneOf([ref("password")], "Mật khẩu không khớp")
      .required("Vui lòng xác nhận mật khẩu"),
  });
  const initialValues: IChangePasswordFormInitialValues = {
    password: "",
    confirm: "",
  };
  const handleSubmit = (data: IChangePasswordFormInitialValues) => {
    // setNewPassword("password", data.password);
    dispatch(changePassword({ param: id, body: { password: data.password } }))
    onClose && onClose();
  };
  return (
    <>
      <Modal
        title="Đổi mật khẩu"
        okText="Lưu"
        cancelText="Quay lại"
        open={isOpen}
        onOk={() => {
          formikRef && formikRef.current && formikRef.current.handleSubmit();
        }}
        onCancel={() => {
          onClose && onClose();
        }}
      >
        <Formik
          innerRef={formikRef}
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, handleBlur }) => {
            return (
              <div className="flex flex-col gap-4">
                <FormInput
                  type="password"
                  name="password"
                  isRequired
                  placeholder="Nhập mật khẩu mới..."
                  label="Mật khẩu mới"
                  value={values.password}
                  onChange={(value) => {
                    setFieldValue("password", value);
                  }}
                  onBlur={handleBlur}
                  error={touched.password ? errors.password : ""}
                />
                <FormInput
                  type="password"
                  name="confirm"
                  isRequired
                  placeholder="Nhập lại mật khẩu..."
                  label="Xác nhận mật khẩu"
                  value={values.confirm}
                  onChange={(value) => {
                    setFieldValue("confirm", value);
                  }}
                  onBlur={handleBlur}
                  error={touched.confirm ? errors.confirm : ""}
                />
              </div>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default PasswordModal;
