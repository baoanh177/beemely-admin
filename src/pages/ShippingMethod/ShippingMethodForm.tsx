import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import { useArchive } from "@/hooks/useArchive";
import { IShippingMethod } from "@/services/store/shippingMethod/shippingMethod.model";
import { IShippingMethodInitialState } from "@/services/store/shippingMethod/shippingMethod.slice";
import { createShippingMethod, updateShippingMethod } from "@/services/store/shippingMethod/shippingMethod.thunk";
import { Formik, FormikProps } from "formik";
import React from "react";
import { number, object, string } from "yup";

export interface IShippingMethodFormInitialValues {
  id?: string;
  name: string;
  cost?: number;
  estimatedDeliveryTime?: string;
}

interface IShippingMethodFormProps {
  FormikRefType?: React.MutableRefObject<FormikProps<IShippingMethodFormInitialValues> | null>;
  type: "create" | "update";
  shippingMethod?: IShippingMethod;
  isFormLoading?: boolean;
}

const ShippingMethodForm: React.FC<IShippingMethodFormProps> = ({ FormikRefType, type, shippingMethod, isFormLoading = false }) => {
  const { dispatch } = useArchive<IShippingMethodInitialState>("shippingMethod");

  const initialValues: IShippingMethodFormInitialValues = {
    name: shippingMethod?.name || "",
    cost: shippingMethod?.cost || undefined,
    estimatedDeliveryTime: shippingMethod?.estimatedDeliveryTime || "",
  };

  const shippingMethodSchema = object().shape({
    name: string().required("Vui lòng nhập tên phương pháp vận chuyển"),
    cost: number().required("Vui lòng nhập giá").min(0, "Giá không được nhỏ hơn 0"),
    estimatedDeliveryTime: string().required("Vui lòng nhập thời gian giao hàng ước tính"),
  });

  const handleSubmit = (values: IShippingMethodFormInitialValues) => {
    const transformedData: any = {
      name: values.name,
      cost: values.cost,
      estimated_delivery_time: values.estimatedDeliveryTime,
    };

    if (type === "create") {
      dispatch(createShippingMethod({ body: transformedData }));
    } else if (type === "update" && shippingMethod) {
      dispatch(updateShippingMethod({ param: shippingMethod.id, body: transformedData }));
    }
  };

  return (
    <Formik innerRef={FormikRefType} initialValues={initialValues} validationSchema={shippingMethodSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <Label text="Tên phương pháp vận chuyển" isRequired />
          <FormInput
            placeholder="Vui lòng nhập phương pháp vận chuyển"
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
          <Label text="Giá" isRequired />
          <FormInput
            type="number"
            placeholder="Vui lòng nhập giá"
            name="cost"
            value={values.cost}
            error={touched.cost ? errors.cost : ""}
            onChange={(e) => setFieldValue("cost", e)}
            onBlur={handleBlur}
          />
          <Label text="Thời gian giao hàng ước tính" isRequired />
          <FormInput
            placeholder="Vui lòng nhập thời gian giao hàng ước tính"
            name="estimatedDeliveryTime"
            value={values.estimatedDeliveryTime}
            error={touched.estimatedDeliveryTime ? errors.estimatedDeliveryTime : ""}
            onChange={(e) => setFieldValue("estimatedDeliveryTime", e)}
            onBlur={handleBlur}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default ShippingMethodForm;
