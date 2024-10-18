import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  thumbnail: Yup.string().url("URL không hợp lệ").required("Ảnh đại diện là bắt buộc"),
  images: Yup.array().of(Yup.string().url("URL không hợp lệ")).min(1, "Ít nhất một ảnh là bắt buộc"),
  productColors: Yup.array()
    .of(
      Yup.object().shape({
        colorId: Yup.string().required("Mã màu là bắt buộc"),
        imageUrl: Yup.string().url("URL không hợp lệ").required("URL ảnh là bắt buộc"),
      }),
    )
    .min(1, "Ít nhất một màu là bắt buộc"),
  productSizes: Yup.array().of(Yup.string()).min(1, "Ít nhất một kích thước là bắt buộc"),
  gender: Yup.string().required("Giới tính là bắt buộc"),
  brand: Yup.string().required("Thương hiệu là bắt buộc"),
  productType: Yup.string().required("Loại sản phẩm là bắt buộc"),
  tags: Yup.array().of(Yup.string()).min(1, "Ít nhất một thẻ là bắt buộc"),
  labels: Yup.array().of(Yup.string()).min(1, "Ít nhất một nhãn hiệu là bắt buộc").max(3, "Nhiều nhất là 3 nhãn hiệu"),
  variants: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.string().required("Cỡ là bắt buộc"),
        color: Yup.string().required("Màu là bắt buộc"),
        price: Yup.number().required("Giá là bắt buộc"),
        discountPrice: Yup.number().required("Giá giảm giá là bắt buộc"),
        stock: Yup.number().required("Số lượng là bắt buộc"),
      }),
    )
    .required("Biến thể là bắt buộc")
    .min(1, "Biến thể là bắt buộc"),
});

export const validationUpdateSchema = Yup.object().shape({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  // regularPrice: Yup.number().min(0, "Giá không thể âm").required("Giá bán là bắt buộc"),
  thumbnail: Yup.string().url("URL không hợp lệ").required("Ảnh đại diện là bắt buộc"),
  images: Yup.array().of(Yup.string().url("URL không hợp lệ")).min(1, "Ít nhất một ảnh là bắt buộc"),
  // discountPrice: Yup.number().min(0, "Giá không thể âm").required("Giá khuyến mãi là bắt buộc"),
  productSizes: Yup.array().of(Yup.string()).min(1, "Ít nhất một kích thước là bắt buộc"),
  gender: Yup.string().required("Giới tính là bắt buộc"),
  brand: Yup.string().required("Thương hiệu là bắt buộc"),
  productType: Yup.string().required("Loại sản phẩm là bắt buộc"),
  tags: Yup.array().of(Yup.string()).min(1, "Ít nhất một thẻ là bắt buộc"),
  labels: Yup.array().of(Yup.string()).min(1, "Ít nhất một nhãn hiệu là bắt buộc").max(3, "Nhiều nhất là 3 nhãn hiệu"),
});
