import { useArchive } from "@/hooks/useArchive";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { Formik } from "formik";
import TreeData from "@/components/TreeData";
import { object, string } from "yup";
import { getTreePermissions } from "./helpers/getTreePermissions";
import { DataNode } from "antd/es/tree";
import { IPermissionInitialState } from "@/services/store/permission/permission.slice";
import { getAllModules, getAllPermissions } from "@/services/store/permission/permission.thunk";
import { useEffect, useState } from "react";
import { createRole, updateRole } from "@/services/store/role/role.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { IRole } from "@/services/store/role/role.model";
import lodash from "lodash";
import { Col, Row } from "antd";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import Label from "@/components/form/Label";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_NAME, SUPER_ADMIN_NAME } from "@/services/config/constants";
import useCleanup from "@/hooks/useCleanup";
import { clearActiveRole } from "@/services/store/role/role.slice";

interface IActiveRole extends Omit<IRole, "permissions"> {
  permissions: string[];
}

interface IRoleFormProps {
  formikRef?: FormikRefType<IRoleFormInitialValues>;
  type: "create" | "view" | "update";
  role?: IActiveRole;
  isFormLoading?: boolean;
}

export interface IRoleFormInitialValues {
  name: string;
  permissions: string[];
}

const RoleForm = ({ formikRef, type, role, isFormLoading = false }: IRoleFormProps) => {
  const [treePermissions, setTreePermissions] = useState<DataNode[]>([]);
  const { dispatch, state } = useArchive<IPermissionInitialState>("permission");

  const initialValues: IRoleFormInitialValues = {
    name: "",
    permissions: [],
  };

  const validationSchema = object().shape({
    name: string().required("Vui lòng nhập tên vai trò"),
  });

  const { getAllPermissionsLoading, getAllModulesLoading } = useAsyncEffect((async) => {
    async(
      dispatch(
        getAllPermissions({
          query: {
            _pagination: false,
          },
        }),
      ),
      "getAllPermissionsLoading",
    );
    async(dispatch(getAllModules()), "getAllModulesLoading");
  }, []);

  useEffect(() => {
    setTreePermissions(getTreePermissions(state.permissions, state.modules));
  }, [state.permissions, state.modules]);
  
  useCleanup(() => {
    dispatch(clearActiveRole())
  })
  
  if (type === "update" && !isFormLoading && [SUPER_ADMIN_NAME, CUSTOMER_NAME].includes(role?.name ?? "")) {
    return useNavigate()("/roles");
  }

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={role ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        const body = {
          ...lodash.omit(data, "id"),
          permissions: data.permissions.filter((p) => !p.startsWith("parent-")),
        };
        if (type === "create") {
          dispatch(createRole({ body }));
        } else if (type === "update") {
          dispatch(updateRole({ body, param: role?.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => {
        return (
          <Row gutter={[24, 24]}>
            <Col xl={{ span: 6, order: 1 }} xs={{ span: 24, order: 2 }}>
              <FormGroup title="Quyền" isLoading={(getAllPermissionsLoading || getAllModulesLoading || isFormLoading) ?? true}>
                <TreeData
                  isDisable={type === "view"}
                  expanded={["parent-all"]}
                  treeData={[
                    {
                      key: "parent-all",
                      title: "All",
                      children: treePermissions,
                    },
                  ]}
                  checkedKeys={values.permissions}
                  onCheck={(checkedKeys) => {
                    setFieldValue("permissions", checkedKeys);
                  }}
                />
              </FormGroup>
            </Col>
            <Col xl={{ span: 18, order: 2 }} xs={{ span: 24, order: 1 }}>
              <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
                <Label text="Tên vai trò" isRequired />
                <FormInput
                  type="text"
                  isDisabled={type === "view"}
                  value={values.name}
                  name="name"
                  error={touched.name ? errors.name : ""}
                  placeholder="Nhập tên vai trò ở đây..."
                  onChange={(value) => {
                    setFieldValue("name", value);
                  }}
                  onBlur={handleBlur}
                />
              </FormGroup>
            </Col>
          </Row>
        );
      }}
    </Formik>
  );
};

export default RoleForm;
