import {
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";

import tagsState from "./atoms/tags.js";
import imagesState from "./atoms/images.js";

export const assignTagToImage = ({ state, setState, params }) => {
  const [tags, setTags] = useRecoilState(tagsState);
  // tood: return new state
};
