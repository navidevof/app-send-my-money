export enum Action {
  OPEN_PAGE = "open_page",
  CLICK_METHOD = "click_method",
  CLICK_METHOD_OPTION = "click_method_option",
  POSSIBLE_PAYMENT = "possible_payment",
}

interface IStatMethod {
  methodTemplate: string;
  methodName: string;
  methodIcon?: string;
  option?: IStatOption;
}

interface IStatOption {
  optionId: string;
  optionName: string;
}

export interface IStatCreate {
  action: Action;
  pageUrl: string;
  metadata?: {
    method?: IStatMethod;
  };
}
