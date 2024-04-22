import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const useAppQuery = ({
  url,
  tag,
  fetchInit = {},
  reactQueryOptions,
}) => {
  const fetch = useMemo(() => {
    return async () => {
      const response = await window.fetch(url, {
        ...fetchInit,
        method: "GET",
      });
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useQuery({
    queryKey: tag,
    queryFn: fetch,
    config: {
      refetchOnWindowFocus: false,
      ...reactQueryOptions,
    },
  });
};
