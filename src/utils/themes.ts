import { ITheme } from "@/interfaces/theme";

export const THEMES: ITheme[] = [
  {
    name: "Dark",
    value: "dark",
    styles: {
      page: {
        background: "#000000",
        color: "#FFFFFF",
      },
      method: {
        background: "#191919",
        color: "#FFFFFF",
        borderRadius: "16px",
      },
    },
  },
  {
    name: "Light",
    value: "light",
    styles: {
      page: {
        background: "#FFFFFF",
        color: "#111111",
      },
      method: {
        background: "#FFFFFF",
        color: "#111111",
        borderRadius: "16px",
      },
    },
  },
];
