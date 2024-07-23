import { IResponse } from "@/shared/utils/shared-interfaces";

type TErrorCases = "empty" | "duplicate" | "invalid";

const errorCases = {
  empty: "không được để trống",
  duplicate: "đã tồn tại",
  invalid: "không hợp lệ",
};

const errorsToMessages = (
  errorKey: TErrorCases,
  errors: { [key: string]: string },
  dataKeys: { [key: string]: string },
): { [key: string]: string } => {
  const messages: { [key: string]: string } = {};
  Object.keys(errors).forEach((key) => {
    messages[key] = `${dataKeys[key]} ${errorCases[errorKey]}`;
  });
  return messages;
};

export const messageCreator = (responseData: IResponse<unknown>, dataKeys: { [key: string]: string }) => {
  const { statusCode, errors } = responseData;
  const responseWithMessages = { ...responseData };

  switch (statusCode) {
    case 400: {
      responseWithMessages.message = errorsToMessages("invalid", errors!, dataKeys);
      break;
    }
    case 409: {
      responseWithMessages.message = errorsToMessages("duplicate", errors!, dataKeys);
      break;
    }
    case 422: {
      responseWithMessages.message = errorsToMessages("empty", errors!, dataKeys);
      break;
    }
    default:
      responseWithMessages.message = "Hệ thống đang bận, vui lòng thử lại sau";
  }
  return responseWithMessages;
};
