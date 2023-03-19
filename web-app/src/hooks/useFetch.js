import { useEffect, useState } from "react";
import api from "../axiosConfig";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null)
    api.get(url).then((result) => {
      const output = result.data;
      setData(output);
    });
  }, [url]);

  return data;
};

export default useFetch;
