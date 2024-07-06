import { ClientType } from "./client";

export const handleErrors = (client: ClientType, response: Response) => {
  client;
  switch (response.status) {
    case 400:
      // Bad Request
      break;
    case 401:
      // Unauthorized
      break;
    case 403:
      // Access Denied
      break;
    case 500:
      // Server Error
      break;
  }
};
