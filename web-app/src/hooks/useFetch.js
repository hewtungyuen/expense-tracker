import { useEffect, useState } from "react";
import api from "../axiosConfig";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    api.get(url).then((result) => {
      const output = result.data;
      setData(output);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
};

export default useFetch;
