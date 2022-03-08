import { atom } from "recoil";

export default atom({
  key: "selected-image=index", // unique ID (with respect to other atoms/selectors)
  default: null, // initial value
});
