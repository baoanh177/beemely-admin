import FilterTableStatus, { IFilterTableStatusOptions } from "../table/FilterTableStatus";
import FormInput from "../form/FormInput";
import { IoSearchOutline } from "react-icons/io5";
import { BiSliderAlt } from "react-icons/bi";
import clsx from "clsx";

export interface IDefaultSearchProp {
  option: IFilterTableStatusOptions[];
  onFilterToggle: () => void;
  showFilterStatus: boolean;
}

const DefaultSearch = ({ option, onFilterToggle, showFilterStatus }: IDefaultSearchProp) => {
  return (
    <div>
      <div className={clsx("flex", { "justify-between": showFilterStatus, "justify-end": !showFilterStatus })}>
        {showFilterStatus && <FilterTableStatus options={option} />}
        <div className="flex gap-4">
          <FormInput icon={IoSearchOutline} placeholder="Tìm kiếm. . ." type="text" />
          <div
            className="flex h-[40px] w-[48px] cursor-pointer items-center justify-center rounded-lg bg-primary-50 text-lg text-primary-500"
            onClick={onFilterToggle}
          >
            <BiSliderAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultSearch;
