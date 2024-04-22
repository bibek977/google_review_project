import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

export const useAppMutation = ({
  url,
  method = "POST",
  reactQueryOptions,
}) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const fetch = useMemo(() => {
    return async (body) => {
      const response = await window.fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      return response.json();
    };
  }, [url, method]);

  return useMutation({
    mutationFn: fetch,
    config: {
      refetchOnWindowFocus: false,
      ...reactQueryOptions,
    },
  });
};

