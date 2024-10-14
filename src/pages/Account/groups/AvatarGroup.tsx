import FormGroup from "@/components/form/FormGroup";
import FormSwitch from "@/components/form/FormSwitch";
import UploadImage from "@/components/form/UploadImage";
import { EActiveStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import { IAccountFormInitialValues } from "../data/dataForm";
import StatusBadge from "@/components/common/StatusBadge";

interface IAvatarGroupProps extends FormikProps<IAccountFormInitialValues> {
  isFormLoading?: boolean;
  type: "create" | "update" | "view";
  isCustomer?: boolean;
}

const AvatarGroup = ({ values, errors, touched, setFieldValue, isFormLoading, type, isCustomer }: IAvatarGroupProps) => {

  return (
    <FormGroup title="Khác" isLoading={isFormLoading} className="h-full">
      <UploadImage
        isDisabled={type === "view" || isCustomer}
        label="Ảnh đại diện"
        onImageUpload={(url: string | string[]) => {
          setFieldValue("avatar_url", Array.isArray(url) ? url.at(0) : url);
        }}
        currentImageUrl={[values.avatar_url]}
        error={touched.avatar_url ? errors.avatar_url : ""}
      />
      {type === "view" ? (
        values.status === EActiveStatus.ACTIVE ? (
          <StatusBadge text="Đang hoạt động" color="green" />
        ) : (
          <StatusBadge text="Ngừng hoạt động" color="red" />
        )
      ) : (
        <FormSwitch
          label="Trạng thái hoạt động"
          name="status"
          uncheckedText="Tắt"
          checked={values.status === EActiveStatus.ACTIVE}
          checkedText="Bật"
          onChange={(checked) => setFieldValue("status", checked ? EActiveStatus.ACTIVE : EActiveStatus.INACTIVE)}
        />
      )}
    </FormGroup>
  );
};

export default AvatarGroup;
