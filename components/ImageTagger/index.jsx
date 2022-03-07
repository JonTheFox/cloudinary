import { Component } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";

export default function Home(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);

  //on mounted
  useEffect(() => {
    setTags(["hey", "hi"]);
    setImages(["aefajifia", "nhuajsfasf"]);
  }, []);

  return (
    <main>
      <h1>Image Tagger</h1>
      <div className="image-tagger-page">
        {tags}
        {images}
      </div>

      <style jsx>{`
        .image-tagger-page {
          height: 100vh;
          overflow: auto;
        }
      `}</style>
    </main>
  );
}
