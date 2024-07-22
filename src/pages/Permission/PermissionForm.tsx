import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormSwitch from "@/components/form/FormSwitch";
import { useArchive } from "@/hooks/useArchive";
import { IPermission } from "@/services/store/permission/permission.model";
import { IPermissionInitialState } from "@/services/store/permission/permission.slice";
import { createPermission, getAllModules, updatePermission } from "@/services/store/permission/permission.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Col, Row } from "antd";
import { Formik } from "formik";
import { useEffect, useState } from "react";

export interface IPermissionFormInitialValues {
  label: string;
  name: string;
  module: string;
  availableModule: string | undefined;
}
interface IPermissionFormProps {
  formikRef?: FormikRefType<IPermissionFormInitialValues>;
  type: "create" | "view" | "update";
  permission?: IPermission;
}

const PermissionForm = ({ formikRef, type, permission }: IPermissionFormProps) => {
  const [newModule, setNewModule] = useState(false);
  const { state, dispatch } = useArchive<IPermissionInitialState>("permission");

  const initialValues: IPermissionFormInitialValues = {
    label: "",
    name: "",
    module: "",
    availableModule: undefined,
  };

  useEffect(() => {
    dispatch(getAllModules());
  }, []);

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={permission ? { ...permission, availableModule: permission?.module } : initialValues}
      onSubmit={(data) => {
        const body = {
          label: data.label,
          name: data.name,
          module: newModule ? data.module : data.availableModule,
        };
        if (type === "create") {
          dispatch(createPermission({ body }));
        } else if (type === "update") {
          dispatch(updatePermission({ body, param: permission?.id }));
        }
      }}
    >
      {({ values, errors, touched, setFieldValue, handleBlur }) => {
        return (
          <Row gutter={[24, 24]}>
            <Col xl={{ span: 8 }} xs={{ span: 24 }}>
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
            </Col>
            <Col xl={{ span: 16 }} xs={{ span: 24 }}>
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
            </Col>
          </Row>
        );
      }}
    </Formik>
  );
};

export default PermissionForm;
