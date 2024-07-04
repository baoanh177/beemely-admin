import { IFetchOptions, IResponse, IThunkPayload, methodType } from "@/shared/utils/shared-interfaces";
import { handleErrors } from "./handleErrors";

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
  async send<T>(path: string, method: methodType = "GET", payload: IThunkPayload = {}) {
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
    if (!response.ok) {
      handleErrors(client, response);
    }
    const data: IResponse<T> = await response.json();
    return { response, data };
  },
  get<T>(path: string, payload: IThunkPayload = {}) {
    return this.send<T>(path, "GET", payload);
  },
  post<T>(path: string, payload: IThunkPayload = {}) {
    return this.send<T>(path, "POST", payload);
  },
  put<T>(path: string, payload: IThunkPayload = {}) {
    return this.send<T>(path, "PUT", payload);
  },
  patch<T>(path: string, payload: IThunkPayload = {}) {
    return this.send<T>(path, "PATCH", payload);
  },
  delete<T>(path: string, payload: IThunkPayload = {}) {
    return this.send<T>(path, "DELETE", payload);
  },
};

export type ClientType = typeof client;
