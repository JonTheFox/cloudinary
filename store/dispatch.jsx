import {
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";

import imagesState from "./atoms/images";
import tagsState from "./atoms/tags";

import * as actions from "./actions.jsx";

export default dispatch = async (actionType, params = {}) => {
  if (!actionType) {
    console.log("dispatch was called without an actionType !");
    return;
  }

  const fireAction = actions[actionType];
  if (!fireAction) {
    console.log(`Action of type ${actionType} was not found!`);
    return null;
  }

  const newState = await fireAction(params);
  return newState;
};
