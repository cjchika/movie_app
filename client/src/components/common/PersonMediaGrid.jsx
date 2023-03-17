import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import personApi from "../../api/modules/person.api";
import MediaItem from "./MediaItem";
import { toast } from "react-toastify";

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);

  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await personApi.medias({ personId });

      if (err) toast.error(err.message);
      if (response) {
      }
    };
  }, [personId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  return <div>PersonMediaGrid</div>;
};

export default PersonMediaGrid;
