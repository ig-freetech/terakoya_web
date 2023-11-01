import axios from "axios";

import { RequestBody } from "@pages/api/slack";

export const notifyErrorMsg = (url: string, msg: string) =>
  axios.post<RequestBody>("/api/slack", { url: url, msg: msg });
