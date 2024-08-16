import { useArchive } from "@/hooks/useArchive";
import { IOrderStatusInitialState } from "@/services/store/orderStatus/orderStatus.slice";
import { createOrderStatus, updateOrderStatus } from "@/services/store/orderStatus/orderStatus.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";

interface IOrderStatusFormProps {
  formikRef?: FormikRefType<IOrderStatusFormInitialValues>;
  type: "create" | "update";
  orderStatus?: IOrderStatusFormInitialValues;
  isFormLoading?: boolean;
}

export interface IOrderStatusFormInitialValues {
  id?: string;
  name: string;
  description: string;
}

const OrderStatusForm = ({ formikRef, type, orderStatus, isFormLoading = false }: IOrderStatusFormProps) => {
  const { dispatch } = useArchive<IOrderStatusInitialState>("orderStatus");

  const initialValues: IOrderStatusFormInitialValues = {
    name: orderStatus?.name || "",
    description: orderStatus?.description || "",
  };

  const orderStatusSchema = object().shape({
    name: string().required("Vui lòng nhập tên trạng thái đơn hàng"),
    description: string(),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={orderStatusSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createOrderStatus({ body: lodash.omit(data, "id") }));
        } else if (type === "update" && orderStatus?.id) {
          dispatch(updateOrderStatus({ body: lodash.omit(data, "id"), param: orderStatus.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <FormInput
            label="Tên trạng thái"
            placeholder="Nhập tên trạng thái ở đây..."
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
          <FormInput
            label="Mô tả"
            placeholder="Nhập mô tả ở đây..."
            name="description"
            value={values.description}
            onChange={(e) => setFieldValue("description", e)}
            onBlur={handleBlur}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default OrderStatusForm;
