import { useEffect, useState, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import usePrevious from "../hooks/usePrevious";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";

const MediaList = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const prevMediaType = usePrevious(mediaType);

  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"]);
  const category = ["popular", "top_rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
  }, [mediaType]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currentCategory],
        page: currPage,
      });
      setMediaLoading(false);
      setGlobalLoading(false);

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };
    if (mediaType !== prevMediaType) {
      setCurrPage(1);
      setCurrentCategory(0);
      window.scrollTo(0, 0);
    }

    getMedias();
  }, [
    mediaType,
    currentCategory,
    currPage,
    prevMediaType,
    mediaCategories,
    dispatch,
  ]);

  return <div>MediaList</div>;
};

export default MediaList;
