export const createQueryParams = (
  params: Record<string, string | number | undefined | null>
) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value.toString());
    }
  });
  return queryParams.toString();
};
