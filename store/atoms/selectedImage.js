import { atom } from "recoil";

export default atom({
  key: "selected-image", // unique ID (with respect to other atoms/selectors)
  default: null, // initial value
});
