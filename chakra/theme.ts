// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FFFDD0",
      200: "#FF7F11",
      300: "#262626",
    },
  },

  fonts: {
    body: "Inter,  sans-serif",
  },

  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },

  components: {
    Button,
  },
});
