import { ClientReturnType, IFetchOptions, IResponse, IThunkPayload } from "@/shared/utils/shared-interfaces";
import { interceptor } from "./interceptor";
import { MethodType } from "@/shared/utils/shared-types";

export const client = {
  SERVER_URL: import.meta.env.VITE_API_URL,
  tokens: {
    accessToken: () => {
      try {
        return JSON.parse(localStorage.getItem("accessToken") as string);
      } catch (e) {
        return "";
      }
    },
    refreshToken: () => {
      try {
        return JSON.parse(localStorage.getItem("refreshToken") as string);
      } catch (e) {
        return "";
      }
    },
  },
  async send<MetaDataType>(
    path: string,
    method: MethodType = "GET",
    payload: IThunkPayload = {},
  ): Promise<ClientReturnType<IResponse<MetaDataType>>> {
    const { headers = {}, body, query = {} } = payload;

    let queryParams = new URLSearchParams(query as Record<string, string>).toString();
    if (queryParams) queryParams = `?${queryParams}`;

    const options: IFetchOptions = {
      method,
    };
    if (this.tokens.accessToken()) {
      headers.Authorization = `Bearer ${this.tokens.accessToken()}`;
    }

    if (body) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    Object.assign(options, {
      headers,
    });

    const response = await fetch(`${this.SERVER_URL}${path}${queryParams}`, options);
    const data: IResponse<MetaDataType> = await response.json();
    if (!response.ok) {
      return await interceptor<MetaDataType>({
        client: this,
        data,
        response,
        sendOptions: {
          path,
          method,
          payload,
        },
      });
    }
    return { response, data };
  },
  get<MetaDataType>(path: string, payload: IThunkPayload = {}) {
    return this.send<MetaDataType>(path, "GET", payload);
  },
  post<MetaDataType>(path: string, payload: IThunkPayload = {}) {
    return this.send<MetaDataType>(path, "POST", payload);
  },
  put<MetaDataType>(path: string, payload: IThunkPayload = {}) {
    return this.send<MetaDataType>(path, "PUT", payload);
  },
  patch<MetaDataType>(path: string, payload: IThunkPayload = {}) {
    return this.send<MetaDataType>(path, "PATCH", payload);
  },
  delete<MetaDataType>(path: string, payload: IThunkPayload = {}) {
    return this.send<MetaDataType>(path, "DELETE", payload);
  },
};

export type ClientType = typeof client;
