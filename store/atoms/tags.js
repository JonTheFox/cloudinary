import { atom } from "recoil";

export default atom({
  key: "tags", // unique ID (with respect to other atoms/selectors)
  default: [
    { label: "scenary", id: "scenary", color: "green" },
    { label: "people", id: "people", color: "gray" },
    { label: "food", id: "food", color: "lightblue" },
  ], // initial value
});
