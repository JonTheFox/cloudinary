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
            {images?.map(({ url, id, author }) => {
              console.log("url: ", url);
              return (
                <div key={id} className="img-container card">
                  <img className="image card" src={url} />
                </div>
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
          //   width: auto;
          width: 100%;
          height: auto;
          display: inline;
        }

        .image {
          height: auto;
          position: relative;
          max-width: 30%;
          transition: all 0.1s;
        }

        .image:hover {
          height: auto;
          position: relative;
          max-width: 30%;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
