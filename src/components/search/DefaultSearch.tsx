import React from "react";
import FilterTableStatus, { IFilterTableStatusOptions } from "../table/FilterTableStatus";
import FormInput, { IFormInputProps } from "../form/FormInput";

export interface IDefaultSearchProps {
  input?: IFormInputProps;
  options?: IFilterTableStatusOptions[];
}

export const DefaultSearch: React.FC<IDefaultSearchProps> = ({ input, options }) => {
  return (
    <div className="flex w-full">
      {options && <FilterTableStatus options={options} />}
      <div className="ml-auto">
        <FormInput className="bg-white" icon={input?.icon} placeholder={input?.placeholder} type={input?.type} />
      </div>
    </div>
  );
};