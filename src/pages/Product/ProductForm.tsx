import { useArchive } from "@/hooks/useArchive";
import { IProduct, IProductInitialState } from "@/services/store/product/product.model";
import { createProduct, updateProduct } from "@/services/store/product/product.thunk";
import { IVariant } from "@/services/store/variant/variant.model";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import InfoGroup from "./groups/InfoGroup";
import LabelsGroup from "./groups/LabelsGroup";
import MediaGroup from "./groups/MediaGroup";
import VariantGroup from "./groups/VariantGroup";
import { IProductColor } from "@/services/store/productColor/productColor.model";
import { validationSchema, validationUpdateSchema } from "./utils/validation";

export interface IProductFormInitialValues {
  name: string;
  description: string;
  images: string[];
  thumbnail: string;
  productColors: IProductColor[] | any;
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

const ProductForm: React.FC<IProductFormProps> = ({ FormikRefType, type, product }) => {
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
    variants: product?.variants || [],
  };

  const handleSubmit = (values: IProductFormInitialValues) => {
    const transformedData: any = {
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
      variants: values.variants.map((e: any) => {
        const { discountPrice, ...rest } = e;
        return {
          ...rest,
          discount_price: discountPrice,
        };
      }),
    };

    if (type === "create") {
      const formatProductColor = values.productColors.map((c: any) => {
        return {
          color_id: c.colorId,
          image_url: c.imageUrl,
        };
      });
      transformedData.product_colors = formatProductColor;
      dispatch(createProduct({ body: transformedData }));
    } else if (type === "update" && product) {
      const formatVariant: any[] = values.variants.map((v) => {
        if (typeof v === "object") {
          const { discountPrice, ...rest } = v;
          return {
            ...rest,
            color: v.color!.id ? v.color!.id : v.color,
            size: v.size.id ? v.size.id : v.size,
            discount_price: discountPrice,
          };
        }
      });
      const formatProductColor: any[] = values.productColors.map((c: any) => {
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

  const [size, setSize] = useState<any>();
  return (
    <Formik
      innerRef={FormikRefType}
      initialValues={initialValues}
      validationSchema={type === "create" ? validationSchema : validationUpdateSchema}
      onSubmit={handleSubmit}
    >
      {(formikData) => {
        return (
          <>
            <InfoGroup {...formikData} setSize={setSize} />
            <MediaGroup {...formikData} />
            <LabelsGroup {...formikData} />
            <VariantGroup {...formikData} product={product} type={type} size={size} />
            {/*

            */}
          </>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
