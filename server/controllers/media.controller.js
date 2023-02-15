import userModel from "../models/user.model";
import tmdbApi from "../tmdb/tmdb.api";
import responseHandler from "../handlers/response.handler";
import favoriteModel from "../models/model.favorite";
import reviewModel from "../models/model.review";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};
