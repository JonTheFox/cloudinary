import { atom } from "recoil";

export default atom({
  key: "tags", // unique ID (with respect to other atoms/selectors)
  default: {
    scenary: { label: "scenary", tagId: "scenary", color: "green" },
    people: { label: "people", tagId: "people", color: "gray" },
    food: { label: "food", tagId: "food", color: "lightblue" },
  }, // initial value
  dangerouslyAllowMutability: true,
});
