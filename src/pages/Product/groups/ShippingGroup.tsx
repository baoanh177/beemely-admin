import FormGroup from "@/components/form/FormGroup";
import { FormikProps } from "formik";
import { IProductFormInitialValues } from "../ProductForm";
import FormInput from "@/components/form/FormInput";
import { calculateOrderShippingFee } from "@/utils/calculateShippingFee";
import { formatPrice } from "@/utils/curency";

interface IShippingGroupProps extends FormikProps<IProductFormInitialValues> {}

const ShippingGroup = ({ values, errors, touched, setFieldValue, handleBlur }: IShippingGroupProps) => {
  return (
    <FormGroup title="Vận chuyển">
      <FormInput
        label="Trọng lượng gói hàng (gram)"
        isRequired
        name="weight"
        value={values?.weight}
        error={touched?.weight ? errors?.weight : ""}
        onChange={(value) => setFieldValue("weight", value)}
        onBlur={handleBlur}
        type="number"
        placeholder="Nhập cân nặng..."
      />
      <div className="mt-2">
        <h3 className="mb-1 font-medium">Kích thước sản phẩm</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <FormInput
            label="Chiều cao (cm)"
            isRequired
            name="height"
            value={values?.height}
            error={touched?.height ? errors?.height : ""}
            onChange={(value) => setFieldValue("height", value)}
            onBlur={handleBlur}
            type="number"
            placeholder="Nhập chiều cao..."
          />

          <FormInput
            label="Chiều rộng (cm)"
            isRequired
            name="width"
            value={values?.width}
            error={touched?.width ? errors?.width : ""}
            onChange={(value) => setFieldValue("width", value)}
            onBlur={handleBlur}
            type="number"
            placeholder="Nhập chiều rộng..."
          />

          <FormInput
            label="Chiều dài (cm)"
            isRequired
            name="length"
            value={values?.length}
            error={touched?.length ? errors?.length : ""}
            onChange={(value) => setFieldValue("length", value)}
            onBlur={handleBlur}
            type="number"
            placeholder="Nhập chiều dài..."
          />
        </div>
      </div>
      {!errors.height && !errors.weight && !errors.length && !errors.weight && (
        <div className="mt-2">
          <h3 className="mb-1 font-medium">
            Phí giao hàng dự kiến:{" "}
            {formatPrice(
              calculateOrderShippingFee({ weight: values.weight, height: values.height, length: values.length, width: values.width }),
            )}
          </h3>
          <p className="text-sm text-gray-300">
            Phí vận chuyển được tính dựa trên trọng lượng thực tế hoặc trọng lượng thể tích, tùy theo mức nào cao hơn. Phí vận chuyển ước tính
            của sản phẩm được tính dựa trên kích thước {values.height}*{values.width}*{values.length} inch và vị trí của khách hàng và người bán.
            Phí vận chuyển chỉ mang tính tham khảo. Phí vận chuyển thực tế tùy thuộc vào vị trí giao hàng của khách hàng.
          </p>
        </div>
      )}
    </FormGroup>
  );
};

export default ShippingGroup;
