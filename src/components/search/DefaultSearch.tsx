import React from "react";
import FilterTableStatus, { IFilterTableStatusProps } from "../table/FilterTableStatus";
import FormInput, { IFormInputProps } from "../form/FormInput";

export interface IDefaultSearchProps {
  input?: IFormInputProps;
  filterOptions?: IFilterTableStatusProps;
}

export const DefaultSearch: React.FC<IDefaultSearchProps> = ({ input, filterOptions }) => {
  return (
    <div className="flex w-full">
      {filterOptions && <FilterTableStatus {...filterOptions} />}
      <div className="ml-auto">
        <FormInput className="bg-white" {...input} />
      </div>
    </div>
  );
};
