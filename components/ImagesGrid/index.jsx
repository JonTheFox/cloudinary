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
import selectedImageStateIndex from "../../store/atoms/selectedImageIndex.js";

function ImagesGrid(props) {
  const tags = useRecoilValue(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
  const [selectedImageIndex, setSelectedImageIndex] = useRecoilState(
    selectedImageStateIndex
  );
  const [imagesWithTags, setImagesWithTags] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const tempImages = useRef([]);

  const getCheckedTagsTuples = useCallback((image) => {
    if (!image) return null;
    if (!image.tags) {
      return [];
    }
    return Object.entries(image.tags);
  }, []);
  const checkedTags = useRef(getCheckedTagsTuples(selectedImage) || []);

  const selectImage = async (event, { imageIndex }) => {
    const selectedImageEl = event.currentTarget;
    setSelectedImageIndex(imageIndex);
    setSelectedImage(images[imageIndex]);
    // open the menu on the selected image
    setMenuAnchorEl(selectedImageEl);
  };

  const handleTagCheck = useCallback(
    ({ tag, tagLabel, checked }) => {
      const selectedImageClone = _.cloneDeep(selectedImage);

      if (!selectedImageClone.tags) {
        selectedImageClone.tags = {};
      }

      // add or remove the tag
      if (checked) {
        selectedImageClone.tags[tagLabel] = tag;
      } else {
        delete selectedImageClone.tags[tagLabel];
      }
      debugger;
      tempImages.current[selectedImageIndex] = selectedImageClone;
    },
    [tempImages, setImagesWithTags, selectedImageIndex, selectedImage]
  );

  const updateImageTags = useCallback(() => {
    // updare the store regarding the temp tags of the selected image
    // TODO: bug here
    setImages((prevImages) => {
      const prevImageClone = _.cloneDeep(prevImages);
      prevImageClone[selectedImageIndex] = imagesWithTags[selectedImageIndex];
      return prevImageClone;
    });
    setMenuAnchorEl(null);
  }, [selectedImage, tempImages]);

  useEffect(() => {
    const allImagesClone = _.cloneDeep(images);
    setImagesWithTags(() => {
      debugger;
      const onlyImagesWithoutTags = allImagesClone.filter((image) => {
        return _.isEmpty(image?.tags ?? {});
      });
      debugger;
      return onlyImagesWithoutTags;
    });
  }, [images, setImagesWithTags]);
  useEffect(() => {
    tempImages.current = imagesWithTags;
  }, [imagesWithTags]);

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
    <div>
      <section className="images-grid raised--high card shadow--curved glass">
        {Object.values(imagesWithTags)?.map(({ url, id }, imageIndex) => {
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
      </section>

      <style jsx>{`
        .images-grid {
          grid-area: images-grid;
          height: 65%;
          max-height: 53vh;
          width: 100%;
          min-width: 100%;
          min-height: 53vh;
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
    </div>
  );
}

export default ImagesGrid;
