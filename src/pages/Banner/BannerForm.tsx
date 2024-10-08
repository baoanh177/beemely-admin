import React from "react";
import { Formik, FormikProps, Form } from "formik";
import { object, string } from "yup";
import { Col, Row } from "antd";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormInputArea from "@/components/form/FormInputArea";
import Label from "@/components/form/Label";
import UploadImage from "@/components/form/UploadImage";
import { useArchive } from "@/hooks/useArchive";
import { IBanner } from "@/services/store/banner/banner.model";
import { IBannerInitialState } from "@/services/store/banner/banner.slice";
import { createBanner, updateBanner } from "@/services/store/banner/banner.thunk";

interface IBannerFormProps {
  formikRef?: React.RefObject<FormikProps<IBannerFormInitialValues>>;
  type: "create" | "update";
  banner?: IBanner;
  isFormLoading?: boolean;
}

export interface IBannerFormInitialValues {
  id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  path: string;
}
const convertImageUrl = (values: IBannerFormInitialValues) => {
  const { imageUrl, ...rest } = values;
  return {
    ...rest,
    image_url: imageUrl,
  };
};
const BannerForm: React.FC<IBannerFormProps> = ({ formikRef, type, banner, isFormLoading = false }) => {
  const { dispatch } = useArchive<IBannerInitialState>("banner");

  const initialValues: IBannerFormInitialValues = {
    title: banner?.title || "",
    description: banner?.description || "",
    imageUrl: banner?.imageUrl || "",
    path: banner?.path || "",
  };

  const bannerSchema = object().shape({
    title: string().required("Vui lòng nhập tiêu đề banner"),
    imageUrl: string().required("Vui lòng chọn hình ảnh"),
    description: string().required("Vui lòng nhập mô tả"),
    path: string().required("Vui lòng nhập đường dẫn"),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={bannerSchema}
      onSubmit={(values, { setSubmitting }) => {
        const convertedValues = convertImageUrl(values);
        if (type === "create") {
          dispatch(createBanner({ body: convertedValues }));
        } else if (type === "update" && banner?.id) {
          dispatch(updateBanner({ body: convertedValues, param: banner.id }));
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue, isSubmitting }) => (
        <Form>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={6} lg={6}>
              <FormGroup title="Hình ảnh">
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
              <FormGroup title="Thông tin chung" isLoading={isFormLoading || isSubmitting}>
                <Label text="Tiêu đề" isRequired />
                <FormInput
                  placeholder="Nhập tiêu đề ở đây..."
                  name="title"
                  value={values.title}
                  error={touched.title && errors.title ? errors.title : ""}
                  onChange={(e) => setFieldValue("title", e)}
                  onBlur={handleBlur}
                />
                <Label text="Mô tả" />
                <FormInputArea
                  placeholder="Nhập mô tả ở đây..."
                  name="description"
                  value={values.description}
                  error={touched.description && errors.description ? errors.description : ""}
                  onChange={(e) => setFieldValue("description", e)}
                />
                <Label text="Đường dẫn" isRequired />
                <FormInput
                  placeholder="Nhập đường dẫn ở đây..."
                  name="path"
                  value={values.path}
                  error={touched.path && errors.path ? errors.path : ""}
                  onChange={(e) => setFieldValue("path", e)}
                  onBlur={handleBlur}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default BannerForm;
