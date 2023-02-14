import axios from "axios";
import { response } from "express";

const get = async (url) => {
  const reponse = await axios.get(url);
  return response.data;
};

export default { get };
