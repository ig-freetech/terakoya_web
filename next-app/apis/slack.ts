import { post } from "@apis/common";
import { RequestBody } from "@pages/api/slack";

export const notifyErrorMsg = (msg: string) =>
  post<RequestBody>("/api/slack", { msg: msg });
