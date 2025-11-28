declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      backgroundImage: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      backgroundImage?: string;
    };
  }
}
