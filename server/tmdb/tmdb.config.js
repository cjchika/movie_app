const baseUrl = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3/";
const key = process.env.TMDB_KEY || "972a02537ef524861a020eed189b31a7";

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
