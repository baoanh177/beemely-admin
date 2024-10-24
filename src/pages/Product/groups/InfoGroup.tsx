import FormGroup from "@/components/form/FormGroup";
import { useHookDataProductForm } from "../utils/dataProductForm";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { FormikProps } from "formik";
import { IProductFormInitialValues } from "../ProductForm";
import QuillEditor from "@/components/form/QuillEditor";
import FormInputArea from "@/components/form/FormInputArea";

interface IInfoGroupProps extends FormikProps<IProductFormInitialValues> {
  setSize: any;
}
const InfoGroup = ({ values, errors, touched, handleBlur, setFieldValue, setSize }: IInfoGroupProps) => {
  const { getAllBrandsLoading, getAllGendersLoading, getAllProductTypesLoading, stateBrand, stateGender, stateProductType } =
    useHookDataProductForm();

  return (
    <div className="grid w-full gap-4">
      <FormGroup title="Thông tin sản phẩm" isLoading={getAllBrandsLoading || getAllGendersLoading || getAllProductTypesLoading}>
        <div className="grid grid-rows-2 gap-8">
          <FormInput
            className="w-full"
            name="name"
            label="Tên sản phẩm"
            isRequired
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(value) => setFieldValue("name", value)}
            onBlur={handleBlur}
            placeholder="Nhập tên sản phẩm..."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormSelect
              isRequired
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
              isRequired
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
            isRequired
            options={stateGender?.genders.map((gender) => ({ value: gender.id, label: gender.name }))}
            label={`Sản phẩm dành cho:`}
            placeholder="Chọn Sản"
            value={values.gender || undefined}
            error={touched.gender ? errors.gender : ""}
            onChange={(value) => {
              setFieldValue("gender", value);
              setSize(value);
            }}
          />
        </div>
      </FormGroup>
      <FormGroup title="Thông tin sản phẩm" isLoading={getAllBrandsLoading || getAllGendersLoading || getAllProductTypesLoading}>
        <FormInputArea
          label="Mô tả ngắn"
          placeholder="Nhập mô tả ngắn về sản phẩm..."
          name="sortDescription"
          value={values.sortDescription}
          error={touched.sortDescription ? errors.sortDescription : ""}
          onChange={(e) => setFieldValue("sortDescription", e)}
        />
        <QuillEditor
          label="Mô tả sản phẩm"
          value={values.description}
          onChange={(content) => setFieldValue("description", content)}
          error={touched.description ? errors.description : ""}
          placeholder="Nhập mô tả sản phẩm..."
        />
      </FormGroup>
    </div>
  );
};

export default InfoGroup;
