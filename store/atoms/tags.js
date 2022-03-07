import { atom } from "recoil";

export default atom({
  key: "tags", // unique ID (with respect to other atoms/selectors)
  default: [], // initial value
});
