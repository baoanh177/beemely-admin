import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { FormikProps } from "formik";
import { IProductFormInitialValues } from "../ProductForm";

interface IPriceGroupProps extends FormikProps<IProductFormInitialValues> {}
const PriceGroup = ({ values, errors, handleBlur, touched, setFieldValue }: IPriceGroupProps) => {
  return (
    <FormGroup title="Giá sản phẩm">
      <FormInput
        label="Giá bán thông thường"
        name="regularPrice"
        value={values.regularPrice}
        error={touched.regularPrice ? errors.regularPrice : ""}
        onChange={(value) => setFieldValue("regularPrice", value)}
        onBlur={handleBlur}
        type="number"
        placeholder="Nhập giá bán..."
      />
      <span className="text-red-500"> {touched.regularPrice && errors.regularPrice} </span>
      <FormInput
        label="Giá bán giảm giá"
        name="discountPrice"
        value={values.discountPrice}
        error={touched.discountPrice ? errors.discountPrice : ""}
        onChange={(value) => setFieldValue("discountPrice", value)}
        onBlur={handleBlur}
        type="number"
        placeholder="Nhập giá bán..."
      />
      <span className="text-red-500"> {touched.discountPrice && errors.discountPrice} </span>
    </FormGroup>
  );
};

export default PriceGroup;
