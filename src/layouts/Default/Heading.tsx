import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";

const Heading = () => {
  return (
    <div className="flex items-end gap-6 justify-between">
      <div className="flex flex-col gap-2">
        <h3 className="display-m-semibold text-black-500">Products</h3>
        <Breadcrumb pages={[{ path: "dashboard"}, { path: "products", isActive: true}]} />
      </div>

      <div className="flex gap-4">
        <Button type="ghost" text="Export" icon={<GoDownload className="text-[18px]"/>} />
        <Button text="Add Product" icon={<FaPlus className="text-[18px]"/>} />
      </div>
    </div>
  );
};

export default Heading;
