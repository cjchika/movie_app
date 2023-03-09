const baseUrl = "https://api.themoviedb.org/3/";
const key = "972a02537ef524861a020eed189b31a7";

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
