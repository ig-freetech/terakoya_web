import { useQuery, useMutation } from "react-query";

import { USER_QUERY_KEY, User } from "@apis/(user)/common";
import { CustomQueryOptions, get, post } from "@apis/common";

export const useFetchUserProfile = (
  uuid: string,
  options?: CustomQueryOptions<User>
) =>
  useQuery<User>(
    USER_QUERY_KEY,
    ({ signal }) => get(`/user/${uuid}`, User, signal),
    options
  );

export const useUpdateUserProfile = (uuid: string) =>
  useMutation((reqBody: User) => post(`/user/${uuid}`, reqBody));
