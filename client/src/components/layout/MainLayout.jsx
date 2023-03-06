import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify"
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api"
import { setListFavorites, setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  return (
    <>
      {/* Global Loading */}
      <GlobalLoading />

      {/* Login Modal */}
      <AuthModal />

      <Box display="flex" minHeight="100vh">
        {/* Header */}
        <Navbar />

        {/* Main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default MainLayout;
