import Heading from "@/components/layout/Heading";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { EPermissions } from "@/shared/enums/permissions";

const Orders = () => {
  return (
    <Heading
      title="Orders"
      hasBreadcrumb
      buttons={[
        {
          text: "Export",
          type: "ghost",
          icon: <GoDownload className="text-[18px]" />,
          permission: EPermissions.READ_ORDER,
        },
        {
          text: "Add Order",
          icon: <FaPlus className="text-[18px]" />,
          permission: EPermissions.CREATE_ORDER,
        },
      ]}
    />
  );
};

export default Orders;
