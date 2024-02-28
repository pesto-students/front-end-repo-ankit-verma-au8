import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {
    palette: {
      primary: {
        main?: string;
        hover?: string;
        muted?: string;
      };
      background: {
        main?: string;
        secondary?: string;
      };
      text: {
        main?: string;
        secondary?: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    palette: {
      primary?: object;
      background?: object;
      text?: object;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
