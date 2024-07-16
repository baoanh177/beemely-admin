import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import GenderForm, { IGenderFormInitialValues } from "../GenderForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IGenderInitialState, resetStatus } from "@/services/store/gender/gender.slice";
import { useArchive } from "@/hooks/useArchive";
import { getGenderById } from "@/services/store/gender/gender.thunk";

const UpdateGender = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IGenderFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IGenderInitialState>("gender");

  useFetchStatus({
    module: "gender",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/genders",
      },
      error: {
        message: state.message,
      },
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getGenderById(id));
    }
  }, [id]);

  useEffect(() => {
    if (state.activeGender) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeGender.name,
        });
      }
    }
  }, [state.activeGender]);

  return (
    <>
      <Heading
        title="Update Gender"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Cancel",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/genders");
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
      {state.activeGender && <GenderForm type="update" formikRef={formikRef} gender={state.activeGender} />}
    </>
  );
};

export default UpdateGender;
