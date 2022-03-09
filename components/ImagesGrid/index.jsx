import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react/cjs/react.development";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import TagMenuItem from "../TagMenuItem/index.jsx";
import _ from "lodash";

import { useRecoilState, useRecoilValue } from "recoil";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";
import selectedImageIndexState from "../../store/atoms/selectedImageIndex.js";

function ImagesGrid(props) {
  const tags = useRecoilValue(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
  const [selectedImageIndex, setSelectedImageIndex] = useRecoilState(
    selectedImageIndexState
  );
  // const [untaggedImages, setUntaggedImages] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const tempImages = useRef([]);

  const selectImage = async (event, { imageIndex }) => {
    const selectedImageEl = event.currentTarget;
    setSelectedImageIndex(imageIndex);
    setSelectedImage(images[imageIndex]);

    // set the temporary tags state to the value of the selected image's tags
    // so that we stay in sync
    tempImages.current[imageIndex] = images[imageIndex];
    debugger;
    // open the menu on the selected image
    setMenuAnchorEl(selectedImageEl);
  };

  const handleTagCheck = useCallback(
    ({ tag, tagLabel, checked }) => {
      const selectedImageClone = _.cloneDeep(selectedImage);
      // copy the the temporary tags to the cloned item from the store
      selectedImageClone.tags = _.cloneDeep(
        tempImages.current[selectedImageIndex]?.tags
      );

      debugger;
      // add or remove the specific tag that has just been changed
      if (checked) {
        selectedImageClone.tags[tagLabel] = tag;
      } else {
        delete selectedImageClone.tags[tagLabel];
      }
      tempImages.current[selectedImageIndex] = selectedImageClone;
    },
    [tempImages, selectedImageIndex, selectedImage]
  );

  const updateImageTags = useCallback(() => {
    // set the value of the global state to the the temp values
    setImages((prevImages) => {
      // TODO: fix BUG: this only updates 1 tag!
      const prevImageClone = _.cloneDeep(prevImages);
      debugger;
      prevImageClone[selectedImageIndex] =
        tempImages?.current?.[selectedImageIndex];
      return prevImageClone;
    });
    setMenuAnchorEl(null);
  }, [selectedImage, tempImages, selectedImageIndex]);

  const closeMenu = useCallback(() => {
    setMenuAnchorEl(null);
  }, [setMenuAnchorEl, setMenuAnchorEl, updateImageTags]);

  const renderMenu = useCallback(() => {
    const tagsArray = Object.entries(tags || []);
    if (!tagsArray?.length) return;

    return (
      <Menu
        id="basic-menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {tagsArray?.map?.(([tagLabel, tag]) => {
          const { tagId } = tag;
          if (!tagId) return null;
          return (
            <TagMenuItem
              tag={tag}
              tagLabel={tagLabel}
              key={tagLabel}
              onCheck={handleTagCheck}
            />
          );
        })}
        <Button
          variant="outlined"
          className="apply-tags-btn"
          onClick={updateImageTags}
        >
          Apply
        </Button>
      </Menu>
    );
  }, [
    images,
    menuAnchorEl?.current,
    isMenuOpen,
    closeMenu,
    selectedImage,
    updateImageTags,
    handleTagCheck,
  ]);

  return (
    <section className="images-grid raised--high card shadow--curved glass">
      {Object.values(images)?.map?.((image, imageIndex, _images) => {
        if (!image) {
          return null;
        }
        const { url, id, tags } = image;
        if (!_.isEmpty(tags || {})) return null;
        if (!id) return null;
        const isSelectedImageIndex = selectedImageIndex === imageIndex;

        return (
          <img
            key={id}
            className={`image card ${isSelectedImageIndex && "is-selected"}`}
            onClick={(event) => selectImage(event, { imageIndex })}
            src={url}
          />
        );
      })}
      {renderMenu()}

      <style jsx>{`
        .images-grid {
          grid-area: images-grid;
          height: 53%;
          max-height: 53%;
          min-height: 53%;
          width: 100%;
          min-width: 100%;
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
          max-width: calc(33.3333% - 0.5rem);
          padding: 0.25rem;
          transition: all 0.1s;
          margin-right: 0.25rem;
          margin-left: 0.25rem;
          border-radius: 10px;
        }

        @media screen and (min-width: 1000px) {
          .image {
            max-width: calc(25% - 0.5rem);
          }
        }

        @media screen and (min-width: 1600px) {
          .image {
            max-width: calc(20% - 0.5rem);
          }
        }

        @media screen and (max-width: 800px) {
          .image {
            max-width: calc(50% - 0.5rem);
          }
        }

        @media screen and (max-width: 600px) {
          .image {
            max-width: calc(100% - 0.5rem);
          }
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
    </section>
  );
}

export default ImagesGrid;
