import { IAccount } from "@/services/store/account/account.model";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Col, Row } from "antd";
import { Formik } from "formik";
import { getInitialValues, getSubmitData, getValidationSchema, IAccountFormInitialValues } from "./data/dataForm";
import GeneralGroup from "./groups/GeneralGroup";
import OtherGroup from "./groups/OtherGroup";
import AvatarGroup from "./groups/AvatarGroup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/store";
import { createAccount } from "@/services/store/account/account.thunk";

interface IActiveAccount extends IAccount {}
interface IAccountFormProps {
  formikRef?: FormikRefType<IAccountFormInitialValues>;
  type: "create" | "view" | "update";
  account?: IActiveAccount;
  isFormLoading?: boolean;
}

const AccountForm = ({ formikRef, type, account, isFormLoading }: IAccountFormProps) => {
  account;
  isFormLoading;
  const validationSchema = getValidationSchema();
  const initialValues = getInitialValues();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createAccount({ body: getSubmitData(data) }));
        }
      }}
    >
      {(formikData) => {
        return (
          <Row gutter={[24, 24]}>
            <Col xl={{ span: 18 }}>
              <div className="flex flex-col gap-6">
                <GeneralGroup {...formikData} />
                <OtherGroup {...formikData} />
              </div>
            </Col>
            <Col xl={{ span: 6 }}>
              <AvatarGroup {...formikData} />
            </Col>
          </Row>
        );
      }}
    </Formik>
  );
};

export default AccountForm;
