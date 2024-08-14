import { useArchive } from "@/hooks/useArchive";
import { IVoucherInitialState } from "@/services/store/voucher/voucher.slice";
import { createVoucher, updateVoucher } from "@/services/store/voucher/voucher.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import lodash from "lodash";

import { EActiveStatus } from "@/shared/enums/status";
import { Dayjs } from "dayjs";
import { IVoucher } from "@/services/store/voucher/voucher.model";
import FormDateRangePicker from "@/components/form/FormDateRangePicker";
import { useEffect } from "react";
import { getAllVoucherTypes } from "@/services/store/voucherType/voucherType.thunk";
import { IVoucherTypeInitialState } from "@/services/store/voucherType/voucherType.slice";

interface IVoucherFormProps {
  formikRef?: FormikRefType<IVoucherFormInitialValues>;
  type: "create" | "update";
  voucher?: IVoucher;
  isFormLoading?: boolean;
}

export interface IVoucherFormInitialValues {
  id?: string;
  name: string;
  code: string;
  maxUsage: number;
  duration: number;
  discount: number;
  discountTypes: "percentage" | "fixed";
  minimumOrderPrice: number;
  voucherType: { id: string; name: string };
  status: EActiveStatus;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const VoucherForm = ({ formikRef, type, voucher, isFormLoading = false }: IVoucherFormProps) => {
  const { dispatch } = useArchive<IVoucherInitialState>("voucher");
  const { state } = useArchive<IVoucherTypeInitialState>("voucherType");
  useEffect(() => {
    dispatch(getAllVoucherTypes({}));
  }, [dispatch]);
  const voucherTypes = state.voucherTypes || [];

  const initialValues: IVoucherFormInitialValues = {
    name: voucher?.name || "",
    code: voucher?.code || "",
    maxUsage: voucher?.maxUsage || 0,
    duration: voucher?.duration || 0,
    discount: voucher?.discount || 0,
    discountTypes: voucher?.discountTypes || "percentage",
    minimumOrderPrice: voucher?.minimumOrderPrice || 0,
    voucherType: voucher?.voucherType || { id: "", name: "" },
    startDate: voucher?.startDate!,
    endDate: voucher?.endDate!,
    status: voucher?.status || EActiveStatus.INACTIVE,
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(data) => {
        const transformedData = {
          max_usage: data.maxUsage,
          discount_types: data.discountTypes,
          minimum_order_price: data.minimumOrderPrice,
          voucher_type: data.voucherType.id,
          start_date: data.startDate,
          end_date: data.endDate,
          name: data.name,
          code: data.code,
          duration: data.duration,
          discount: data.discount,
        };
        if (type === "create") {
          dispatch(createVoucher({ body: lodash.omit(transformedData, ["status"]) }));
        } else if (type === "update" && voucher?.id) {
          dispatch(updateVoucher({ body: lodash.omit(transformedData, ["status"]), param: voucher.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => {
        const voucherTypeOptions = voucherTypes.map((vt) => ({
          label: vt.name,
          value: vt.id,
        }));

        return (
          <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
            <FormInput
              label="Tên mã giảm giá"
              placeholder="Nhập tên mã giảm giá ở đây..."
              name="name"
              value={values.name}
              error={touched.name ? errors.name : ""}
              onChange={(e) => setFieldValue("name", e)}
              onBlur={handleBlur}
            />
            <FormInput
              label="Mã giảm giá"
              placeholder="Nhập mã giảm giá ở đây..."
              name="code"
              value={values.code}
              error={touched.code ? errors.code : ""}
              onChange={(e) => setFieldValue("code", e)}
              onBlur={handleBlur}
            />
            <FormInput
              label="Số lần sử dụng tối đa"
              placeholder="Nhập số lần sử dụng tối đa..."
              name="maxUsage"
              value={values.maxUsage}
              error={touched.maxUsage ? errors.maxUsage : ""}
              onChange={(e) => setFieldValue("maxUsage", e)}
              onBlur={handleBlur}
              type="number"
            />
            <FormInput
              label="Thời gian hiệu lực"
              placeholder="Nhập thời gian hiệu lực..."
              name="duration"
              value={values.duration}
              error={touched.duration ? errors.duration : ""}
              onChange={(e) => setFieldValue("duration", e)}
              onBlur={handleBlur}
              type="number"
            />
            <FormInput
              label="Mức giảm giá"
              placeholder="Nhập mức giảm giá..."
              name="discount"
              value={values.discount}
              error={touched.discount ? errors.discount : ""}
              onChange={(e) => setFieldValue("discount", e)}
              onBlur={handleBlur}
              type="number"
            />
            <FormSelect
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
              label="Loại mã giảm giá"
              placeholder="Chọn loại mã giảm giá..."
              options={voucherTypeOptions}
              value={values.voucherType.id}
              onChange={(value) => {
                const selectedType = voucherTypes.find((vt) => vt.id === value);
                if (selectedType) {
                  setFieldValue("voucherType", { id: selectedType.id, name: selectedType.name });
                }
              }}
            />
            <FormDateRangePicker
              label="Ngày bắt đầu và kết thúc"
              value={[values.startDate, values.endDate]}
              onChange={(dates) => {
                setFieldValue("startDate", dates[0]);
                setFieldValue("endDate", dates[1]);
              }}
            />
          </FormGroup>
        );
      }}
    </Formik>
  );
};

export default VoucherForm;
