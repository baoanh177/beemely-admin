import { useArchive } from "@/hooks/useArchive";
import { IProduct, IProductInitialState } from "@/services/store/product/product.model";
import { createProduct, updateProduct } from "@/services/store/product/product.thunk";
import { IProductColor } from "@/services/store/productColor/productColor.model";
import { IVariant } from "@/services/store/variant/variant.model";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import InfoGroup from "./groups/InfoGroup";
import LabelsGroup from "./groups/LabelsGroup";
import MediaGroup from "./groups/MediaGroup";
import PriceGroup from "./groups/PriceGroup";
import VariantGroup from "./groups/VariantGroup";

export interface IProductFormInitialValues {
  name: string;
  description: string;
  regularPrice: number;
  thumbnail: string;
  images: string[];
  discountPrice: number;
  productColors: string[];
  productSizes: string[];
  gender: string;
  brand: string;
  tags: string[];
  labels: string[];
  variants: IVariant[];
  productType: string;
}

interface IProductFormProps {
  FormikRefType: React.RefObject<FormikProps<IProductFormInitialValues>>;
  type: "create" | "update" | "view";
  product?: IProduct;
  isFormLoading?: boolean;
}

const ProductForm: React.FC<IProductFormProps> = ({ FormikRefType, type, product, isFormLoading = false }) => {
  const { dispatch } = useArchive<IProductInitialState>("product");

  const initialValues: IProductFormInitialValues = {
    name: product?.name || "",
    description: product?.description || "",
    thumbnail: product?.thumbnail || "",
    gender: product?.gender?.id || "",
    brand: product?.brand?.id || "",
    productColors: product?.productColors || [],
    images: product?.images || [],
    tags: product?.tags?.map((tag) => tag.id) || [],
    labels: product?.labels?.map((label) => label.id) || [],
    productType: product?.productType || "",
    productSizes: product?.productSizes?.map((size) => size.id) || [],
    regularPrice: product?.regularPrice || 0,
    discountPrice: product?.discountPrice || 0,
    variants: product?.variants || [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên sản phẩm là bắt buộc"),
    description: Yup.string().required("Mô tả là bắt buộc"),
    regularPrice: Yup.number().min(0, "Giá không thể âm").required("Giá bán là bắt buộc"),
    thumbnail: Yup.string().url("URL không hợp lệ").required("Ảnh đại diện là bắt buộc"),
    images: Yup.array().of(Yup.string().url("URL không hợp lệ")).min(1, "Ít nhất một ảnh là bắt buộc"),
    discountPrice: Yup.number().min(0, "Giá không thể âm").required("Giá khuyến mãi là bắt buộc"),
    // productColors: Yup.array().of(Yup.string()).min(1, "Ít nhất một màu là bắt buộc"),
    productSizes: Yup.array().of(Yup.string()).min(1, "Ít nhất một kích thước là bắt buộc"),
    gender: Yup.string().required("Giới tính là bắt buộc"),
    brand: Yup.string().required("Thương hiệu là bắt buộc"),
    productType: Yup.string().required("Loại sản phẩm là bắt buộc"),
    tags: Yup.array().of(Yup.string()).min(1, "Ít nhất một thẻ là bắt buộc"),
    labels: Yup.array().of(Yup.string()).min(1, "Ít nhất một nhãn hiệu là bắt buộc").max(3, "Nhiều nhất là 3 nhãn hiệu"),
    // variants: Yup.array().of(
    //   Yup.object().shape({
    //     size: Yup.string().required("Cỡ là bắt buộc"),
    //     color: Yup.string().required("Màu là bắt buộc"),
    //     price: Yup.number().required("Giá là bắt buộc"),
    //     stock: Yup.number().required("Số lượng là bắt buộc").required("Biến thể là bắt buộc"),
    //   }),
    // ),
  });

  const handleSubmit = (values: IProductFormInitialValues) => {
    const transformedData = {
      name: values.name,
      description: values.description,
      thumbnail: values.thumbnail,
      gender: values.gender,
      brand: values.brand,
      product_colors: values.productColors,
      images: values.images,
      tags: values.tags,
      labels: values.labels,
      product_type: values.productType,
      product_sizes: values.productSizes,
      regular_price: values.regularPrice,
      discount_price: values.discountPrice,
      variants: values.variants,
    };

    if (type === "create") {
      const formatProductColor = values.productColors.map((c) => {
        return {
          color_id: c.colorId,
          image_url: c.imageUrl,
        };
      });
      transformedData.product_colors = formatProductColor;
      dispatch(createProduct({ body: transformedData }));
    } else if (type === "update" && product) {
      const formatVariant: IVariant[] = values.variants.map((v) => {
        if (typeof v === "object")
          return {
            ...v,
            color: v.color!.id ? v.color!.id : v.color,
            size: v.size.id ? v.size.id : v.size,
          };
      });
      const formatProductColor: IProductColor[] = values.productColors.map((c) => {
        return {
          color_id: c.colorId.id ? c.colorId.id : c.colorId,
          image_url: c.imageUrl,
        };
      });
      transformedData.variants = formatVariant;
      transformedData.product_colors = formatProductColor;
      dispatch(updateProduct({ param: product.id, body: transformedData }));
    }
  };

  return (
    <Formik innerRef={FormikRefType} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formikData) => {
        return (
          <>
            <InfoGroup {...formikData} />
            <MediaGroup {...formikData} />
            <LabelsGroup {...formikData} />
            <PriceGroup {...formikData} />
            <VariantGroup {...formikData} product={product} type={type} />
            {/*

            */}
          </>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
