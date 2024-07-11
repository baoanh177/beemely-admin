import { useArchive } from "@/hooks/useArchive";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import UpdateGrid from "@/components/grid/UpdateGrid";
import { Formik, FormikProps } from "formik";
import TreeData from "@/components/TreeData";
import { object, string } from "yup";
import { getTreePermissions } from "./helpers/getTreePermissions";
import { DataNode } from "antd/es/tree";
import { IPermissionInitialState } from "@/services/store/permission/permission.slice";
import { getAllModules, getAllPermissions } from "@/services/store/permission/permission.thunk";
import { RefObject, useEffect, useState } from "react";
import { IRoleFormInitialValues } from "./CreateRole/CreateRole";
import { createRole } from "@/services/store/role/role.thunk";

interface IRoleFormProps {
  formikRef: RefObject<FormikProps<IRoleFormInitialValues>>
  type: "view" | "create" | "update"
}

const RoleForm = ({ formikRef, type }: IRoleFormProps) => {
  const [treePermissions, setTreePermissions] = useState<DataNode[]>([]);

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
    dispatch(getAllPermissions());
    dispatch(getAllModules());
  }, []);

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          const sendData = {
            ...data,
            permissions: data.permissions.filter((p) => !p.startsWith("parent-")),
          };
          if(type == "create") {
            dispatch(createRole({ body: sendData }))
          }
        }}
      >
        {({ values, errors, touched, handleBlur, setFieldValue }) => {
          return (
            <UpdateGrid
              colNumber="2"
              rate="1-3"
              groups={{
                colLeft: (
                  <>
                    <FormGroup title="Permissions">
                      <TreeData
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
                  </>
                ),
                colRight: (
                  <>
                    <FormGroup title="General Information">
                      <FormInput
                        type="text"
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
                  </>
                ),
              }}
            />
          );
        }}
      </Formik>
    </>
  );
};

export default RoleForm;
