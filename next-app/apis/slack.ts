import { post } from "@apis/common";
import { RequestBody } from "@pages/api/slack";

export const notifyErrorMsg = (url: string, msg: string) =>
  post<RequestBody>("/api/slack", { url: url, msg: msg });
