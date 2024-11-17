import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IOrderInitialState, resetStatus } from "@/services/store/order/order.slice";
import { getOrderById } from "@/services/store/order/order.thunk";
import { useRef } from "react";
import { IoClose, IoPrint } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import AddressGroup from "../groups/AddressGroup";
import InfoGroup from "../groups/InfoGroup";
import ItemsGroup from "../groups/ItemsGroup";
import "./index.css";

import { useReactToPrint } from "react-to-print";
import OrderLogsGroup from "../groups/OrderLogsGroup";

const DetailOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch } = useArchive<IOrderInitialState>("order");

  useFetchStatus({
    module: "order",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/orders",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getOrderByIdLoading } = useAsyncEffect(
    (async) => {
      id && async(dispatch(getOrderById({ param: id })), "getOrderByIdLoading");
    },
    [id],
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  if (getOrderByIdLoading) return <div>Loading...</div>;

  return (
    <>
      <Heading
        title="Cập nhật Sản phẩm"
        hasBreadcrumb
        buttons={[
          {
            text: "Quay lại",
            type: "secondary",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/orders");
            },
          },
          {
            text: "In",
            type: "primary",
            icon: <IoPrint className="text-[18px]" />,
            onClick: reactToPrintFn,
          },
        ]}
      />

      {state.activeOrder && (
        <div ref={contentRef} className="flex flex-col gap-4">
          <InfoGroup order={state.activeOrder} /> <OrderLogsGroup orderId={state.activeOrder.id} /> <AddressGroup order={state.activeOrder} />
          <ItemsGroup items={state.activeOrder.items} order={state.activeOrder} />
        </div>
      )}
    </>
  );
};

export default DetailOrder;
