import Heading from "@/components/layout/Heading";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

const Products = () => {
  return (
    <Heading
      title="Products"
      hasBreadcrumb
      buttons={[
        {
          text: "Export",
          type: "ghost",
          icon: <GoDownload className="text-[18px]" />,
        },
        {
          text: "Add Product",
          icon: <FaPlus className="text-[18px]" />,
        },
      ]}
    />
  );
};

export default Products;
