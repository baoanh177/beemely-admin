import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import VoucherForm, { IVoucherFormInitialValues } from "../VoucherForm";
import { IVoucherInitialState, resetStatus } from "@/services/store/voucher/voucher.slice";

const CreateVoucher = () => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<IVoucherFormInitialValues>>(null);

    const { state } = useArchive<IVoucherInitialState>("voucher");

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

    return (
        <>
            <Heading
                title="Tạo mới Mã giảm giá"
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
                        text: "Tạo mới Mã giảm giá",
                        icon: <FaPlus className="text-[18px]" />,
                        onClick: () => {
                            if (formikRef.current) {
                                formikRef.current.handleSubmit();
                            }
                        },
                    },
                ]}
            />
            <VoucherForm type="create" formikRef={formikRef} />
        </>
    );
};

export default CreateVoucher;
