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

  //on mounted
  useEffect(() => {
    const MAX_NUM_PICS = 20;
    fetch(`https://picsum.photos/v2/list?page=2&limit=${MAX_NUM_PICS}`).then(
      async (response) => {
        const pics = await response.json();
        const mappedPics = pics.map((pic) => {
          const { download_url: url, id, author } = pic;
          return { url, id, author };
        });

        setImages(mappedPics);
      }
    );
    setTags(["hey", "hi"]);
  }, []);

  return (
    <div className="available-tags card glass">
      available tags
      <style jsx>{`
        .available-tags {
          grid-area: available-tags;
          margin-top: 16px;
          height: calc(65% - 16px);
        }
      `}</style>
    </div>
  );
}
