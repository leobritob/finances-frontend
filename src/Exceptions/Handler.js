import type { IException } from "Interfaces/IException";
import type { IValidationException } from "Interfaces/IValidationException";

const parseErrors = (
  requestData: IException | IValidationException
): string => {
  switch (requestData.error) {
    case "ValidationException":
      return requestData.messages.map(msg => msg.message).join(" ");
    default:
      return requestData.message;
  }
};

export default {
  parseErrors
};
