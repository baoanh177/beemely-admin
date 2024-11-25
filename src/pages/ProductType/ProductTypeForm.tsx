import { useArchive } from "@/hooks/useArchive";
import { IProductTypeInitialState } from "@/services/store/productType/productType.slice";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import { createProductType, updateProductType } from "@/services/store/productType/productType.thunk";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import UploadImage from "@/components/form/UploadImage";
import { Col, Row } from "antd";

interface IProductTypeFormProps {
  formikRef?: FormikRefType<IProductTypeFormInitialValues>;
  type: "create" | "update";
  productType?: IProductTypeFormInitialValues;
  isFormLoading?: boolean;
}

export interface IProductTypeFormInitialValues {
  id?: string;
  name: string;
  imageUrl: string;
}

const ProductTypeForm = ({ formikRef, type, productType, isFormLoading = false }: IProductTypeFormProps) => {
  const { dispatch } = useArchive<IProductTypeInitialState>("productType");

  const initialValues: IProductTypeFormInitialValues = {
    name: productType?.name || "",
    imageUrl: productType?.imageUrl || "",
  };

  const productTypeSchema = object().shape({
    name: string().required("Vui lòng nhập loại sản phẩm"),
    imageUrl: string().required("Vui lòng tải lên hình ảnh"),
  });
  return (
    <div className="mt-8">
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={productTypeSchema}
        onSubmit={(data) => {
          const { imageUrl, ...results } = data;
          if (type === "create") {
            dispatch(createProductType({ body: lodash.omit({ ...results, image_url: imageUrl }, "id") }));
          } else if (type === "update" && productType?.id) {
            dispatch(updateProductType({ body: lodash.omit({ ...results, image_url: imageUrl }, "id"), param: productType.id }));
          }
        }}
      >
        {({ values, errors, touched, handleBlur, setFieldValue }) => (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={6} lg={6}>
              <FormGroup title="Hình ảnh" className="shrink-0">
                <Label text="Ảnh" isRequired />
                <UploadImage
                  isMultiple={false}
                  onImageUpload={(imageURL) => {
                    const url = Array.isArray(imageURL) ? imageURL[0] : imageURL;
                    setFieldValue("imageUrl", url);
                  }}
                  currentImageUrl={values.imageUrl ? [values.imageUrl] : []}
                  error={touched.imageUrl && errors.imageUrl ? errors.imageUrl : ""}
                />
              </FormGroup>
            </Col>
            <Col xs={24} md={18} lg={18}>
              <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
                <Label text="Tên loại sản phẩm" />
                <FormInput
                  placeholder="Nhập tên loại sản phẩm ở đây..."
                  name="name"
                  value={values.name}
                  error={touched.name ? errors.name : ""}
                  onChange={(e) => setFieldValue("name", e)}
                  onBlur={handleBlur}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
      </Formik>
    </div>
  );
};

export default ProductTypeForm;
