import api from 'src/api/api-config';

// getLikes
export const getLikesApi = async (userId) => {
  try {
    const config = {
      params: { userId },
    };
    const { data } = await api.get('/api/likes', config);
    // console.log('getLikesdata: ', data);
    const results = data.data;
    return results;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || 'Frontend error in getLikesApi method'
    );
  }
};

// postLikes

export const postLikeApi = async (userId, aestheticianId) => {
  try {
    const body = {
      userId,
      aestheticianId,
    };
    const { data } = await api.post('/api/likes', body);
    console.log('postLikesApiData: ', data);
    const results = data.data;
    return results;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || 'Frontend error in postLikeApi method'
    );
  }
};

// deleteLikes
export const deleteLikeApi = async (userId, aestheticianId) => {
  try {
    const config = {
      data: { userId, aestheticianId },
    };
    const { data } = await api.delete('/api/likes', config);
    console.log('deleteLikeApiData: ', data);
    const results = data.data;
    return results;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || 'Frontend error in deleteLikeApi method'
    );
  }
};
