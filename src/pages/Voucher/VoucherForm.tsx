import { useArchive } from "@/hooks/useArchive";
import { IVoucherInitialState } from "@/services/store/voucher/voucher.slice";
import { createVoucher, updateVoucher } from "@/services/store/voucher/voucher.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import lodash from "lodash";
import dayjs from "dayjs";
import { EActiveStatus } from "@/shared/enums/status";
import { Dayjs } from "dayjs";
import { IVoucher } from "@/services/store/voucher/voucher.model";
import FormDateRangePicker from "@/components/form/FormDateRangePicker";
import { date, number, object, string } from "yup";
import * as yup from "yup";
import { EVoucherType } from "@/shared/enums/voucherType";
interface IVoucherFormProps {
  formikRef?: FormikRefType<IVoucherFormInitialValues>;
  type: "create" | "update" | "view";
  voucher?: IVoucher;
  isFormLoading?: boolean;
}

export interface IVoucherFormInitialValues {
  id?: string;
  name: string;
  code: string;
  maxUsage: number;
  discount: number;
  discountTypes: "percentage" | "fixed";
  minimumOrderPrice: number;
  maxReduce: number;
  voucherType: EVoucherType;
  status: EActiveStatus;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const VoucherForm = ({ formikRef, type, voucher, isFormLoading = false }: IVoucherFormProps) => {
  const { dispatch } = useArchive<IVoucherInitialState>("voucher");

  const createVoucherSchema = object().shape({
    name: string().required("Vui lòng nhập tên mã giảm giá"),
    code: string().required("Vui lòng nhập mã giảm giá"),
    maxUsage: number().min(1, "Số lần sử dụng tối đa phải lớn hơn 0"),
    discount: number().when("discountTypes", {
      is: "percentage",
      then: () => number().min(1, "Mức giảm giá phải lớn hơn 0").max(50, "Mức giảm giá không được vượt quá 50%"),
      otherwise: () => number().min(1, "Mức giảm giá phải lớn hơn 0"),
    }),
    minimumOrderPrice: number().min(1, "Giá trị đơn hàng tối thiểu phải lớn hơn 0"),
    maxReduce: yup.mixed().when("discountTypes", {
      is: "percentage",
      then: () =>
        number()
          .typeError("Giá trị giảm tối đa phải là số")
          .positive("Giá trị giảm tối đa phải lớn hơn 0")
          .required("Giá trị giảm tối đa là bắt buộc khi loại giảm giá là phần trăm"),
      otherwise: () => number().notRequired().nullable().min(0, "Giá trị giảm tối đa phải lớn hơn hoặc bằng 0"),
    }),
    startDate: date().required("Vui lòng chọn ngày bắt đầu và ngày kết thúc").min(dayjs().startOf("day"), "Ngày bắt đầu phải từ hôm nay trở đi"),
    endDate: date().min(yup.ref("startDate"), "Ngày kết thúc phải sau ngày bắt đầu"),
  });

  const updateVoucherSchema = object().shape({
    name: string().required("Vui lòng nhập tên mã giảm giá"),
    code: string().required("Vui lòng nhập mã giảm giá"),
    maxUsage: number().min(1, "Số lần sử dụng tối đa phải lớn hơn 0"),
    discount: number().when("discountTypes", {
      is: "percentage",
      then: () => number().min(1, "Mức giảm giá phải lớn hơn 0").max(50, "Mức giảm giá không được vượt quá 50%"),
      otherwise: () => number().min(1, "Mức giảm giá phải lớn hơn 0"),
    }),
    minimumOrderPrice: number().min(1, "Giá trị đơn hàng tối thiểu phải lớn hơn 0"),
    maxReduce: yup.mixed().when("discountTypes", {
      is: "percentage",
      then: () =>
        number()
          .typeError("Giá trị giảm tối đa phải là số")
          .positive("Giá trị giảm tối đa phải lớn hơn 0")
          .required("Giá trị giảm tối đa là bắt buộc khi loại giảm giá là phần trăm"),
      otherwise: () => number().notRequired().nullable().min(0, "Giá trị giảm tối đa phải lớn hơn hoặc bằng 0"),
    }),
    startDate: date().required("Vui lòng chọn ngày bắt đầu và ngày kết thúc"),
    endDate: date().min(yup.ref("startDate"), "Ngày kết thúc phải sau ngày bắt đầu"),
  });

  const initialValues: IVoucherFormInitialValues = {
    name: voucher?.name || "",
    code: voucher?.code || "",
    maxReduce: voucher?.maxReduce || 0,
    maxUsage: voucher?.maxUsage || 0,
    discount: voucher?.discount || 0,
    discountTypes: voucher?.discountTypes || "percentage",
    minimumOrderPrice: voucher?.minimumOrderPrice || 0,
    voucherType: voucher?.voucherType || EVoucherType.DEADLINE,
    startDate: voucher?.startDate ? dayjs(voucher.startDate) : null,
    endDate: voucher?.endDate ? dayjs(voucher.endDate) : null,
    status: voucher?.status || EActiveStatus.INACTIVE,
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize={true}
      validationSchema={type === "create" ? createVoucherSchema : updateVoucherSchema}
      initialValues={initialValues}
      onSubmit={(data) => {
        const transformedData = {
          max_usage: data.maxUsage,
          discount_types: data.discountTypes,
          minimum_order_price: data.minimumOrderPrice,
          voucher_type: data.voucherType,
          start_date: data.startDate ? dayjs(data.startDate) : null,
          end_date: data.endDate ? dayjs(data.endDate) : null,
          name: data.name,
          code: data.code,
          discount: data.discount,
          max_reduce: data.maxReduce,
        };
        if (type === "create") {
          dispatch(createVoucher({ body: lodash.omit(transformedData, ["status"]) }));
        } else if (type === "update" && voucher?.id) {
          dispatch(updateVoucher({ body: lodash.omit(transformedData, ["status"]), param: voucher.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => {
        return (
          <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
            <FormInput
              isDisabled={type === "view"}
              label="Tên mã giảm giá"
              placeholder="Nhập tên mã giảm giá ở đây..."
              name="name"
              value={values.name}
              error={touched.name ? errors.name : ""}
              onChange={(e) => setFieldValue("name", e)}
              onBlur={handleBlur}
            />
            <FormInput
              isDisabled={type === "view"}
              label="Mã giảm giá"
              placeholder="Nhập mã giảm giá ở đây..."
              name="code"
              value={values.code}
              error={touched.code ? errors.code : ""}
              onChange={(e) => setFieldValue("code", e)}
              onBlur={handleBlur}
            />
            <FormSelect
              isDisabled={type === "view"}
              label="Loại giảm giá"
              placeholder="Chọn loại giảm giá..."
              options={[
                { label: "Percentage", value: "percentage" },
                { label: "Fixed", value: "fixed" },
              ]}
              value={values.discountTypes}
              error={touched.discountTypes ? errors.discountTypes : ""}
              onChange={(value) => setFieldValue("discountTypes", value)}
            />
            <FormInput
              isDisabled={type === "view" || values.discountTypes === "fixed"}
              label="Giá trị giảm tối đa"
              placeholder="Nhập giá trị giảm tối đa..."
              name="maxReduce"
              value={values.maxReduce}
              error={touched.maxReduce ? errors.maxReduce : ""}
              onChange={(e) => setFieldValue("maxReduce", e)}
              onBlur={handleBlur}
              type="number"
            />
            <FormInput
              isDisabled={type === "view"}
              label="Số lần sử dụng tối đa"
              placeholder="Nhập số lần sử dụng tối đa..."
              name="maxUsage"
              value={values.maxUsage}
              error={touched.maxUsage && errors.maxUsage ? errors.maxUsage : ""}
              onChange={(e) => setFieldValue("maxUsage", e)}
              onBlur={handleBlur}
              type="number"
            />
            <FormInput
              isDisabled={type === "view"}
              label="Mức giảm giá"
              placeholder="Nhập mức giảm giá..."
              name="discount"
              value={values.discount}
              error={touched.discount ? errors.discount : ""}
              onChange={(e) => setFieldValue("discount", e)}
              onBlur={handleBlur}
              type="number"
            />

            <FormInput
              isDisabled={type === "view"}
              label="Giá trị đơn hàng tối thiểu"
              placeholder="Nhập giá trị đơn hàng tối thiểu..."
              name="minimumOrderPrice"
              value={values.minimumOrderPrice}
              error={touched.minimumOrderPrice ? errors.minimumOrderPrice : ""}
              onChange={(e) => setFieldValue("minimumOrderPrice", e)}
              onBlur={handleBlur}
              type="number"
            />
            <FormSelect
              isDisabled={type === "view"}
              label="Loại mã giảm giá"
              placeholder="Chọn loại mã giảm giá..."
              options={Object.values(EVoucherType).map((type) => ({
                label: type,
                value: type,
              }))}
              value={values.voucherType}
              onChange={(value) => setFieldValue("voucherType", value as EVoucherType)}
            />

            <FormDateRangePicker
              label="Ngày bắt đầu và kết thúc"
              value={[values.startDate, values.endDate]}
              onChange={(dates) => {
                setFieldValue("startDate", dates[0]);
                setFieldValue("endDate", dates[1]);
              }}
              error={touched.startDate && errors.startDate ? errors.startDate : ""}
              disabled={type === "view"}
            />
          </FormGroup>
        );
      }}
    </Formik>
  );
};

export default VoucherForm;
