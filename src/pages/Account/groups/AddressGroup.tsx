import FormGroup from "@/components/form/FormGroup";
import { FormikProps } from "formik";
import { IAccountFormInitialValues } from "../data/dataForm";
import FormInput from "@/components/form/FormInput";
interface IAddressGroupProps extends FormikProps<IAccountFormInitialValues> {
  isFormLoading?: boolean;
  type: "create" | "update" | "view";
  isCustomer?: boolean;
}

const AddressGroup = ({ values, isFormLoading }: IAddressGroupProps) => {

  return (
      <FormGroup title="Địa chỉ" isLoading={isFormLoading}>
        {values.addresses.map((address, index) => {
          const { detailAddress, commune, district, city } = address
          const completedAddress = `${detailAddress}, ${commune}, ${district}, ${city}`
          return <FormInput key={index} isReadonly isDisabled value={completedAddress} />
        })}
      </FormGroup>
  );
};

export default AddressGroup;
