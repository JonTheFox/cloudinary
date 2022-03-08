import { atom } from "recoil";

export default atom({
  key: "tags", // unique ID (with respect to other atoms/selectors)
  default: {
    sunsets: { tagId: "sunsets", color: "#ffb3ba" },
    people: { tagId: "people", color: "#ffdfba" },
    food: { tagId: "food", color: "#ffffba" },
    forest: { tagId: "beaches", color: "#baffc9" },
    beaches: { tagId: "beaches", color: "#bae1ff" },
  }, // initial value
  dangerouslyAllowMutability: true,
});
