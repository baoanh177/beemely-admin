import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IProductInitialState } from "@/services/store/product/product.model";
import { resetStatus } from "@/services/store/product/product.slice";
import { getProductById } from "@/services/store/product/product.thunk";
import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm, { IProductFormInitialValues } from "../ProductForm";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { EFetchStatus } from "@/shared/enums/status";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IProductFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IProductInitialState>("product");

  useFetchStatus({
    module: "product",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/products",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getProductByIdLoading } = useAsyncEffect(
    (async) => {
      id && async(dispatch(getProductById({ param: id })), "getProductByIdLoading");
    },
    [id],
  );

  useEffect(() => {
    if (state.activeProduct && formikRef.current) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeProduct.name,
          thumbnail: state.activeProduct.thumbnail,
          description: state.activeProduct.description,
          regularPrice: state.activeProduct.regularPrice,
          discountPrice: state.activeProduct.discountPrice,
          brand: state.activeProduct.brand?.id || "",
          gender: state.activeProduct.gender?.id || "",
          tags: state.activeProduct.tags.map((tag) => tag.id) || [],
          images: state.activeProduct.images,
          variants: state.activeProduct.variants,
          labels: state.activeProduct.labels.map((label) => label.id),
          productColors: state.activeProduct.productColors.map((c) => {
            return {
              colorId: c.colorId,
              imageUrl: c.imageUrl,
            };
          }),
          productSizes: state.activeProduct.productSizes.map((size) => size.id),
          productType: state.activeProduct.productType,
        });
      }
    }
  }, [state.activeProduct]);

  const handleSubmit = () => {
    if (formikRef.current) {
      console.log(formikRef);
      formikRef.current.handleSubmit();
    }
  };
  return (
    <>
      <Heading
        title="Cập nhật Sản phẩm"
        hasBreadcrumb
        buttons={[
          {
            text: "Quay lại",
            type: "secondary",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/products");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Lưu thay đổi",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      {state.activeProduct && (
        <ProductForm type="update" isFormLoading={getProductByIdLoading ?? true} FormikRefType={formikRef} product={state.activeProduct} />
      )}
    </>
  );
};

export default UpdateProduct;
