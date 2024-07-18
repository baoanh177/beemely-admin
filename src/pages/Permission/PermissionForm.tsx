import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormSwitch from "@/components/form/FormSwitch";
import UpdateGrid from "@/components/grid/UpdateGrid";
import { useArchive } from "@/hooks/useArchive";
import { IPermissionInitialState } from "@/services/store/permission/permission.slice";
import { createPermission, getAllModules, getPermissionById, updatePermission } from "@/services/store/permission/permission.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface IPermissionFormInitialValues {
  label: string;
  name: string;
  module: string;
  availableModule: string;
}
interface IPermissionFormProps {
  formikRef?: FormikRefType<IPermissionFormInitialValues>;
  type: "create" | "view" | "update";
}

const PermissionForm = ({ formikRef, type }: IPermissionFormProps) => {
  const { id } = useParams();
  const { state, dispatch } = useArchive<IPermissionInitialState>("permission");
  const [newModule, setNewModule] = useState(false);

  const initialValues: IPermissionFormInitialValues = {
    label: "",
    name: "",
    module: "",
    availableModule: "",
  };

  useEffect(() => {
    dispatch(getAllModules());
    if (type !== "create") dispatch(getPermissionById(id as string));
  }, []);

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={state.activePermission ? { ...state.activePermission, availableModule: state.activePermission?.module } : initialValues}
      onSubmit={(data) => {
        const body = {
          label: data.label,
          name: data.name,
          module: newModule ? data.module : data.availableModule,
        };
        if (type === "create") {
          dispatch(createPermission({ body }));
        } else if (type === "update") {
          dispatch(updatePermission({ body, param: state.activePermission?.id }));
        }
      }}
    >
      {({ values, errors, touched, setFieldValue, handleBlur }) => {
        return (
          <UpdateGrid
            colNumber="2"
            rate="1-3"
            groups={{
              colLeft: (
                <FormGroup title="Module">
                  <FormSwitch
                    label="New module"
                    onChange={(value) => {
                      setNewModule(value);
                      setFieldValue("module", "");
                    }}
                  />

                  {newModule ? (
                    <FormInput
                      label="Permission Module"
                      placeholder="Type permission module here..."
                      onChange={(value) => setFieldValue("module", value)}
                      value={values.module}
                    />
                  ) : (
                    <FormSelect
                      value={values.availableModule}
                      onChange={(value) => setFieldValue("availableModule", value)}
                      options={state.modules.map((module) => ({ label: module, value: module }))}
                      label="Permission Module"
                      placeholder="Choose permission module..."
                    />
                  )}
                </FormGroup>
              ),
              colRight: (
                <FormGroup title="General Information">
                  <FormInput
                    value={values.label}
                    label="Permission Name"
                    error={touched.label ? errors.label : ""}
                    placeholder="Type permission name here..."
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue("label", value);
                    }}
                  />
                  <FormInput
                    value={values.name}
                    label="Permission Value"
                    error={touched.name ? errors.name : ""}
                    placeholder="Type permission value here..."
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue("name", value);
                    }}
                  />
                </FormGroup>
              ),
            }}
          />
        );
      }}
    </Formik>
  );
};

export default PermissionForm;
