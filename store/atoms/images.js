import { atom } from "recoil";

export default atom({
  key: "images", // unique ID (with respect to other atoms/selectors)
  default: [], // initial value
  dangerouslyAllowMutability: true, // to allow modifiying the array by reducers
});
