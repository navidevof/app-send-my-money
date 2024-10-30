import { IMethod, IOption } from "@/interfaces/editor";

export const newOption: () => IOption = () => ({
  id: `option-${Date.now()}`,
  name: "New option",
  haveQr: false,
  qrUrl: "",
  fields: [],
});

export const newMethod: () => IMethod = () => ({
  id: `method-${Date.now()}`,
  template: "",
  name: "New method",
  style: {
    borderRadius: "16",
    background: "#FFFFFF",
    color: "#1F1F22",
  },
  options: [newOption()],
});
