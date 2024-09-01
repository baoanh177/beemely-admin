import { useArchive } from "@/hooks/useArchive";
import { IProductTypeInitialState } from "@/services/store/productType/productType.slice";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import { createProductType, updateProductType } from "@/services/store/productType/productType.thunk";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";

interface IProductTypeFormProps {
  formikRef?: FormikRefType<IProductTypeFormInitialValues>;
  type: "create" | "update";
  productType?: IProductTypeFormInitialValues;
  isFormLoading?: boolean;
}

export interface IProductTypeFormInitialValues {
  id?: string;
  name: string;
}

const ProductTypeForm = ({ formikRef, type, productType, isFormLoading = false }: IProductTypeFormProps) => {
  const { dispatch } = useArchive<IProductTypeInitialState>("productType");

  const initialValues: IProductTypeFormInitialValues = {
    name: productType?.name || "",
  };

  const productTypeSchema = object().shape({
    name: string().required("Vui lòng nhập tên trạng thái đơn hàng"),
  });
  return (
    <div>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={productTypeSchema}
        onSubmit={(data) => {
          if (type === "create") {
            dispatch(createProductType({ body: lodash.omit(data, "id") }));
          } else if (type === "update" && productType?.id) {
            dispatch(updateProductType({ body: lodash.omit(data, "id"), param: productType.id }));
          }
        }}
      >
        {({ values, errors, touched, handleBlur, setFieldValue }) => (
          <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
            <FormInput
              label="Tên loại sản phẩm"
              placeholder="Nhập tên loại sản phẩm ở đây..."
              name="name"
              value={values.name}
              error={touched.name ? errors.name : ""}
              onChange={(e) => setFieldValue("name", e)}
              onBlur={handleBlur}
            />
          </FormGroup>
        )}
      </Formik>
    </div>
  );
};

export default ProductTypeForm;
