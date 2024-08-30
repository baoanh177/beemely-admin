import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import { useArchive } from "@/hooks/useArchive";
import { IPaymentStatusInitialState } from "@/services/store/paymentStatus/paymentStatus.slice";
import { createPaymentStatus, updatePaymentStatus } from "@/services/store/paymentStatus/paymentStatus.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";

interface IPaymentStatusFormProps {
  formikRef?: FormikRefType<IPaymentStatusFormInitialValues>;
  type: "create" | "update";
  paymentStatus?: IPaymentStatusFormInitialValues;
  isFormLoading?: boolean;
}

export interface IPaymentStatusFormInitialValues {
  id?: string;
  name: string;
}

const PaymentStatusForm = ({ formikRef, type, paymentStatus, isFormLoading = false }: IPaymentStatusFormProps) => {
  const { dispatch } = useArchive<IPaymentStatusInitialState>("paymentStatus");
  const initialValues: IPaymentStatusFormInitialValues = {
    name: paymentStatus?.name || "",
  };

  const paymentStatusSchema = object().shape({
    name: string().required("Vui lòng nhập tên trạng thái thanh toán"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={paymentStatusSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createPaymentStatus({ body: data }));
        } else if (type === "update" && paymentStatus?.id) {
          dispatch(updatePaymentStatus({ body: data, param: paymentStatus.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <Label text="Tên trạng thái thanh toán" isRequired />
          <FormInput
            placeholder="Nhập tên trạng thái thanh toán ở đây..."
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

export default PaymentStatusForm;
