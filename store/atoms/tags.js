import { atom } from "recoil";

export default atom({
  key: "tags", // unique ID (with respect to other atoms/selectors)
  default: [
    { label: "scenary", tagId: "scenary", color: "green" },
    { label: "people", tagId: "people", color: "gray" },
    { label: "food", tagId: "food", color: "lightblue" },
  ], // initial value
  dangerouslyAllowMutability: true,
});
