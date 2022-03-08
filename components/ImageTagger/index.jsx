import { Component, useState } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";

export default function Home(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const selectImage = ({ imageIndex }) => {
    console.log(imageIndex);

    setSelectedImageIndex(imageIndex);
    setSelectedImage(images[imageIndex]);
  };

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
        console.log(mappedPics[0]);

        setImages(mappedPics);
      }
    );
    setTags(["hey", "hi"]);
  }, []);

  useEffect(() => {
    console.log("images: ", images);
  }, [images]);

  useEffect(() => {
    console.log("selectedImageIndex: ", selectedImageIndex);
  }, [selectedImageIndex]);

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
          <div className="create-tag card glass">create tag</div>
          <div className="available-tags card glass">available-tags</div>
        </aside>
        <main className="main-area">
          <section className="images-grid raised--high card shadow--curved glass">
            {images?.map(({ url, id, author }, imageIndex) => {
              console.log({ url, id, author });

              const isSelectedImageIndex = selectedImageIndex === imageIndex;
              debugger;
              console.log(`${imageIndex} is now selected`);
              return (
                <img
                  key={id}
                  className={`image card ${
                    isSelectedImageIndex && "is-selected"
                  }`}
                  onClick={() => selectImage({ imageIndex })}
                  src={url}
                />
              );
            })}
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
          max-height: 53vh;
          overflow: auto;
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
            "sidebar main-area main-area main-area main-area main-area";
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

        .image.is-selected {
          height: auto;
          position: relative;

          transform: scale(1.05);
        }

        .image.is-selected:after {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          background: black;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
