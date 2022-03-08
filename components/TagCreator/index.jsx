import { Component, useState } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";
import ImagesGrid from "../ImagesGrid/index.jsx";
import TageWithAssociatedImages from "../TagsWithAssociatedImages/index.jsx";
export default function Home(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  return (
    <div className="tag-creator card glass">
      hey
      <style jsx>{`
        .tag-creator {
          min-height: 200px;
        }

        .tag-creator {
          grid-area: available-tags;

          height: calc(35% - 16px);
        }
      `}</style>
    </div>
  );
}
