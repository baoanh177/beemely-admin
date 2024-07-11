import { ButtonTypes } from "../enums/button";
import { FetchStatus } from "../enums/fetchStatus";
import { Permissions } from "../enums/permissions";

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchHeaders {
  "Content-Type"?: string;
  Authorization?: string;
}

export interface IFetchOptions extends IFetchHeaders {
  method: MethodType;
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

export interface IResponse<MetaDataType> {
  statusCode: number;
  message: string;
  metaData: MetaDataType;
}

export interface ClientReturnType<ReturnDataType> {
  response: Response;
  data: ReturnDataType;
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
  permission?: Permissions;
}

export interface ISearchContent {}
