import { AuthPayload } from "../model/endpoint";
import { writeToLocalStorage } from "./localStorage";

export const writeUser = (response: AuthPayload) => {
  writeToLocalStorage("token", response.token);
  writeToLocalStorage("name", response.user?.name);
  window.location.reload();
};
