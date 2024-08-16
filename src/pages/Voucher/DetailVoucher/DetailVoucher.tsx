import Heading from "@/components/layout/Heading";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import VoucherForm from "../VoucherForm";
import { IVoucherInitialState } from "@/services/store/voucher/voucher.slice";
import { getVoucherById } from "@/services/store/voucher/voucher.thunk";

const DetailVoucher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IVoucherInitialState>("voucher");

  const { getVoucherByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getVoucherById(id)), "getVoucherByIdLoading"), [id]);

  return (
    <>
      <Heading
        title="Chi tiết Mã giảm giá"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/vouchers");
            },
          },
        ]}
      />

      {state.activeVoucher && <VoucherForm type="view" isFormLoading={getVoucherByIdLoading ?? true} voucher={state.activeVoucher} />}
    </>
  );
};

export default DetailVoucher;
