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

interface IActiveRole extends Omit<IRole, "permissions"> {
  permissions: string[];
}

interface IRoleFormProps {
  formikRef?: FormikRefType<IRoleFormInitialValues>;
  type: "create" | "view" | "update";
  role?: IActiveRole;
}

export interface IRoleFormInitialValues {
  name: string;
  permissions: string[];
}

const RoleForm = ({ formikRef, type, role }: IRoleFormProps) => {
  const [treePermissions, setTreePermissions] = useState<DataNode[]>([]);
  const [loading, setLoading] = useState(true);

  const { dispatch, state } = useArchive<IPermissionInitialState>("permission");

  const initialValues: IRoleFormInitialValues = {
    name: "",
    permissions: [],
  };

  const validationSchema = object().shape({
    name: string().required("Please enter role name"),
  });

  useEffect(() => {
    setTreePermissions(getTreePermissions(state.permissions, state.modules));
  }, [JSON.stringify(state.permissions), JSON.stringify(state.modules)]);

  useEffect(() => {
    (async () => {
      await dispatch(
        getAllPermissions({
          query: {
            pagination: false,
          },
        }),
      );
      await dispatch(getAllModules());
      setLoading(false);
    })();
  }, []);

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
      {({ values, errors, touched, handleBlur, setFieldValue }) => {
        return (
          <UpdateGrid
            colNumber="2"
            rate="1-3"
            isLoading={loading}
            groups={{
              colLeft: (
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
              ),
              colRight: (
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
              ),
            }}
          />
        );
      }}
    </Formik>
  );
};

export default RoleForm;
