import React, { useState, useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
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

import CastSlide from "../components/common/CastSlide";
import MediaVideoSlide from "../components/common/MediaVideoSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendationSlide from "../components/common/RecommendationSlide";
import MediaSlide from "../components/common/MediaSlide";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
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
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (err) toast.error(err.message);
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, err } = await favoriteApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);

    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );

    const { response, err } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Remove favorite success");
    }
  };

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
            <Box
              sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}
            >
              <Stack spacing={5}>
                {/* Title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split("-")[0]
                      : media.first_air_date.split("-")[0]
                  }`}
                </Typography>
                {/* Title */}

                {/* Rating and Genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* Rating */}
                  <CircularRate value={media.vote_average} />
                  {/* Rating */}
                  <Divider orientation="vertical" />
                  {/* Genres */}
                  {genres.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                  {/* Genres */}
                </Stack>
                {/* Rating and Genres */}

                {/* Overview */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>
                {/* Overview */}

                {/* Buttons */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButon-starIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    watch now
                  </Button>
                </Stack>
                {/* Buttons */}

                {/* Cast */}
                <Container header="cast">
                  <CastSlide casts={media.credits.cast} />
                </Container>
                {/* Cast */}
              </Stack>
            </Box>
            {/* Media Info */}
          </Box>
        </Box>
        {/* Media Content */}

        {/* Media Videos */}
        <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Videos">
            <MediaVideoSlide videos={media.videos.results.slice(0, 5)} />
          </Container>
        </div>
        {/* Media Videos */}

        {/* Media Backdrop */}
        {media.images.backdrops.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}
        {/* Media Backdrop */}

        {/* Media Posters */}
        {media.images.posters.length > 0 && (
          <Container header="poster">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}
        {/* Media Posters */}

        {/* Media Reviews */}

        {/* Media Reviews */}

        {/* Media Recommendation */}

        <Container header="you may also like">
          {media.recommend.length > 0 && (
            <RecommendationSlide
              medias={media.recommend}
              mediaType={mediaType}
            />
          )}
          {media.recommend.length > 0 && (
            <MediaSlide
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              mediaType={mediaType}
            />
          )}
        </Container>

        {/* Media Recommendation */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
