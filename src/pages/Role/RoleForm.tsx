import { useArchive } from "@/hooks/useArchive";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import UpdateGrid from "@/components/grid/UpdateGrid";
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

interface IActiveRole extends Omit<IRole, "permissions"> {
  permissions: string[];
}

interface IRoleFormProps {
  formikRef?: FormikRefType<IRoleFormInitialValues>;
  type: "create" | "view" | "update";
  role?: IActiveRole;
  isLoading?: boolean;
}

export interface IRoleFormInitialValues {
  name: string;
  permissions: string[];
}

const RoleForm = ({ formikRef, type, role }: IRoleFormProps) => {
  const [treePermissions, setTreePermissions] = useState<DataNode[]>([]);
  const { dispatch, state } = useArchive<IPermissionInitialState>("permission");

  const initialValues: IRoleFormInitialValues = {
    name: "",
    permissions: [],
  };

  const validationSchema = object().shape({
    name: string().required("Vui lòng nhập tên vai trò"),
  });

  useEffect(() => {
    dispatch(
      getAllPermissions({
        query: {
          _pagination: false,
        },
      }),
    );
    dispatch(getAllModules());
  }, []);

  useEffect(() => {
    setTreePermissions(getTreePermissions(state.permissions, state.modules));
  }, [, state.permissions, state.modules]);

  return (
    <Formik
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
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <Row gutter={[24, 24]} >
          <Col xl={{ span: 6, order: 1 }} xs={{ span: 24, order: 2}}>
            <FormGroup title="Permissions">
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
          <Col xl={{ span: 18, order: 2 }} xs={{ span: 24, order: 1}}>
            <FormGroup title="General Information">
              <FormInput
                type="text"
                isDisabled={type === "view"}
                label="Role name"
                value={values.name}
                name="name"
                error={touched.name ? errors.name : ""}
                placeholder="Type role name here..."
                onChange={(value) => {
                  setFieldValue("name", value);
                }}
                onBlur={handleBlur}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default RoleForm;
