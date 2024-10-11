// All API calls for getting aetheticians

// method: GET
export const getDataApi = (service, limit, filter) => {
  try {
    const config = {
      params: {
        service,
      },
    };
    //     const fetchClientCardData = async () => {
    //         const config = {
    //           params: { service: 'Lashes', limit: 3 },
    //         };
    //         try {
    //           const { data } = await api.get(
    //             '/api/marketplace/client-search',
    //             config
    //           );
    //           // console.log('api call completed!');
    //           // console.log(data.data);
    //           setClientData(data.data);
    //           // setClientData([data.data[0]]); // Testing to get one card
    //         } catch (error) {
    //           console.error('Error fetching client data', error);
    //         }
    //   }
  } catch (err) {
    console.log(err.message);
    throw new Error(
      err.response?.data?.message || "Frontend error in getPhotosById method"
    );
  }
};
