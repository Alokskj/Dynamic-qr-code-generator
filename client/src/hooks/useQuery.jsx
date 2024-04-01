import React, { useCallback, useEffect, useState } from "react";

const useQuery = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async (url, method, body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: body ? JSON.stringify(body) : null,
      });

      const res = await response.json();
      if (!res.success) {
        throw new Error(res.message);
      }
      setData(res.data);
    } catch (error) {
      setError(error?.message || "Request Failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url, method, body);
  }, [url,method,body]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useQuery;
