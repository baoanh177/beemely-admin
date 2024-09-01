import React, { useState } from "react";
import { FormikProps, Formik } from "formik";
import * as Yup from "yup";
import { useArchive } from "@/hooks/useArchive";
import { createProduct, updateProduct } from "@/services/store/product/product.thunk";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { IProduct, IProductInitialState } from "@/services/store/product/product.model";
import UploadImage from "@/components/form/UploadImage";
import FormInputArea from "@/components/form/FormInputArea";
import { Button, InputNumber, Table } from "antd";
import { TiDeleteOutline, TiPlusOutline } from "react-icons/ti";
import { Checkbox } from "antd";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllSizes } from "@/services/store/size/size.thunk";
import { getAllColors } from "@/services/store/color/color.thunk";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { ISize } from "@/services/store/size/size.model";
import { IColor } from "@/services/store/color/color.model";
import ButtonGhost from "../../components/common/Button";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { IProductTypeInitialState } from "@/services/store/productType/productType.slice";
import { IBrandInitialState } from "@/services/store/brand/brand.slice";
import { IGenderInitialState } from "@/services/store/gender/gender.slice";
import { getAllProductTypes } from "@/services/store/productType/productType.thunk";
import { getAllBrands } from "@/services/store/brand/brand.thunk";
import { getAllGenders } from "@/services/store/gender/gender.thunk";
import { ILabelInitialState } from "@/services/store/label/label.slice";
import { getAllLabels } from "@/services/store/label/label.thunk";
import { ITagInitialState } from "@/services/store/tag/tag.slice";
import { getAllTags } from "@/services/store/tag/tag.thunk";

export interface IProductFormInitialValues {
  name: string;
  description: string;
  regularPrice: number;
  thumbnail: string;
  images: string[];
  discountPrice: number;
  product_colors: { color_id: string; image_url: string }[];
  product_type: string;
  product_sizes: string[];
  gender: string;
  brand: string;
  tags: string[];
  label: string[];
  variants: { color: string; size: string; price: number; quantity: number }[];
}

interface IProductFormProps {
  formikRef: React.RefObject<FormikProps<IProductFormInitialValues>>;
  type: "create" | "update" | "view";
  product?: IProduct;
  isFormLoading?: boolean;
}

