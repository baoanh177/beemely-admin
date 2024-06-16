import { Input } from "antd";
import CustomButton from "./Button";

const SearchContainer = () => {
  return (
    <>
      <div className="rounded-xl bg-white px-4 pb-4 pt-2 mb-5">
        <div className="mb-2 text-xl font-semibold">Search</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Input placeholder="Enter name..." />
          <Input placeholder="Enter name..." />
          <Input placeholder="Enter name..." />
          <Input placeholder="Enter name..." />
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <CustomButton text="Cancel" />
          <CustomButton
            text="Filter"
            type="primary"
            onClick={() => console.log("Filter")}
          />
        </div>
      </div>
    </>
  );
};

export default SearchContainer;
