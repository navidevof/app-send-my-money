import { IMethod, IOption } from "@/interfaces/page";

export const newOption: () => IOption = () => ({
  id: `option-${Date.now()}`,
  name: "Nueva opción",
  haveQr: false,
  qrUrl: "",
  fields: [],
});

export const newMethod: () => IMethod = () => ({
  id: `method-${Date.now()}`,
  template: "",
  name: "Nuevo método",
  style: {
    borderRadius: "16",
    background: "#FFFFFF",
    color: "#1F1F22",
  },
  options: [newOption()],
});
