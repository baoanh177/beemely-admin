import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { IPaymentTypeInitialState } from "@/services/store/paymentType/paymentType.slice";
import { createPaymentType, updatePaymentType } from "@/services/store/paymentType/paymentType.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";

interface IPaymentTypeFormProps {
  formikRef?: FormikRefType<IPaymentTypeFormInitialValues>;
  type: "create" | "update";
  paymentType?: IPaymentTypeFormInitialValues;
  isFormLoading?: boolean;
}

export interface IPaymentTypeFormInitialValues {
  id?: string;
  name: string;
}

const PaymentTypeForm = ({ formikRef, type, paymentType, isFormLoading = false }: IPaymentTypeFormProps) => {
  const { dispatch } = useArchive<IPaymentTypeInitialState>("paymentType");
  const initialValues: IPaymentTypeFormInitialValues = {
    name: paymentType?.name || "",
  };

  const paymentTypeSchema = object().shape({
    name: string().required("Vui lòng nhập tên loại thanh toán"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={paymentTypeSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createPaymentType({ body: data }));
        } else if (type === "update" && paymentType?.id) {
          dispatch(updatePaymentType({ body: data, param: paymentType.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <FormInput
            label="Tên loại thanh toán"
            placeholder="Nhập tên loại thanh toán ở đây..."
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

export default PaymentTypeForm;
