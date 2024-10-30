import { IMethodStyle, IPageStyle } from "./editor";

export interface ITheme {
  name: string;
  value: string;
  styles: {
    page: IPageStyle;
    method: IMethodStyle;
  };
}
