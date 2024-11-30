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
import { createAccount, updateAccount } from "@/services/store/account/account.thunk";
import AddressGroup from "./groups/AddressGroup";

interface IActiveAccount extends IAccount {}
export interface IAccountFormProps {
  formikRef?: FormikRefType<IAccountFormInitialValues>;
  type: "create" | "view" | "update";
  account?: IActiveAccount;
  isFormLoading?: boolean;
  isCustomer?: boolean;
}

const AccountForm = ({ formikRef, type, account, isFormLoading, isCustomer }: IAccountFormProps) => {
  const validationSchema = getValidationSchema(type);
  const initialValues = getInitialValues(account);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createAccount({ body: getSubmitData(data) }));
        } else if (type === "update") {
          dispatch(
            updateAccount({
              body: getSubmitData(data, isCustomer),
              param: account?.id,
            }),
          );
        }
      }}
    >
      {(formikData) => {
        let showAddressGroup = true
        if(type === "view" || isCustomer) {
          showAddressGroup = formikData.values.addresses.length !== 0
        }
        return (
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div className="flex flex-col gap-6">
                <Row gutter={[24, 24]}>
                  <Col xxl={{ span: 18, order: 2 }} xl={{ span: 16, order: 2 }} xs={{ span: 24, order: 1 }} className="h-full">
                    <GeneralGroup {...{ ...formikData, isFormLoading, type, isCustomer }} />
                  </Col>
                  <Col xxl={{ span: 6, order: 2 }} xl={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
                    <AvatarGroup {...{ ...formikData, isFormLoading, type, isCustomer }} />
                  </Col>
                </Row>
                {showAddressGroup && (
                  <AddressGroup {...{ ...formikData, isFormLoading, type, isCustomer }} />
                )}
                <OtherGroup {...{ ...formikData, isFormLoading, type, isCustomer }} />
              </div>
            </Col>
          </Row>
        );
      }}
    </Formik>
  );
};

export default AccountForm;
