import { useState, useEffect } from "react";
import { getTrendingDataApi, getClosestDataApi } from "src/api/dataApi";

// custom hook for fetching aesthetcians
export const useData = () => {
  const lat = 51.0447;
  const long = -114.0719;

  const [trendingAestheticians, setTrendingAestheticians] = useState([]);
  const [upAndComingAestheticians, setUpAndComingAestheticians] = useState([]);

  useEffect(() => {
    async function getTrendingAestheticians() {
      const data = await getTrendingDataApi(
        lat,
        long,
        "Calgary",
        "Alberta",
        3,
        1
      );
      setTrendingAestheticians(data);
    }
    getTrendingAestheticians();

    async function getUpAndComingAestheticians() {
      const data = await getClosestDataApi(
        lat,
        long,
        "Calgary",
        "Alberta",
        3,
        1
      );
      setUpAndComingAestheticians(data);
    }
    getUpAndComingAestheticians();
  }, []);

  return { trendingAestheticians, upAndComingAestheticians };
};
