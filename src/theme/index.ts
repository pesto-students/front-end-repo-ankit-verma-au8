import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: {
    //     main: "#fea013",
    //     hover: "#ba4a0c",
    //     muted: "#69563A",
    // },
    // secondary: {
    //   main: "#d23131",
    // },
    background: {
      main: "#DEDEDE",
      secondary: "#1C2536",
    },
    text: {
      main: "#000000",
      secondary: "#6C737F",
      disabled: "#9097A2",
      error: "#ff3333",
      //   normal: "#cbcbcb",
      //   muted: "#999999",
      //   disabled: "#707070",
    },
    // border: {
    //   main: "#494949",
    // },
    // side: {
    //   main: "#111111",
    // },
  },
  typography: {
    // fontFamily: "Poppins, Roboto",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontWeight: 600,
      fontSize: "3rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      //   fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: "1rem",
      //   lineHeight: 1.2,
    },
    subtitle1: {
      fontWeight: 300,
      fontSize: "0.8rem",
    },
  },
});

export default theme;
