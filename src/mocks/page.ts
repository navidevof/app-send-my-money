import { IPage } from "@/interfaces/page";
import { THEMES } from "@/utils/themes";

export const INITIAL_PAGE = {
  uid: "",
  pageId: "",
  url: "",
  displayName: "",
  photo: "",
  createdAt: 0,
  updatedAt: 0,
  styles: THEMES[0].styles,
  methods: [
    {
      id: "method-1",
      template: "new-method",
      icon: "",
      name: "Nuevo método",
      options: [
        {
          id: "new-option",
          name: "Nueva opción",
          haveQr: false,
          qrUrl: "",
          fields: [],
        },
      ],
    },
    {
      id: "method-2",
      template: "new-method",
      icon: "",
      name: "Nuevo método",
      options: [
        {
          id: "new-option",
          name: "Nueva opción",
          haveQr: false,
          qrUrl: "",
          fields: [],
        },
      ],
    },
    {
      id: "method-3",
      template: "new-method",
      icon: "",
      name: "Nuevo método",
      options: [
        {
          id: "new-option",
          name: "Nueva opción",
          haveQr: false,
          qrUrl: "",
          fields: [],
        },
      ],
    },
  ],
  plan: {
    isActive: false,
    status: "canceled",
  },
} as IPage;
