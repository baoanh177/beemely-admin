import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { createVoucherType, updateVoucherType } from "@/services/store/voucherType/voucherType.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";

interface IVoucherTypeFormProps {
  formikRef?: FormikRefType<IVoucherTypeFormInitialValues>;
  type: "create" | "update";
  voucherType?: IVoucherTypeFormInitialValues;
  isFormLoading?: boolean;
}

export interface IVoucherTypeFormInitialValues {
  id?: string;
  name: string;
}

const VoucherTypeForm = ({ formikRef, type, voucherType, isFormLoading = false }: IVoucherTypeFormProps) => {
  const { dispatch } = useArchive<IVoucherTypeFormInitialValues>("voucherType");
  const initialValues: IVoucherTypeFormInitialValues = {
    name: voucherType?.name || "",
  };

  const voucherTypeSchema = object().shape({
    name: string().required("Vui lòng nhập tên loại mã giảm giá"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={voucherTypeSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createVoucherType({ body: data }));
        } else if (type === "update" && voucherType?.id) {
          dispatch(updateVoucherType({ body: data, param: voucherType.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <FormInput
            label="Tên loại mã giảm giá"
            placeholder="Nhập tên loại mã giảm giá ở đây..."
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default VoucherTypeForm;
