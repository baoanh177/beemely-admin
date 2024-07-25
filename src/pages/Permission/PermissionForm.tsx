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
import { object, string } from "yup";

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

  const validationSchema = object().shape({
    label: string().required("Vui lòng nhập tên quyền"),
    name: string().required("Vui lòng nhập giá trị"),
    module: string().test("check-module", "Vui lòng nhập tên module", (value) => {
      if (!newModule) return true;
      return !!value?.trim();
    }),
    availableModule: string().test("check-available-module", "Vui lòng chọn module", (value) => {
      if (newModule) return true;
      return !!value?.trim();
    }),
  });

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
      validationSchema={validationSchema}
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
                  label="Module mới"
                  onChange={(value) => {
                    setNewModule(value);
                    setFieldValue("module", "");
                  }}
                />

                {newModule ? (
                  <FormInput
                    label="Module quyền"
                    placeholder="Nhập module quyền ở đây..."
                    onChange={(value) => setFieldValue("module", value)}
                    value={values.module}
                    error={touched.module ? errors.module : ""}
                  />
                ) : (
                  <FormSelect
                    value={values.availableModule}
                    onChange={(value) => setFieldValue("availableModule", value)}
                    options={state.modules.map((module) => ({ label: module, value: module }))}
                    label="Module quyền"
                    error={touched.availableModule ? errors.availableModule : ""}
                    placeholder="Chọn module quyền..."
                  />
                )}
              </FormGroup>
            </Col>
            <Col xl={{ span: 16 }} xs={{ span: 24 }}>
              <FormGroup title="Thông tin chung">
                <FormInput
                  value={values.label}
                  label="Tên quyền"
                  error={touched.label ? errors.label : ""}
                  placeholder="Nhập tên quyền ở đây..."
                  onBlur={handleBlur}
                  onChange={(value) => {
                    setFieldValue("label", value);
                  }}
                />
                <FormInput
                  value={values.name}
                  label="Giá trị"
                  error={touched.name ? errors.name : ""}
                  placeholder="Nhập giá trị ở đây..."
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
