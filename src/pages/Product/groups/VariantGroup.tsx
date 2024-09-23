import FormGroup from "@/components/form/FormGroup";
import FormSelect from "@/components/form/FormSelect";
import UploadImage from "@/components/form/UploadImage";
import { IColor } from "@/services/store/color/color.model";
import { IProduct } from "@/services/store/product/product.model";
import { ISize } from "@/services/store/size/size.model";
import { IVariant } from "@/services/store/variant/variant.model";
import { Button, Checkbox, InputNumber, Modal, Table } from "antd";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { TiDeleteOutline, TiPlusOutline } from "react-icons/ti";
import ButtonGhost from "../../../components/common/Button";
import { IProductFormInitialValues } from "../ProductForm";
import { generateVariantCombinations } from "../utils/generateVariantCombinations";
import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState } from "@/services/store/color/color.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllColors } from "@/services/store/color/color.thunk";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { getAllSizes } from "@/services/store/size/size.thunk";
import { useHookDataProductForm } from "../utils/dataProductForm";

interface IVariantGroupProps extends FormikProps<IProductFormInitialValues> {
  product: IProduct | undefined;
  type: string;
}
const VariantGroup = ({ values, errors, touched, setFieldValue, product, type }: IVariantGroupProps) => {
  const { getAllColorsLoading, getAllSizesLoading, stateColor, stateSize } = useHookDataProductForm();

  const [variantOptions, setVariantOptions] = useState({ size: [], color: [] });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setVariantOptions({
      color: stateColor.colors,
      size: stateSize.sizes,
    });
  }, [stateSize, stateColor]);

  const [variantTypes, setVariantTypes] = useState<{ name: string; options: string[] }[]>([]);

  const variantTypesOptions = [
    { value: "color", label: "Màu sắc" },
    { value: "size", label: "Kích thước" },
  ];
  type VariantOptionKey = keyof typeof variantOptions;

  let newDataVariants;
  const [dataVariants, setDataVariants] = useState<IVariant[] | undefined>();
  useEffect(() => {
    if (variantOptions.color?.length > 0 && variantOptions.size?.length > 0)
      newDataVariants = generateVariantCombinations(variantTypes, variantOptions);
    setDataVariants(newDataVariants);
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

  console.log(values);
  if (!getAllSizesLoading && !getAllColorsLoading)
    return (
      <FormGroup title="Biến thể sản phẩm" isLoading={getAllSizesLoading || getAllColorsLoading}>
        {variantTypes.map((variantType, index) => {
          // useEffect(() => {
          //   console.log(values);
          // }, [values]);
          return (
            <div key={index} className="mb-4">
              <div className="flex flex-wrap gap-4 [&>*]:grow [&>*]:basis-64">
                <div className="flex flex-col">
                  <FormSelect
                    options={variantTypesOptions}
                    label={`Loại biến thể ${index + 1}`}
                    placeholder="Chọn loại biến thể"
                    value={variantType.name || undefined}
                    error={touched.variants ? errors.variants : ""}
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
                              currentImageUrl={values.productColors.find((pic) => pic.colorId?.id === opt.id)?.imageUrl}
                              // error={touched.productColors? errors.productColors : ""}
                            />
                          </Modal>
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
        <ButtonGhost
          type="ghost"
          icon={<TiPlusOutline />}
          text="Thêm biến thể"
          onClick={() => setVariantTypes([...variantTypes, { name: "", options: [] }])}
        />

        {(variantTypes.length > 0 || dataVariants) && (
          <div className="mt-4">
            <h3 className="mb-2 font-medium">Bảng giá và số lượng cho biến thể</h3>
            <Table
              dataSource={dataVariants}
              columns={[
                ...variantTypes.map((v) => ({
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
                      value={values.variants[index]?.price}
                      onChange={(value) => {
                        const newVariants = [...values.variants];
                        newVariants[index] = { ...newVariants[index], color: record.colorId, size: record.sizeId, price: value };
                        setFieldValue("variants", newVariants);
                      }}
                    />
                  ),
                },
                {
                  title: "Số lượng",
                  key: "stock",
                  render: (_, record, index) => (
                    <InputNumber
                      min={0}
                      value={values.variants[index]?.stock}
                      onChange={(value) => {
                        const newVariants = [...values.variants];
                        newVariants[index] = { ...newVariants[index], color: record.colorId, size: record.sizeId, stock: value };
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
                          (_, i) => !Object.keys(record).every((key) => record[key] === dataVariants[i][key]),
                        );
                        const newDataVariants = dataVariants?.filter(
                          (variant) => !Object.keys(record).every((key) => record[key] === variant[key]),
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
      </FormGroup>
    );
};

export default VariantGroup;
