import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  description: Yup.string().min(20, "Mô tả sản phẩm tối thiểu 20 ký tự").required("Mô tả là bắt buộc"),
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
        price: Yup.number()
          .required("Giá là bắt buộc")
          .test("is-less-than-discountPrice", "Giá phải lớn hơn giá giảm giá", function (value) {
            return value > this.parent.discountPrice;
          }),
        discountPrice: Yup.number().required("Giá giảm giá là bắt buộc"),
        stock: Yup.number().required("Số lượng là bắt buộc"),
      }),
    )
    .required("Biến thể là bắt buộc")
    .min(1, "Biến thể là bắt buộc"),
  weight: Yup.number()
    .typeError("Trọng lượng gói hàng phải là số (gram)")
    .test("is-positive", "Trọng lượng gói hàng phải lớn hơn 0", (value) => (value ? value > 0 : false))
    .max(30000, "Trọng lượng gói hàng phải nhỏ hơn 30000 gram")
    .required("Trọng lượng gói hàng là bắt buộc"),
  height: Yup.number()
    .typeError("Chiều cao phải là số (cm)")
    .test("is-positive", "Chiều cao phải lớn hơn 0", (value) => (value ? value > 0 : false))
    .max(150, "Chiều cao phải nhỏ hơn 150 cm")
    .required("Chiều cao là bắt buộc"),
  width: Yup.number()
    .typeError("Chiều rộng phải là số (cm)")
    .test("is-positive", "Chiều rộng phải lớn hơn 0", (value) => (value ? value > 0 : false))
    .max(150, "Chiều rộng phải nhỏ hơn 150 cm")
    .required("Chiều rộng là bắt buộc"),
  length: Yup.number()
    .typeError("Chiều dài phải là số (cm)")
    .test("is-positive", "Chiều dài phải lớn hơn 0", (value) => (value ? value > 0 : false))
    .max(150, "Chiều dài phải nhỏ hơn 150 cm")
    .required("Chiều dài là bắt buộc"),
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
  weight: Yup.number()
    .typeError("Trọng lượng gói hàng phải là số (gram)")
    .test("is-positive", "Trọng lượng gói hàng phải lớn hơn 0", (value) => (value ? value > 0 : false))
    .max(30000, "Trọng lượng gói hàng phải nhỏ hơn 30000 gram"),
  height: Yup.number()
    .typeError("Chiều cao phải là số (cm)")
    .max(150, "Chiều cao phải nhỏ hơn 150 cm")
    .test("is-positive", "Chiều cao phải lớn hơn 0", (value) => (value ? value > 0 : false)),
  width: Yup.number()
    .typeError("Chiều rộng phải là số (cm)")
    .max(150, "Chiều rộng phải nhỏ hơn 150 cm")
    .test("is-positive", "Chiều rộng phải lớn hơn 0", (value) => (value ? value > 0 : false)),
  length: Yup.number()
    .typeError("Chiều dài phải là số (cm)")
    .max(150, "Chiều dài phải nhỏ hơn 150 cm")
    .test("is-positive", "Chiều dài phải lớn hơn 0", (value) => (value ? value > 0 : false)),
});
