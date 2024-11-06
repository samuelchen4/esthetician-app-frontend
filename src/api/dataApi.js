import api from "src/api/api-config";
// All API calls for getting aetheticians

// method: GET
export const getDataApi = async (
  lat,
  long,
  city,
  province,
  service,
  limit,
  page
) => {
  try {
    const config = {
      params: {
        lat,
        long,
        city,
        province,
        service,
        limit,
        page,
      },
    };

    const { data } = await api.get("/api/aetheticians", config);
    // console.log('data response: ', data);
    return data.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(
      err.response?.data?.message || "Frontend error in getDataApi method"
    );
  }
};

export const getTrendingDataApi = async (
  lat,
  long,
  city,
  province,
  limit,
  page
) => {
  try {
    const config = {
      params: {
        lat,
        long,
        city,
        province,
        limit,
        page,
      },
    };

    const { data } = await api.get("/api/aetheticians/trending", config);
    console.log("data response: ", data);
    return data.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(
      err.response?.data?.message ||
        "Frontend error in getTrendingDataApi method"
    );
  }
};

export const getClosestDataApi = async (
  lat,
  long,
  city,
  province,
  limit,
  page
) => {
  try {
    const config = {
      params: {
        lat,
        long,
        city,
        province,
        limit,
        page,
      },
    };

    const { data } = await api.get("/api/aetheticians/nearby", config);
    console.log("data response: ", data);
    return data.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(
      err.response?.data?.message ||
        "Frontend error in getClosestDataApi method"
    );
  }
};
