import { useArchive } from "@/hooks/useArchive";
import { FormikProps } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import LabelForm, { ILabelFormInitialValues } from "../LabelForm";
import { useEffect, useRef } from "react";
import { ILabelInitialState, resetStatus } from "@/services/store/label/label.slice";
import useFetchStatus from "@/hooks/useFetchStatus";
import { getLabelById } from "@/services/store/label/label.thunk";
import Heading from "@/components/layout/Heading";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { EFetchStatus } from "@/shared/enums/fetchStatus";

const UpdateLabel = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ILabelFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<ILabelInitialState>("label");

  useFetchStatus({
    module: "label",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/labels",
      },
      error: {
        message: state.message,
      },
    },
  });
  useEffect(() => {
    if (id) {
      (() => {
        dispatch(getLabelById(id));
      })();
    }
  }, [id]);

  useEffect(() => {
    if (state.activeLabel && formikRef.current) {
      formikRef.current.setValues({
        name: state.activeLabel.name,
        description: state.activeLabel.description,
      });
    }
  }, [state.activeLabel]);
  return (
    <>
      <Heading
        title="Update Label"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Cancel",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/labels");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Save change",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              if (formikRef.current) {
                formikRef.current.handleSubmit();
              }
            },
          },
        ]}
      />
      {state.activeLabel && <LabelForm type="update" formikRef={formikRef} label={state.activeLabel} />}
    </>
  );
};

export default UpdateLabel;
