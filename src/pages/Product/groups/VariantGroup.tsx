import FormGroup from "@/components/form/FormGroup";
import FormSelect from "@/components/form/FormSelect";
import UploadImage from "@/components/form/UploadImage";
import ColorForm, { IColorFormInitialValues } from "@/pages/Color/ColorForm";
import { IColor } from "@/services/store/color/color.model";
import { IProduct } from "@/services/store/product/product.model";
import { ISize } from "@/services/store/size/size.model";
import { Button, Checkbox, InputNumber, Modal, Table } from "antd";
import { FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { TiDeleteOutline, TiPlusOutline } from "react-icons/ti";
import ButtonGhost from "../../../components/common/Button";
import { IProductFormInitialValues } from "../ProductForm";
import { generateVariantCombinations } from "../utils/generateVariantCombinations";
import FormInput from "@/components/form/FormInput";

interface IVariantGroupProps extends FormikProps<IProductFormInitialValues> {
  product: IProduct | undefined;
  type: string;
  size: any;
  props: any;
}
const VariantGroup = ({ values, errors, touched, setFieldValue, product, type, size, props }: IVariantGroupProps) => {
  const { getAllColorsLoading, getAllSizesLoading, stateColor, stateSize } = props;

  const [variantOptions, setVariantOptions] = useState<any>({ size: [], color: [] });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const formikRef = useRef<FormikProps<IColorFormInitialValues>>(null);

  const [filterSize, setFilterSize] = useState<any>();

  useEffect(() => {
    const filter = stateSize.sizes.filter((s: any) => {
      if (size) return s.gender?.id === size;
      else if (product) return s.gender?.id === product?.gender?.id;
      return false;
    });
    setFilterSize(filter);
  }, [size, product?.gender, stateSize.sizes]);
  useEffect(() => {
    setVariantOptions({
      color: stateColor.colors,
      size: filterSize,
    });
  }, [filterSize, stateColor]);

  const [variantTypes, setVariantTypes] = useState<any>([
    { name: "size", options: [] },
    { name: "color", options: [] },
  ]);

  type VariantOptionKey = keyof typeof variantOptions;

  let newDataVariants: any;
  const [dataVariants, setDataVariants] = useState<any>();

  useEffect(() => {
    if (variantOptions.color?.length > 0 && variantOptions.size?.length > 0) {
      newDataVariants = generateVariantCombinations(variantTypes, variantOptions);
      setDataVariants(newDataVariants);
    }
  }, [variantTypes, variantOptions]);

  useEffect(() => {
    if (type === "update" && product) {
      const newVariantTypes = [];
      if (product.productColors && product.productColors.length > 0) {
        newVariantTypes.push({
          name: "color",
          options: product.productColors.map((pc) => pc.colorId?.id),
        });
      }
      if (product.productSizes && product.productSizes.length > 0) {
        newVariantTypes.push({
          name: "size",
          options: product.productSizes.map((ps) => ps.id),
        });
      }
      setVariantTypes(newVariantTypes);
      setVariantOptions(newVariantTypes);

      const formattedVariants = product.variants.map((v) => ({
        ...v,
        color: v.color?.name,
        colorId: v.color?.id,
        size: v.size?.name,
        sizeId: v.size?.id,
      }));
      setDataVariants(formattedVariants);
    }
  }, [product, type]);

  if (!getAllSizesLoading && !getAllColorsLoading)
    return (
      <FormGroup title="Biến thể sản phẩm" isLoading={getAllSizesLoading || getAllColorsLoading}>
        {variantTypes.map((variantType: any, index: number) => {
          return (
            <div key={index} className="mb-4">
              <div className="flex flex-wrap gap-4 [&>*]:grow [&>*]:basis-64">
                <div className="flex flex-col">
                  {/* <FormSelect
                    options={variantType.name === "color" ? [{ value: "color", label: "Màu sắc" }] : [{ value: "size", label: "Cỡ" }]}
                    label={`Loại biến thể ${index + 1}`}
                    placeholder="Chọn loại biến thể"
                    defaultValue={variantType.name || undefined}
                    onChange={(value) => {
                      const newVariantTypes = [...variantTypes];
                      newVariantTypes[index] = { name: value, options: [] };
                      setVariantTypes(newVariantTypes);
                    }}
                  /> */}
                  <FormInput
                    isReadonly={true}
                    label={`Loại biến thể ${index + 1}`}
                    defaultValue={variantType.name === "color" ? "Màu sắc" : " Cỡ"}
                    error={touched.name ? errors.name : ""}
                    placeholder="Nhập tên sản phẩm..."
                  />
                  {/* <Button
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
                  </Button> */}
                </div>
                {variantType.name === "color" ? (
                  <div>
                    <label className="mb-2 block text-[14px]">Tùy chọn biến thể {index + 1}</label>
                    <div className="flex flex-wrap gap-2">
                      {(variantOptions[variantType.name as VariantOptionKey] as Array<IColor>)?.map((opt: IColor) => (
                        <label key={opt.id} className="flex items-center">
                          <input
                            type="checkbox"
                            className="hidden"
                            value={opt.id}
                            checked={variantType.options.includes(opt.id)}
                            onChange={(e) => {
                              const newOptions = e.target.checked
                                ? [...variantType.options, opt.id]
                                : variantType.options.filter((id: any) => id !== opt.id);
                              const newVariantTypes = [...variantTypes];
                              newVariantTypes[index] = { ...variantType, options: newOptions };
                              setVariantTypes(newVariantTypes);
                              setSelectedColor(opt.id);
                              if (e.target.checked) {
                                setIsModalVisible(true);
                              }
                            }}
                          />
                          <span
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                              variantType.options.includes(opt.id) ? "bg-[#883DCF] text-white" : "text-gray-700 bg-[#F9F9FC] hover:bg-gray-200"
                            } ${variantType.name === "color" ? "flex items-center" : ""} `}
                          >
                            {variantType.name === "color" && (
                              <span className="mr-2 h-5 w-5 border border-gray-300 shadow-inner" style={{ backgroundColor: opt.value }} />
                            )}
                            {opt.name}
                          </span>
                          <Modal
                            title={`Upload ảnh cho màu ${opt.name}`}
                            open={isModalVisible && selectedColor === opt.id}
                            onOk={() => setIsModalVisible(false)}
                            onCancel={() => setIsModalVisible(false)}
                          >
                            <UploadImage
                              isMultiple={false}
                              label="Product Color Image"
                              onImageUpload={(imageURL) => {
                                const productColor = { colorId: selectedColor, imageUrl: imageURL };
                                setFieldValue("productColors", [...values.productColors, productColor]);
                              }}
                              currentImageUrl={values.productColors.find((pic: any) => pic.colorId?.id === opt.id)?.imageUrl}
                              // error={touched.productColors? errors.productColors : ""}
                            />
                          </Modal>
                        </label>
                      ))}
                      <Button
                        type="dashed"
                        icon={<TiPlusOutline />}
                        onClick={() => {
                          setIsModalVisible2(true);
                        }}
                      >
                        Thêm màu
                      </Button>
                      <Modal open={isModalVisible2} onOk={() => setIsModalVisible2(false)} onCancel={() => setIsModalVisible2(false)}>
                        <ColorForm formikRef={formikRef} type="create" />
                      </Modal>
                    </div>

                    {touched.productColors && (
                      <span className="m-auto text-sm text-red-500">
                        {typeof errors.productColors === "string" ? errors.productColors : null}
                      </span>
                    )}
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
                        setFieldValue("productSizes", checkedValues);
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
        {variantTypes.length < 2 ? (
          <ButtonGhost
            type="ghost"
            icon={<TiPlusOutline />}
            text="Thêm biến thể"
            onClick={() => setVariantTypes([...variantTypes, { name: "", options: [] }])}
          />
        ) : null}

        {(variantTypes.length > 0 || dataVariants) && values.productColors.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 font-medium">Bảng giá và số lượng cho biến thể</h3>
            <Table
              dataSource={dataVariants}
              columns={[
                ...variantTypes.map((v: any) => ({
                  title: v.name === "color" ? "Màu sắc" : " Cỡ",
                  dataIndex: v.name,
                  key: v.name,
                })),
                {
                  title: "Giá",
                  key: "price",
                  render: (_, record, index) => (
                    <InputNumber
                      min={0}
                      value={values.variants[index]?.price || 0}
                      onChange={(value: any) => {
                        const newVariants = [...values.variants];
                        newVariants[index] = {
                          ...newVariants[index],
                          color: record.colorId,
                          size: record.sizeId,
                          stock: record?.stock || 50,
                          discountPrice: record?.discountPrice || 0,
                          price: value,
                        };
                        setFieldValue("variants", newVariants);
                      }}
                    />
                  ),
                },
                {
                  title: "Giá giảm giá",
                  key: "discount_price",
                  render: (_, record, index) => (
                    <InputNumber
                      min={0}
                      value={values.variants[index]?.discountPrice || 0}
                      onChange={(value: any) => {
                        const newVariants = [...values.variants];
                        newVariants[index] = { ...newVariants[index], color: record.colorId, size: record.sizeId, discountPrice: value };
                        setFieldValue("variants", newVariants);
                      }}
                    />
                  ),
                },
                {
                  title: "Số lượng",
                  key: "stock",
                  render: (_, record, index) => {
                    return (
                      <InputNumber
                        min={0}
                        value={values.variants[index]?.stock || 50}
                        onChange={(value: any) => {
                          const newVariants = [...values.variants];
                          newVariants[index] = { ...newVariants[index], color: record.colorId, size: record.sizeId, stock: value };
                          setFieldValue("variants", newVariants);
                        }}
                      />
                    );
                  },
                },
                {
                  title: "Hành động",
                  key: "action",
                  render: (_, record, index) => (
                    <Button
                      disabled={values.variants[index]?.enableDelete}
                      icon={<TiDeleteOutline />}
                      onClick={() => {
                        const newVariants = values.variants.filter(
                          (_, i) => !Object.keys(record).every((key) => record[key] === dataVariants[i][key]),
                        );
                        const newDataVariants = dataVariants?.filter(
                          (variant: any) => !Object.keys(record).every((key) => record[key] === variant[key]),
                        );

                        setFieldValue("variants", newVariants);
                        setDataVariants(newDataVariants);
                      }}
                    />
                  ),
                },
              ]}
              pagination={false}
            />
          </div>
        )}
        {touched.variants?.length! > 0 ? (
          <span className="m-auto text-sm text-red-500">
            {typeof errors.variants === "string"
              ? errors.variants
              : Array.isArray(errors.variants) && typeof errors.variants[0] !== "string"
                ? errors.variants[0]?.price
                : Array.isArray(errors.variants)
                  ? errors.variants.join(", ")
                  : null}
          </span>
        ) : null}
      </FormGroup>
    );
};

export default VariantGroup;
