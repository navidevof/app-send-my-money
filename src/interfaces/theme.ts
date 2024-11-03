import { IMethodStyle, IPageStyle } from "./page";

export interface ITheme {
  name: string;
  value: string;
  styles: {
    page: IPageStyle;
    method: IMethodStyle;
  };
}
