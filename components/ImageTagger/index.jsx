import { Component, useState } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";
import ImagesGrid from "../ImagesGrid/index.jsx";
import TaggedImagesGrid from "../TaggedImagesGrid/index.jsx";
import TagCreator from "../TagCreator/index.jsx";
import AvailableTags from "../AvailableTags/index.jsx";

export default function Home(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  //on mounted
  useEffect(() => {
    const MAX_NUM_PICS = 3;
    fetch(`https://picsum.photos/v2/list?page=2&limit=${MAX_NUM_PICS}`).then(
      async (response) => {
        const pics = await response.json();
        const mappedPics = pics.map((pic) => {
          const { download_url: url, id, author } = pic;
          return { url, id, author, tags: {} };
        });

        setImages(mappedPics);
      }
    );
  }, []);

  return (
    <div>
      <div className="image-tagger-page">
        <div className="header">
          <h1 className="title">
            <span>IMAGE TAGGER</span>
            <span>IMAGE TAGGER</span>
          </h1>
          <h2 className="title-2">By Jonathan Weiss</h2>
        </div>

        <aside className="sidebar">
          <TagCreator />
          <AvailableTags />
        </aside>
        <main className="main-area">
          <ImagesGrid />
          <TaggedImagesGrid />
        </main>
      </div>

      <style jsx>{`
        .header {
          grid-area: header;
          margin: 0;
          height: 30px;
        }
        .sidebar {
          grid-area: sidebar;
          width: 200px;
        }

        .main-area {
          grid-area: main-area;
          position: relative;
          height: 100%;
          width: calc(100vh - 254px);
        }

        .images-grid {
          grid-area: images-grid;
          height: 65%;
          max-height: 53vh;
          overflow: auto;
        }

        .image-tagger-page {
          min-height: 100vh;
          height: 100vh;
          overflow: auto;
          display: grid;
          gap: 12px;
          padding: 20px;
          grid-template-areas:
            "header header header header "
            "sidebar sidebar main-area main-area  "
            "sidebar sidebar main-area main-area "
            "sidebar sidebar main-area main-area "
            "sidebar sidebar main-area main-area ";
        }

        .img-container {
          width: 100%;
          height: auto;
          display: inline;
        }

        .image {
          height: auto;
          position: relative;
          max-width: calc(33.3333% - 1rem);
          padding: 1rem;
          transition: all 0.1s;
          margin-right: 0.5rem;
          margin-left: 0.5rem;
        }

        .image:hover {
          height: auto;
          position: relative;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
