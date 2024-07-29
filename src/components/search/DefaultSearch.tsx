import FilterTableStatus, { IFilterTableStatusOption } from "../table/FilterTableStatus";
import FormInput from "../form/FormInput";
import { IoSearchOutline } from "react-icons/io5";
import { BiSliderAlt } from "react-icons/bi";
import RoundedIcon from "../common/RoundedIcon";
import clsx from "clsx";

export interface IDefaultSearchProp {
  option: IFilterTableStatusOption[];
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
          <RoundedIcon icon={BiSliderAlt} shape="square" size="filter" color="primary" onClick={onFilterToggle} />
        </div>
      </div>
    </div>
  );
};

export default DefaultSearch;
