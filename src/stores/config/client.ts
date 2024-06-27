import { IFetchOptions, IResponse, IThunkPayload, methodType } from "@/shared/utils/shared-interfaces";

export const client = {
  SERVER_URL: import.meta.env.VITE_API_URL,
  tokens: {
    accessToken: JSON.parse(localStorage.getItem("accessToken") as string) ?? "",
    refreshToken: JSON.parse(localStorage.getItem("refreshToken") as string) ?? "",
  },
  async send(path: string, method: methodType = "GET", payload: IThunkPayload = {}) {
    const { headers = {}, body, query = {} } = payload;

    let queryParams = new URLSearchParams(query as Record<string, string>).toString();
    if (queryParams) queryParams = `?${queryParams}`;

    const options: IFetchOptions = {
      method,
    };
    if (this.tokens.accessToken) {
      headers.Authorization = `Bearer ${this.tokens.accessToken}`;
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
      if (response.status == 401) {
        // Refresh Token
      } else if (response.status == 403) {
      } else if (response.status == 500) {
      }
    }
    const data: IResponse<unknown> = await response.json();
    return { response, data };
  },
  get(path: string, payload: IThunkPayload = {}) {
    return this.send(path, "GET", payload);
  },
  post(path: string, payload: IThunkPayload = {}) {
    return this.send(path, "POST", payload);
  },
  put(path: string, payload: IThunkPayload = {}) {
    return this.send(path, "PUT", payload);
  },
  patch(path: string, payload: IThunkPayload = {}) {
    return this.send(path, "PATCH", payload);
  },
  delete(path: string, payload: IThunkPayload = {}) {
    return this.send(path, "DELETE", payload);
  },
};
