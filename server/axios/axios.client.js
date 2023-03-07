import axios from "axios";

const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Content-Encoding": "identity",
    },
  });
  return response.data;
};

export default { get };
