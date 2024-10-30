export interface IPage {
  displayName: string;
  photo: string;
  styles: IStyles;
  methods: IMethod[];
}

export interface IMethod {
  id: string;
  template: string;
  icon?: string;
  name: string;
  options: IOption[];
}

export interface IOption {
  id: string;
  name: string;
  haveQr: boolean;
  qrUrl: string;
  fields: IField[];
}

export interface IField {
  id: string;
  label: string;
  value: string;
}

interface IStyles {
  page: IPageStyle;
  method: IMethodStyle;
}

export interface IPageStyle {
  background?: string;
  color?: string;
}

export interface IMethodStyle {
  borderRadius?: string;
  background?: string;
  color?: string;
}

export type TTab = "Methods" | "Appearance";
