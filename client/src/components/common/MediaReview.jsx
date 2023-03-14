import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendOutlineIcon from "@mui/icons-material/SendOutlined";
import DeleteIcone from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Container from "./Container";
import reviewApi from "../../api/modules/review.api";

const MediaReview = () => {
  return <div>MediaReview</div>;
};

export default MediaReview;
