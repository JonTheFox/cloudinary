import { Component, useState } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";

export default function TageWithAssociatedImages(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  return (
    <div className="tags-with-associated-images card">
      TagsWithAssociatedImages
      <style jsx>{`
        .tags-with-associated-images {
          margin-top: 12px;
          height: calc(35% - 12px);
        }
      `}</style>
    </div>
  );
}