const ProductForm: React.FC<IProductFormProps> = ({ formikRef, type, product, isFormLoading = false }) => {
  const { dispatch } = useArchive<IProductInitialState>("product");

  const [variantTypes, setVariantTypes] = useState<{ name: string; options: string[] }[]>([]);

  const initialValues: IProductFormInitialValues = {
    name: product?.name || "",
    description: product?.description || "",
    thumbnail: "",
    gender: "",
    brand: "",
    product_colors: [],
    images: [],
    tags: [],
    label: [],
    product_type: "",
    product_sizes: [],
    regularPrice: product?.regularPrice || 0,
    discountPrice: product?.discountPrice || 0,
    variants: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên sản phẩm là bắt buộc"),
    regularPrice: Yup.number().min(0, "Giá không thể âm").required("Giá bán là bắt buộc"),
    // Add more validation rules as needed
  });

  const handleSubmit = (values: IProductFormInitialValues) => {
    if (type === "create") {
      dispatch(createProduct({ body: values }));
    } else if (type === "update" && product) {
      dispatch(updateProduct({ param: product.id, body: values }));
    }
  };

  const { state: stateSize, dispatch: dispatchSize } = useArchive<ISizeInitialState>("size");
  const { getAllSizesLoading } = useAsyncEffect(
    (async) => async(dispatchSize(getAllSizes({ query: stateSize.filter })), "getAllSizesLoading"),
    [JSON.stringify(stateSize.filter)],
  );

  const { state: stateColor, dispatch: dispatchColor } = useArchive<IColorInitialState>("color");
  const { getallcolorsloading } = useAsyncEffect(
    (async) => async(dispatchColor(getAllColors({ query: stateColor.filter })), "getAllColorsLoading"),
    [JSON.stringify(stateColor.filter)],
  );

  const { state: stateProductType } = useArchive<IProductTypeInitialState>("productType");
  const { getAllProductTypesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllProductTypes({ query: stateProductType.filter })), "getAllProductTypesLoading"),
    [JSON.stringify(stateProductType.filter)],
  );

  const { state: stateBrand } = useArchive<IBrandInitialState>("brand");
  const { getAllBrandsLoading } = useAsyncEffect(
    (async) => {
      async(dispatch(getAllBrands({ query: stateBrand.filter })), "getAllBrandsLoading");
    },
    [JSON.stringify(stateBrand.filter)],
  );
  const { state: stateGender } = useArchive<IGenderInitialState>("gender");
  const { getAllGendersLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllGenders({ query: stateGender.filter })), "getAllGendersLoading"),
    [JSON.stringify(stateGender.filter)],
  );

  const { state: stateLabel } = useArchive<ILabelInitialState>("label");
  const { getAllLabelsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllLabels({ query: stateLabel.filter })), "getAllLabelsLoading"),
    [JSON.stringify(stateLabel.filter)],
  );

  const { state: stateTag } = useArchive<ITagInitialState>("tag");
  const { getAllTagsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllTags({ query: { _pagination: false, ...stateTag.filter } })), "getAllTagsLoading"),
    [JSON.stringify(stateTag.filter)],
  );
  const variantOptions = {
    color: stateColor.colors,
    size: stateSize.sizes,
  };
  const variantTypesOptions = [
    { value: "color", label: "Màu sắc" },
    { value: "size", label: "Kích thước" },
  ];

  type VariantOptionKey = keyof typeof variantOptions;

  const generateVariantCombinations = (variants: any[]) => {
    if (variants.length === 0) return [];

    const [first, ...rest] = variants;
    if (rest.length === 0) {
      return first.options.map((optionId: string) => {
        const option = variantOptions[first.name as VariantOptionKey].find((opt) => opt.id === optionId);
        return {
          [first.name]: option ? option.name : optionId,
          [`${first.name}Id`]: optionId,
        };
      });
    }

    const subCombinations = generateVariantCombinations(rest);

    return first.options.flatMap((optionId: string) => {
      const option = variantOptions[first.name as VariantOptionKey].find((opt) => opt.id === optionId);
      return subCombinations.map((subCombo) => ({
        [first.name]: option ? option.name : optionId,
        [`${first.name}Id`]: optionId,
        ...subCombo,
      }));
    });
  };

  return (
    <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleBlur, setFieldValue }) => {
        return (
          <>
            <div className="grid w-full grid-cols-2 gap-4">
              <FormGroup
                title="Thông tin sản phẩm"
                isLoading={isFormLoading || getAllBrandsLoading || getAllGendersLoading || getAllProductTypesLoading}
              >
                <div className="grid grid-rows-2 gap-8">
                  <FormInput
                    label="Tên sản phẩm"
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
                      value={values.product_type || undefined}
                      onChange={(value) => {
                        setFieldValue("product_type", value);
                      }}
                    />
                    <FormSelect
                      options={stateBrand?.brands.map((brand) => ({ value: brand.id, label: brand.name }))}
                      label={` Thương hiệu`}
                      placeholder="Chọn Thương hiệu"
                      value={values.brand || undefined}
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
                    onChange={(value) => {
                      setFieldValue("gender", value);
                    }}
                  />
                </div>
              </FormGroup>

              <FormGroup title="Thông tin chi tiết sản phẩm" isLoading={isFormLoading}>
                <UploadImage
                  isMultiple={false}
                  label="Thumbnail"
                  onImageUpload={(imageURL) => {
                    const url = Array.isArray(imageURL) ? imageURL[0] : imageURL;
                    setFieldValue("thumbnail", url);
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

            <FormGroup title="Media" isLoading={isFormLoading}>
              <UploadImage
                isMultiple={false}
                label="Ảnh"
                onImageUpload={(imageURL) => {
                  const url = Array.isArray(imageURL) ? imageURL[0] : imageURL;
                  setFieldValue("image", url);
                }}
                currentImageUrl={values.thumbnail}
                error={touched.thumbnail ? errors.thumbnail : ""}
              />
            </FormGroup>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup title="Nhãn hiệu" isLoading={isFormLoading || getAllLabelsLoading}>
                <div>
                  <label className="mb-2 block text-[14px]"> Chọn Nhãn hiệu</label>
                  <Checkbox.Group
                    options={stateLabel?.labels.map((label) => ({ value: label.id, label: label.name }))}
                    value={values.label}
                    onChange={(checkedValues) => setFieldValue("label", checkedValues)}
                  />
                </div>
              </FormGroup>
              <FormGroup title="Thẻ" isLoading={isFormLoading || getAllTagsLoading}>
                <div>
                  <label className="mb-2 block text-[14px]"> Chọn thẻ</label>
                  <Checkbox.Group
                    options={stateTag?.tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                    value={values.tags}
                    onChange={(checkedValues) => setFieldValue("tags", checkedValues)}
                  />
                </div>
              </FormGroup>
            </div>
            <FormGroup title="Giá sản phẩm" isLoading={isFormLoading}>
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
              <FormInput
                label="Giá bán giảm giá"
                name="discountPrice"
                value={values.discountPrice}
                error={touched.discountPrice ? errors.discountPrice : ""}
                onChange={(value) => setFieldValue("regularPrice", value)}
                onBlur={handleBlur}
                type="number"
                placeholder="Nhập giá bán..."
              />
            </FormGroup>
            <FormGroup title="Biến thể sản phẩm" isLoading={isFormLoading || getAllSizesLoading || getallcolorsloading}>
              {variantTypes.map((variantType, index) => {
                return (
                  <div key={index} className="mb-4">
                    <div className="flex flex-wrap gap-4 [&>*]:grow [&>*]:basis-64">
                      <div className="flex flex-col">
                        <FormSelect
                          options={variantTypesOptions}
                          label={`Loại biến thể ${index + 1}`}
                          placeholder="Chọn loại biến thể"
                          value={variantType.name || undefined}
                          onChange={(value) => {
                            const newVariantTypes = [...variantTypes];
                            newVariantTypes[index] = { name: value, options: [] };
                            setVariantTypes(newVariantTypes);
                          }}
                        />
                        <Button
                          className="mt-1 max-w-40"
                          type="text"
                          icon={<TiDeleteOutline />}
                          onClick={() => {
                            const newVariants = [...variantTypes];
                            newVariants.splice(index, 1);
                            setVariantTypes(newVariants);
                          }}
                        >
                          Xóa biến thể
                        </Button>
                      </div>
                      {variantType.name === "color" ? (
                        <div>
                          <label className="mb-2 block text-[14px]">Tùy chọn biến thể {index + 1}</label>
                          <div className="flex flex-wrap gap-2">
                            {(variantOptions[variantType.name as VariantOptionKey] as Array<IColor>).map((opt: IColor) => (
                              <label key={opt.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  value={opt.id}
                                  checked={variantType.options.includes(opt.id)}
                                  onChange={(e) => {
                                    const newOptions = e.target.checked
                                      ? [...variantType.options, opt.id]
                                      : variantType.options.filter((id) => id !== opt.id);
                                    const newVariantTypes = [...variantTypes];
                                    newVariantTypes[index] = { ...variantType, options: newOptions };
                                    setVariantTypes(newVariantTypes);
                                  }}
                                />
                                <span
                                  className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                                    variantType.options.includes(opt.id)
                                      ? "bg-[#883DCF] text-white"
                                      : "text-gray-700 bg-[#F9F9FC] hover:bg-gray-200"
                                  } ${variantType.name === "color" ? "flex items-center" : ""} `}
                                >
                                  {variantType.name === "color" && (
                                    <span className="mr-2 h-5 w-5 border border-gray-300 shadow-inner" style={{ backgroundColor: opt.value }} />
                                  )}
                                  {opt.name}
                                </span>
                              </label>
                            ))}
                            <Button type="dashed" icon={<TiPlusOutline />} onClick={() => {}}>
                              Thêm màu
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="mb-2 block text-[14px]">Tùy chọn biến thể {index + 1}</label>

                          <Checkbox.Group
                            options={(variantOptions[variantType.name as VariantOptionKey] as Array<ISize>)?.map((opt: ISize) => ({
                              label: opt.name,
                              value: opt.id,
                            }))}
                            value={variantType.options}
                            onChange={(checkedValues) => {
                              const newVariantTypes = [...variantTypes];
                              newVariantTypes[index] = { ...variantType, options: checkedValues };
                              setVariantTypes(newVariantTypes);
                            }}
                          />
                          <Button className="" type="dashed" icon={<TiPlusOutline />} onClick={() => {}}>
                            Thêm cỡ
                          </Button>
                        </div>
                      )}{" "}
                    </div>
                  </div>
                );
              })}
              <ButtonGhost
                type="ghost"
                icon={<TiPlusOutline />}
                text="Thêm biến thể"
                onClick={() => setVariantTypes([...variantTypes, { name: "", options: [] }])}
              />

              {variantTypes.length > 0 && (
                <div className="mt-4">
                  <h3 className="mb-2 font-medium">Bảng giá và số lượng cho biến thể</h3>
                  <Table
                    dataSource={generateVariantCombinations(variantTypes)}
                    columns={[
                      ...variantTypes.map((v) => ({
                        title: v.name,
                        dataIndex: v.name,
                        key: v.name,
                      })),
                      {
                        title: "Giá",
                        key: "price",
                        render: (_, record, index) => (
                          <InputNumber
                            min={0}
                            value={values.variants[index]?.price}
                            onChange={(value) => {
                              const newVariants = [...values.variants];
                              newVariants[index] = { ...newVariants[index], color: record.color, size: record.size, price: value };
                              setFieldValue("variants", newVariants);
                            }}
                          />
                        ),
                      },
                      {
                        title: "Số lượng",
                        key: "quantity",
                        render: (_, record, index) => (
                          <InputNumber
                            min={0}
                            value={values.variants[index]?.quantity}
                            onChange={(value) => {
                              const newVariants = [...values.variants];
                              newVariants[index] = { ...newVariants[index], color: record.color, size: record.size, quantity: value };
                              setFieldValue("variants", newVariants);
                            }}
                          />
                        ),
                      },
                      {
                        title: "Hành động",
                        key: "action",
                        render: (_, record) => (
                          <Button
                            icon={<TiDeleteOutline />}
                            onClick={() => {
                              const newVariants = values.variants.filter(
                                (_, i) => !Object.keys(record).every((key) => record[key] === generateVariantCombinations(variantTypes)[i][key]),
                              );
                              setFieldValue("variants", newVariants);
                            }}
                          />
                        ),
                      },
                    ]}
                    pagination={false}
                  />
                </div>
              )}
            </FormGroup>
          </>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
