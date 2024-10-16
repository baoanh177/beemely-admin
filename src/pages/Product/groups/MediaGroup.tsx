import FormGroup from "@/components/form/FormGroup";
import UploadImage from "@/components/form/UploadImage";
import { FormikProps } from "formik";
import { IProductFormInitialValues } from "../ProductForm";

interface IMediaGroupProps extends FormikProps<IProductFormInitialValues> {}
const MediaGroup = ({ values, errors, touched, setFieldValue }: IMediaGroupProps) => {
  return (
    <FormGroup title="Media">
      <UploadImage
        isMultiple={true}
        label="Ảnh"
        onImageUpload={(imageURLs) => {
          if (Array.isArray(imageURLs)) {
            setFieldValue("images", imageURLs);
          } else if (typeof imageURLs === "string") {
            setFieldValue("images", [...values.images, imageURLs]);
          }
        }}
        currentImageUrl={values.images}
        error={touched.images ? (errors.images as string) : ""}
      />
    </FormGroup>
  );
};

export default MediaGroup;
