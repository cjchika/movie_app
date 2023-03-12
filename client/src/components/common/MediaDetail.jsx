import React, { useState, useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteeBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../common/CircularRate";
import Container from "../common/Container";
import ImageHeader from "./ImageHeader";

import uiConfigs from "../../configs/ui.configs";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import favoriteApi from "../../api/modules/favorite.api";
import mediaApi from "../../api/modules/media.api";

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../../redux/features/userSlice";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setisFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
    };
  }, [mediaType, mediaId, dispatch]);

  return <div>MediaDetail</div>;
};

export default MediaDetail;
