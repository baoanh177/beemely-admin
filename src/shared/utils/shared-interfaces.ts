import { ButtonTypes } from "../enums/button";
import { FetchStatus } from "../enums/fetchStatus";
import { Permission } from "../enums/permission";

export type methodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchHeaders {
  "Content-Type"?: string;
  Authorization?: string;
}

export interface IFetchOptions extends IFetchHeaders {
  method: methodType;
  body?: any;
}

export interface IThunkPayload {
  body?: unknown;
  query?: object;
  headers?: IFetchHeaders;
}

export interface ISearchParams {
  page: number;
  size: number;
  [key: string]: unknown;
}

export interface IResponse<T> {
  statusCode: number;
  message: string;
  errors?: unknown;
  metaData?: T;
}

export interface IInitialState {
  status: FetchStatus;
  message: string;
  filter: ISearchParams;
  totalRecords: number;
  [key: string]: unknown;
}

export interface IGridButton {
  type: ButtonTypes;
  onClick: (record?: { [key: string]: unknown }) => unknown;
  permission?: Permission;
}

export interface ISearchContent {}
