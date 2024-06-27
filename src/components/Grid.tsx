import { TableColumnsType } from "antd";
import { BiSolidCategoryAlt } from "react-icons/bi";

import DataTable from "./DataTable";
import SearchContainer from "./SearchContainer";

import { IGridButton, IInitialState } from "@/shared/utils/shared-interfaces";

type ComponentKeysType = "searchContainer" | "pagination";

interface IGridProps<S> {
  buttons?: IGridButton[];
  hideComponents?: ComponentKeysType[];
  title: string;
  columns: TableColumnsType;
  data: unknown[];
  state: S;
  setFilter: Function;
}

const Grid = <S extends IInitialState>({
  buttons,
  title,
  columns,
  state,
  data,
  setFilter,
  hideComponents,
}: IGridProps<S>) => {
  return (
    <div className="flex h-full flex-col gap-5">
      <h1 className="flex flex-1 items-center gap-3 text-3xl font-semibold sm:gap-4">
        <BiSolidCategoryAlt className="hidden text-3xl sm:text-4xl md:block" />
        <span>{title}</span>
      </h1>
      {!hideComponents?.includes("searchContainer") && <SearchContainer />}
      <DataTable
        buttons={buttons}
        hideComponents={hideComponents}
        columns={columns}
        data={data}
        state={state}
        setFilter={setFilter}
      />
    </div>
  );
};

export default Grid;
