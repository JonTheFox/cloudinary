import {
  Component,
  useState,
  useEffect,
  useCallback,
} from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import _ from "lodash";

export default function TageWithAssociatedImages(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [taggedImages, setTaggedImages] = useState({});

  useEffect(() => {
    const filteredImages = images?.filter?.((image) => {
      return !_.isEmpty(image?.tags);
    });
    setTaggedImages(filteredImages);
  }, [images]);

  return (
    <div className="tags-with-associated-images card">
      {Object.entries(tags || {})?.map?.(([tagLabel, tag]) => {
        return <span>{tagLabel}</span>;
      })}
      <style jsx>{`
        .tags-with-associated-images {
          margin-top: 12px;
          height: calc(35% - 12px);
        }
      `}</style>
    </div>
  );
}
