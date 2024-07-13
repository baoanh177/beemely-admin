import Heading from "@/components/layout/Heading";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { Permissions } from "@/shared/enums/permissions";

const Orders = () => {
  return (
    <>
      <Heading
        title="Orders"
        hasBreadcrumb
        buttons={[
          {
            text: "Export",
            type: "ghost",
            icon: <GoDownload className="text-[18px]" />,
            permission: Permissions.READ_ORDER,
          },
          {
            text: "Add Order",
            icon: <FaPlus className="text-[18px]" />,
            permission: Permissions.CREATE_ORDER,
          },
        ]}
      />
    </>
  );
};

export default Orders;
