import { AppDispatch } from "@/services/store";
import { deleteProduct, updateProduct } from "@/services/store/product/product.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { EActiveStatus } from "@/shared/enums/status";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { useNavigate } from "react-router-dom";

export const getGridButtons = (dispatch: AppDispatch): IGridButton[] => {
  const navigate = useNavigate();
  return [
    {
      type: EButtonTypes.ACTIVE,
      onClick(record) {
        const updatedProduct = {
          name: record.productBody.name,
          description: record.productBody.description,
          discount_price: record.productBody.discountPrice,
          regular_price: record.productBody.regularPrice,
          images: record.productBody.images,
          thumbnail: record.productBody.thumbnail,
          brand: record.productBody.brand.id,
          product_type: record.productBody.productType,
          gender: record.productBody.gender.id,
          labels: record.productBody.labels.map((l: any) => l.id),
          product_colors: record.productBody.productColors.map((c: any) => ({
            color_id: c.colorId.id,
            image_url: c.imageUrl,
          })),
          product_sizes: record.productBody.productSizes.map((s: any) => s.id),
          tags: record.productBody.tags.map((t: any) => t.id),

          variants: record.productBody.variants.map((v: any) => ({
            id: v.id,
            color: v.color?.id,
            size: v.size.id,
            price: v.price,
            stock: v.stock,
          })),

          status: record.status === EActiveStatus.ACTIVE ? EActiveStatus.INACTIVE : EActiveStatus.ACTIVE,
        };
        dispatch(
          updateProduct({
            body: updatedProduct,
            param: record.key,
          }),
        );
      },
      permission: EPermissions.UPDATE_PRODUCT,
    },
    {
      type: EButtonTypes.VIEW,
      onClick() {},
      permission: EPermissions.READ_PRODUCT,
    },
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/products/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_PRODUCT,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteProduct({ param: record.key }));
      },
      permission: EPermissions.DELETE_PRODUCT,
    },
  ];
};
