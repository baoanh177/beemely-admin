import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import VoucherForm, { IVoucherFormInitialValues } from "../VoucherForm";
import { IVoucherInitialState, resetStatus } from "@/services/store/voucher/voucher.slice";
import { getVoucherById } from "@/services/store/voucher/voucher.thunk";
import dayjs from 'dayjs';

const UpdateVoucher = () => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<IVoucherFormInitialValues>>(null);
    const { id } = useParams();
    const { state, dispatch } = useArchive<IVoucherInitialState>("voucher");

    useFetchStatus({
        module: "voucher",
        reset: resetStatus,
        actions: {
            success: {
                message: state.message,
                navigate: "/vouchers",
            },
            error: {
                message: state.message,
            },
        },
    });
    const { getVoucherByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getVoucherById(id)), "getVoucherByIdLoading"), [id]);

    useEffect(() => {
        if (state.activeVoucher) {
            if (formikRef.current) {
                formikRef.current.setValues({
                    name: state.activeVoucher.name,
                    code: state.activeVoucher.code,
                    maxUsage: state.activeVoucher.maxUsage,
                    discount: state.activeVoucher.discount,
                    discountTypes: state.activeVoucher.discountTypes,
                    minimumOrderPrice: state.activeVoucher.minimumOrderPrice,
                    duration: state.activeVoucher.duration,
                    startDate: state.activeVoucher.startDate ? dayjs(state.activeVoucher.startDate) : null,
                    endDate: state.activeVoucher.endDate ? dayjs(state.activeVoucher.endDate) : null,
                    status: state.activeVoucher.status,
                    voucherType: state.activeVoucher.voucherType
                });
            }
        }
    }, [state.activeVoucher]);
    return (
        <>
            <Heading
                title="Cập nhật Mã giảm giá"
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
                    {
                        isLoading: state.status === EFetchStatus.PENDING,
                        text: "Lưu thay đổi",
                        icon: <IoSaveOutline className="text-[18px]" />,
                        onClick: () => {
                            if (formikRef.current) {
                                formikRef.current.handleSubmit();
                            }
                        },
                    },
                ]}
            />
            {state.activeVoucher && <VoucherForm type="update" isFormLoading={getVoucherByIdLoading ?? true} formikRef={formikRef} voucher={state.activeVoucher} />}
        </>
    );
};

export default UpdateVoucher;
