import FormCheck from "@/components/form/FormCheck";
import FormGroup from "@/components/form/FormGroup";
import FormSwitch from "@/components/form/FormSwitch";
import Label from "@/components/form/Label";
import UploadImage from "@/components/form/UploadImage";
import { EActiveStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import { IAccountFormInitialValues } from "../data/dataForm";
import { useArchive } from "@/hooks/useArchive";
import { IUserGenderInitialState } from "@/services/store/userGender/userGender.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllUserGenders } from "@/services/store/userGender/userGender.thunk";

interface IAvatarGroupProps extends FormikProps<IAccountFormInitialValues> {}

const AvatarGroup = ({ values, errors, touched, setFieldValue }: IAvatarGroupProps) => {
  const { state, dispatch } = useArchive<IUserGenderInitialState>("userGender");
  errors;
  touched;

  const { getAllUserGendersLoading } = useAsyncEffect((async) => {
    async(dispatch(getAllUserGenders({ query: { _pagination: false } })), "getAllUserGendersLoading");
  }, []);

  return (
    <FormGroup title="Khác" isLoading={getAllUserGendersLoading}>
      <UploadImage label="Ảnh đại diện" />
      <FormSwitch
        label="Trạng thái hoạt động"
        name="status"
        uncheckedText="Tắt"
        checked={values.status === EActiveStatus.ACTIVE}
        checkedText="Bật"
        onChange={(checked) => setFieldValue("status", checked ? EActiveStatus.ACTIVE : EActiveStatus.INACTIVE)}
      />
      <div className="">
        <Label text="Giới tính" isRequired />
        <div className="flex gap-4">
          {state.userGenders.map((gender, index) => {
            return (
              <FormCheck
                key={index}
                type="radio"
                label={gender.name}
                name="gender"
                isDefaultChecked
                checked={values.gender === gender.id}
                value={gender.id}
                onChange={(checked) => setFieldValue("gender", checked ? gender.id : "")}
              />
            );
          })}
        </div>
      </div>
    </FormGroup>
  );
};

export default AvatarGroup;
