import React, { useCallback, useEffect, useState } from "react";

const useQuery = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = useCallback(
    async (url, options) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          ...options,
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        setData(res);
      } catch (error) {
        setError(error?.message || "Request Failed");
      } finally {
        setIsLoading(false);
      }
    },
    [url, options]
  );

  const fetchWithAbort = async (url, options) => {
    let controller = new AbortController();
    const { signal } = controller;
    try {
      await fetchData(url, { signal, ...options });
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };
  useEffect(() => {
    fetchWithAbort(url, options);
  }, [url, options]);

  return { data, isLoading, error, refetch: fetchWithAbort };
};

export default useQuery;
