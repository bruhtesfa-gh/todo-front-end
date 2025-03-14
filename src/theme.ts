"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: "info" },
              style: {
                backgroundColor: "#60a5fa",
              },
            },
            {
              props: { severity: "success" },
              style: {
                backgroundColor: "#34d399",
              },
            },
            {
              props: { severity: "warning" },
              style: {
                backgroundColor: "#fbbf24",
              },
            },
            {
              props: { severity: "error" },
              style: {
                backgroundColor: "#f87171",
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
