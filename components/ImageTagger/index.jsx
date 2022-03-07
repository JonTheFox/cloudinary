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
    <div>
      <div className="image-tagger-page">
        <h1 className="header">Image Tagger</h1>
        <aside className="sidebar">
          <div className="create-tag card glass">create tag</div>
          <div className="available-tags card glass">available-tags</div>
        </aside>
        <main className="main-area">
          <section className="images-grid raised--high card shadow--curved glass">
            images-grid
          </section>
          <section className="tags-with-associated-images card glass">
            tags-with-associated-images
          </section>
        </main>
      </div>

      <style jsx>{`
        .header {
          grid-area: header;
          margin: 0;
        }
        .sidebar {
          grid-area: sidebar;
        }

        .create-tag {
          min-height: 200px;
        }

        .available-tags {
          grid-area: available-tags;
          margin-top: 16px;
          height: calc(100% - 200px - 16px);
        }

        .main-area {
          grid-area: main-area;
          position: relative;
          height: 100%;
          width: 100%;
        }

        .images-grid {
          grid-area: images-grid;
          height: 65%;
        }

        .tags-with-associated-images {
          margin-top: 12px;
          height: calc(35% - 12px);
        }

        .image-tagger-page {
          min-height: 100vh;
          height: 100vh;
          overflow: auto;
          display: grid;
          gap: 12px;
          padding: 20px;
          grid-template-areas:
            "header header header header header header"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area"
            "sidebar main-area main-area main-area main-area main-area";
        }
      `}</style>
    </div>
  );
}
