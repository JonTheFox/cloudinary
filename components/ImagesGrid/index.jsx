import { Component, useState } from "react/cjs/react.development";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import TagMenuItem from "../TagMenuItem/index.jsx";

import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";

function ImagesGrid(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = ({ tag, tagIndex }) => {
    // tag the photo with the selected tag
    closeMenu();
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const selectImage = (event, { imageIndex }) => {
    console.log(imageIndex);

    // open the menu
    setAnchorEl(event.currentTarget);

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
        setImages(mappedPics);
      }
    );
  }, []);

  return (
    <div>
      <section className="images-grid raised--high card shadow--curved glass">
        {images?.map(({ url, id, author }, imageIndex) => {
          const isSelectedImageIndex = selectedImageIndex === imageIndex;

          return (
            <>
              {tags?.length && (
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={closeMenu}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {tags?.map((tag, tagIndex) => {
                    const { label = "", color = "white", id } = tag;
                    if (!id) return null;

                    return (
                      <TagMenuItem
                        key={id}
                        label={label}
                        color={color}
                        isChecked={false}
                        onCheck={({ tag, tagIndex }) => handleMenuSelect}
                      />
                    );
                  })}
                </Menu>
              )}
              <img
                key={id}
                className={`image card ${
                  isSelectedImageIndex && "is-selected"
                }`}
                onClick={(event) => selectImage(event, { imageIndex })}
                src={url}
              />
            </>
          );
        })}
      </section>

      <style jsx>{`
        .images-grid {
          grid-area: images-grid;
          height: 65%;
          max-height: 53vh;
          overflow: auto;
        }

        .img-container {
          width: 100%;
          height: auto;
          display: inline;
        }

        .image {
          opacity: 0.8;
          transition: 0.1s;
          height: auto;
          position: relative;
          max-width: calc(33.3333% - 1rem);
          padding: 0.5rem;
          transition: all 0.1s;
          margin-right: 0.5rem;
          margin-left: 0.5rem;
        }

        .image:hover {
          opacity: 1;
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

export default ImagesGrid;
