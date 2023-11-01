import { useQuery, useMutation } from "react-query";

import {
  USER_QUERY_KEY,
  USER_PROFILE_QUERY_KEY,
  User,
  UserProfile,
} from "@apis/(user)/common";
import { CustomQueryOptions, get, put } from "@apis/common";

export const useFetchUser = (
  uuid: string,
  options?: CustomQueryOptions<User>
) =>
  useQuery<User>(
    USER_QUERY_KEY,
    ({ signal }) => get(`/user/${uuid}`, User, signal),
    options
  );

export const useUpdateUserProfile = (uuid: string) =>
  useMutation((reqBody: User) => put(`/user/${uuid}`, reqBody));

export const useFetchProfile = (
  uuid: string,
  options?: CustomQueryOptions<UserProfile>
) =>
  useQuery<UserProfile>(
    USER_PROFILE_QUERY_KEY,
    ({ signal }) => get(`/user/${uuid}/profile`, UserProfile, signal),
    options
  );
