import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

const useFetch = (url, refresh = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setData(null);
      const result = await api.get(url);
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, [url, refresh]);
  return { data, loading };
};

export default useFetch;
