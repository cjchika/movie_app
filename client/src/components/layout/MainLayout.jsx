import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import AuthModal from "../common/AuthModal";

const MainLayout = () => {
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
