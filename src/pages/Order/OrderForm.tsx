import { useArchive } from "@/hooks/useArchive";
import { IOrder } from "@/services/store/order/order.model";
import { IProductInitialState } from "@/services/store/product/product.model";
import { Formik, FormikProps } from "formik";
import React from "react";
import InfoGroup from "./groups/InfoGroup";
import AddressGroup from "./groups/AddressGroup";
import ItemsGroup from "./groups/ItemsGroup";

interface IProductFormProps {
  FormikRefType: React.RefObject<FormikProps<any>>;
  type: "create" | "update" | "view";
  order?: IOrder;
  isFormLoading?: boolean;
}
const OrderForm: React.FC<IProductFormProps> = ({ FormikRefType, order }) => {
  const { dispatch } = useArchive<IProductInitialState>("order");
  const initialValues: any = {
    order_id: order?.id,
  };
  console.log(order);
  const handleSubmit = () => {};
  return (
    <Formik innerRef={FormikRefType} initialValues={initialValues} validationSchema={{}} onSubmit={handleSubmit}>
      {(formikData) => {
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
