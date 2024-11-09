import { IOrder } from "@/services/store/order/order.model";
import { Formik, FormikProps } from "formik";
import React from "react";
import AddressGroup from "./groups/AddressGroup";
import InfoGroup from "./groups/InfoGroup";
import ItemsGroup from "./groups/ItemsGroup";

interface IProductFormProps {
  FormikRefType: React.RefObject<FormikProps<any>>;
  type: "create" | "update" | "view";
  order?: IOrder;
  isFormLoading?: boolean;
}
const OrderForm: React.FC<IProductFormProps> = ({ FormikRefType, order }) => {
  const initialValues: any = {
    order_id: order?.id,
  };
  const handleSubmit = () => {};
  return (
    <Formik innerRef={FormikRefType} initialValues={initialValues} validationSchema={{}} onSubmit={handleSubmit}>
      {() => {
        return (
          <>
            <InfoGroup />
            <AddressGroup />
            <ItemsGroup />
          </>
        );
      }}
    </Formik>
  );
};

export default OrderForm;
