import { ITheme } from "@/interfaces/theme";

export const THEMES: ITheme[] = [
  {
    name: "Dark",
    value: "dark",
    styles: {
      page: {
        background: "#1F1F22",
        color: "#FFFFFF",
      },
      method: {
        background: "#2C2C2C",
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
        color: "#1F1F22",
      },
      method: {
        background: "#FFFFFF",
        color: "#1F1F22",
        borderRadius: "16px",
      },
    },
  },
];
