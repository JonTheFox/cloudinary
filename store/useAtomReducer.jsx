import {
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";

const label = "useAtomReducer";

//TODO: add support for initAtomReducer
const useAtomReducer = ({ key, initialValue, initAtomReducer, reduce }) => {
  const recoilState = atom({
    key: Date.now(), // unique ID (with respect to other atoms/selectors)
    default: initialValue, // initial value
  });

  const recoilValue = useRecoilValue(recoilState);
  const setRecoilState = useSetRecoilState(recoilState);

  const dispatch = ({ action = "", payload = {} }) => {
    setRecoilState((prevState) => {
      const newState = reduce({
        prevState,
        action,
        payload,
      });
      return newState;
    });
  };

  //WARNING: Using setRecoilValue may result in scenarios that are hard to debug, because setRecoilState bypasses the normal state changes caused by the reducer. When  possible, avoid using setRecoilState.
  return [recoilValue, dispatch, setRecoilState];
};

export default useAtomReducer;
