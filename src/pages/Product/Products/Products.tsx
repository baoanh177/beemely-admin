import Heading from "@/components/layout/Heading";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";

const Products = () => {
  return (
    <Heading
      title="Sản phẩm"
      hasBreadcrumb
      buttons={[
        {
          text: "Xuất",
          type: "ghost",
          icon: <GoDownload className="text-[18px]" />,
        },
        {
          text: "Tạo mới Sản phẩm",
          icon: <FaPlus className="text-[18px]" />,
        },
      ]}
    />
  );
};

export default Products;
