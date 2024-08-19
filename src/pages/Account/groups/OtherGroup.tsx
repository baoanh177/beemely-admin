import FormGroup from "@/components/form/FormGroup";
import FormSelect from "@/components/form/FormSelect";
import { FormikProps } from "formik";
import { getRoleOptions, IAccountFormInitialValues } from "../data/dataForm";
import { useArchive } from "@/hooks/useArchive";
import { IRoleInitialState } from "@/services/store/role/role.slice";
import { useMemo } from "react";
import { getAllRoles } from "@/services/store/role/role.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";

interface IOtherGroupProps extends FormikProps<IAccountFormInitialValues> {}

const OtherGroup = ({ values, errors, touched, setFieldValue }: IOtherGroupProps) => {
  values;
  errors;
  touched;
  const { state: roleState, dispatch } = useArchive<IRoleInitialState>("role");

  const roleOptions = useMemo(() => getRoleOptions(roleState.roles), [roleState.roles]);

  const { getAllRolesLoading } = useAsyncEffect((async) => {
    async(dispatch(getAllRoles({ query: { _pagination: false } })), "getAllRolesLoading");
  }, []);

  return (
    <FormGroup title="Thông tin khác" isLoading={getAllRolesLoading}>
      <FormSelect
        label="Vai trò"
        placeholder="Chọn vai trò..."
        isMultiple
        options={roleOptions}
        onChange={(value) => {
          setFieldValue("roles", value);
        }}
      />
    </FormGroup>
  );
};

export default OtherGroup;
