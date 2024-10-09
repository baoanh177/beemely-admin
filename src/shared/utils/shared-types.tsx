import { FormikProps } from "formik";
import { RefObject } from "react";

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type TFormType = "create" | "update" | "view"

export type FormikRefType<T> = RefObject<FormikProps<T>>;
