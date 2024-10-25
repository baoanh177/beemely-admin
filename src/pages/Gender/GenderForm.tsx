import { useArchive } from "@/hooks/useArchive";
import { IGenderInitialState } from "@/services/store/gender/gender.slice";
import { createGender, updateGender } from "@/services/store/gender/gender.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import { Col, Row } from "antd";
import UploadImage from "@/components/form/UploadImage";
import { IGender } from "@/services/store/gender/gender.model";
interface IGenderFormProps {
  formikRef?: FormikRefType<IGenderFormInitialValues>;
  type: "create" | "update";
  gender?: IGender;
  isFormLoading?: boolean;
}

export interface IGenderFormInitialValues {
  id?: string;
  name: string;
  imageUrl: string;
  path: string;
}

const GenderForm = ({ formikRef, type, gender, isFormLoading = false }: IGenderFormProps) => {
  const { dispatch } = useArchive<IGenderInitialState>("gender");

  const initialValues: IGenderFormInitialValues = {
    name: gender?.name || "",
    imageUrl: gender?.imageUrl || "",
    path: gender?.path || "",
  };

  const genderSchema = object().shape({
    name: string().required("Vui lòng nhập tên giới tính"),
    imageUrl: string().required("Vui lòng tải lên hình ảnh"),
    path: string().required("Vui lòng nhập đường dẫn"),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={genderSchema}
      onSubmit={(data) => {
        const { imageUrl, ...results } = data;
        if (type === "create") {
          dispatch(createGender({ body: lodash.omit({ ...results, image_url: imageUrl }, "id") }));
        } else if (type === "update" && gender?.id) {
          dispatch(updateGender({ body: lodash.omit({ ...results, image_url: imageUrl }, "id"), param: gender.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue, isSubmitting }) => (
        <Form>
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
              <FormGroup title="Thông tin chung" isLoading={isFormLoading || isSubmitting}>
                <Label text="Tên Giới Tính" isRequired />
                <FormInput
                  placeholder="Nhập tên giới tính ở đây..."
                  name="name"
                  value={values.name}
                  error={touched.name && errors.name ? errors.name : ""}
                  onChange={(e) => setFieldValue("name", e)}
                  onBlur={handleBlur}
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

export default GenderForm;
