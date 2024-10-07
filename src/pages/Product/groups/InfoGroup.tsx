import FormGroup from "@/components/form/FormGroup";
import { useHookDataProductForm } from "../utils/dataProductForm";
import Label from "@/components/form/Label";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import UploadImage from "@/components/form/UploadImage";
import FormInputArea from "@/components/form/FormInputArea";
import { FormikProps } from "formik";
import { IProductFormInitialValues } from "../ProductForm";

interface IInfoGroupProps extends FormikProps<IProductFormInitialValues> {
  setSize: any;
}
const InfoGroup = ({ values, errors, touched, handleBlur, setFieldValue, setSize }: IInfoGroupProps) => {
  const { getAllBrandsLoading, getAllGendersLoading, getAllProductTypesLoading, stateBrand, stateGender, stateProductType } =
    useHookDataProductForm();
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <FormGroup title="Thông tin sản phẩm" isLoading={getAllBrandsLoading || getAllGendersLoading || getAllProductTypesLoading}>
        <div className="grid grid-rows-2 gap-8">
          <Label text="Tên sản phẩm" />
          <FormInput
            className="w-full"
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(value) => setFieldValue("name", value)}
            onBlur={handleBlur}
            placeholder="Nhập tên sản phẩm..."
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              options={stateProductType?.productTypes.map((type) => ({ value: type.id, label: type.name }))}
              label={`Loại sản phẩm`}
              placeholder="Chọn loại sản phẩm"
              value={values.productType || undefined}
              error={touched.productType ? errors.productType : ""}
              onChange={(value) => {
                setFieldValue("productType", value);
              }}
            />
            <FormSelect
              options={stateBrand?.brands.map((brand) => ({ value: brand.id, label: brand.name }))}
              label={` Thương hiệu`}
              placeholder="Chọn Thương hiệu"
              value={values.brand || undefined}
              error={touched.brand ? errors.brand : ""}
              onChange={(value) => {
                setFieldValue("brand", value);
              }}
            />
          </div>
          <FormSelect
            options={stateGender?.genders.map((gender) => ({ value: gender.id, label: gender.name }))}
            label={`Giới tính`}
            placeholder="Chọn Giới tính"
            value={values.gender || undefined}
            error={touched.gender ? errors.gender : ""}
            onChange={(value) => {
              setFieldValue("gender", value);
              setSize(value);
            }}
          />
        </div>
      </FormGroup>
      <FormGroup title="Thông tin chi tiết sản phẩm">
        <UploadImage
          isMultiple={false}
          label="Thumbnail"
          onImageUpload={(imageURL) => {
            setFieldValue("thumbnail", imageURL);
          }}
          currentImageUrl={values.thumbnail}
          error={touched.thumbnail ? errors.thumbnail : ""}
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
    </div>
  );
};

export default InfoGroup;
