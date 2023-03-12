import React, { useState, useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteeBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import favoriteApi from "../api/modules/favorite.api";
import mediaApi from "../api/modules/media.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";

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
      console.log(response);
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setisFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (err) toast.error(err.message);
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]);

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdropPath || media.poster_path
        )}
      />
      <Box
        sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent }}
      >
        {/* Media Content */}
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* Poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.posterPath || media.backdrop_path
                    )
                  ),
                }}
              ></Box>
            </Box>
            {/* Poster */}

            {/* Media Info */}
            {/* Media Info */}
          </Box>
        </Box>
        {/* Media Content */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
