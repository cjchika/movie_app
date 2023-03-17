import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";

const FavouriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
  };
};

const FavoriteList = () => {
  return <div>FavoriteList</div>;
};

export default FavoriteList;
