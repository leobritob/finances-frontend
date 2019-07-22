import { history } from "Config/Store";
import UsersServices from "./UsersServices";
import AuthServices from "./AuthServices";
import { toast } from "react-toastify";
import HandleErrors from "Exceptions/Handler";

export const commonMonitor = (response: ApiResponse): void => {
  if (![200, 201, 204].includes(response.status)) {
    const errorsMessages = HandleErrors.parseErrors(response.data);

    if (errorsMessages) toast.error(errorsMessages);
  }

  if (response.status === 401) {
    history.push("/login");
  }

  if (response.status === 500) {
  }
};

const Services = {
  user: UsersServices.create(),
  auth: AuthServices.create()
};

export const updateHeaderAuthToken = (token: string): void => {
  if (token) {
    Object.keys(Services).forEach(index => {
      if (Services[index].hasOwnProperty("config")) {
        Services[index].config.setHeader("Authorization", `Bearer ${token}`);
      }
    });
  }
};

export default Services;
