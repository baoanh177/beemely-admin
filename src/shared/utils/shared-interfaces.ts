import { EButtonTypes } from "../enums/button";
import { EFetchStatus } from "../enums/status";
import { EPermissions } from "../enums/permissions";
import { MethodType } from "./shared-types";

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
  query?: ISearchParams;
  param?: string;
  headers?: IFetchHeaders;
}

export interface ISearchParams {
  _page?: number;
  _limit?: number;
  [key: string]: unknown;
}

export interface IResponse<MetaDataType> {
  statusCode: number;
  message: string | { [key: string]: string };
  errors?: { [key: string]: string };
  metaData: MetaDataType;
  limit?: number;
  page?: number;
  totalDocs?: number;
  totalPages?: number;
}

export interface ClientReturnType<ReturnDataType> {
  response: Response;
  data: ReturnDataType;
}

export interface IInitialState {
  status: EFetchStatus;
  message: Record<string, string> | string;
  filter: ISearchParams;
  totalRecords: number;
  [key: string]: unknown;
}

export interface IGridButton {
  type: EButtonTypes;
  onClick: (record: { key: string; [key: string]: any }) => unknown;
  permission?: EPermissions;
  isHidden?: boolean;
  isDisable?: boolean;
}
