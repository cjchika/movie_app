import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeMode = {
  dark: "dark",
  light: "light",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeMode.dark
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#fffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#fffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
            },
          };
    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
