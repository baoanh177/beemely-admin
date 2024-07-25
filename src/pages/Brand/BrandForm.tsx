import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormInputArea from "@/components/form/FormInputArea";
import UploadImage from "@/components/form/UploadImage";
import { useArchive } from "@/hooks/useArchive";
import { IBrand } from "@/services/store/brand/brand.model";
import { IBrandInitialState } from "@/services/store/brand/brand.slice";
import { createBrand, updateBrand } from "@/services/store/brand/brand.thunk";
import { Col, Row } from "antd";
import { Formik, FormikProps } from "formik";
import React from "react";
import { object, string } from "yup";

interface IBrandFormProps {
  FormikRefType?: React.MutableRefObject<FormikProps<IBrand> | null>;
  type: "create" | "update";
  brand?: IBrand;
}

const BrandForm: React.FC<IBrandFormProps> = ({ FormikRefType, type, brand }) => {
  const { dispatch } = useArchive<IBrandInitialState>("brand");

  const initialValues: IBrand = {
    name: brand?.name ?? "",
    image: brand?.image ?? "",
    description: brand?.description ?? "",
  };

  const brandSchema = object().shape({
    name: string().required("Vui lòng nhập tên thương hiệu"),
    image: string().required("Vui lòng chọn hình ảnh"),
  });

  const handleImageUpload = (imageURL: string | string[]) => {
    const url = Array.isArray(imageURL) ? imageURL[0] : imageURL;
    FormikRefType?.current?.setFieldValue("image", url);
  };

  return (
    <Formik
      innerRef={FormikRefType}
      initialValues={initialValues}
      validationSchema={brandSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createBrand({ body: data }));
        } else if (type === "update" && brand?.id) {
          dispatch(updateBrand({ body: data, param: brand.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6} lg={6}>
            <FormGroup title="Ảnh đại diện">
              <UploadImage isMultiple={false} label="Ảnh" onImageUpload={handleImageUpload} currentImageUrl={values.image} />
            </FormGroup>
          </Col>
          <Col xs={24} md={18} lg={18}>
            <FormGroup title="Thông tin chung">
              <FormInput
                label="Tên thương hiệu"
                placeholder="Nhập tên thương hiệu ở đây..."
                name="name"
                value={values.name}
                error={touched.name ? errors.name : ""}
                onChange={(e) => setFieldValue("name", e)}
                onBlur={handleBlur}
              />
              <FormInputArea
                label="Mô tả"
                placeholder="Nhập mô tả ở đây..."
                name="description"
                value={values.description}
                error={touched.description ? errors.description : ""}
                onChange={(e) => setFieldValue("description", e)}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default BrandForm;
