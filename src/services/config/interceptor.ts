import { ClientReturnType, IResponse, IThunkPayload, MethodType } from "@/shared/utils/shared-interfaces";
import { refreshToken } from "./handlers";
import { ClientType } from "./client";
import toast from "react-hot-toast";

interface IInterceptorProps<T> {
  client: ClientType;
  response: Response;
  data: IResponse<T>;
  sendOptions: {
    path: string;
    method: MethodType;
    payload: IThunkPayload;
  };
}

export const interceptor = async <MetaDataType>({
  client,
  response,
  data,
  sendOptions,
}: IInterceptorProps<MetaDataType>): Promise<ClientReturnType<IResponse<MetaDataType>>> => {
  switch (response.status) {
    case 400: {
      // Bad Request
      return { response, data };
    }
    case 401: {
      // Unauthorized
      if (client.tokens.refreshToken()) {
        if (await refreshToken(client)) {
          return await client.send(sendOptions.path, sendOptions.method, sendOptions.payload);
        } else {
          toast.error("Your login session has expired, please log in again");
        }
      }
      data.message = "";
      return { response, data };
    }
    case 403: {
      // Access Denied
      data.message = "Access Denied!";
      return { response, data };
    }
    case 500: {
      // Server Error
      data.message = "Something went wrong, please try again later!";
      return { response, data };
    }
    default: {
      return { response, data };
    }
  }
};
