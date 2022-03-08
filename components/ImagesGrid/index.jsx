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
  const statesRefs = useRef({
    tags,
    images,
    selectedImageIndex,
    selectedImage,
  });

  useEffect(() => {
    statesRefs.current.images = images;
  }, [images]);
  useEffect(() => {
    statesRefs.current.selectedImageIndex = selectedImageIndex;
  }, [selectedImageIndex]);
  useEffect(() => {
    statesRefs.current.selectedImage = selectedImage;
  }, [selectedImage]);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const addOrRemoveTag = useCallback(
    ({ tag, checked }) => {
      if (!selectedImage) {
        return null;
      }
      const { tagId } = tag;

      setImages((prevImages) => {
        const updatedImages = _.cloneDeep(prevImages);
        const updatedSelectedImage = _.cloneDeep(selectedImage);
        // lodash doesn't copy the nested 'tags' array, so we copy it ourselves
        const updatedSelectedImageTags =
          { ...prevImages[selectedImageIndex].tags } || {};

        updatedImages[selectedImageIndex].tags = updatedSelectedImageTags;
        updatedSelectedImageTags[tagId] = checked ? tag : undefined;
        updatedSelectedImage.tags = updatedSelectedImageTags;
        updatedImages[selectedImageIndex] = updatedSelectedImage;

        return updatedImages;
      });

      // const _selectedImageIndex = statesRefs.current.selectedImageIndex;
      // const _selectedImage = statesRefs.current.selectedImage;

      //clone the images state
      const updatedImages = [...images];
      const updatedSelectedImage = { ...selectedImage };
      const updatedSelectedImageTags = { ...updatedSelectedImage.tags } || {};
    },
    [images, setImages, selectedImageIndex, selectedImage]
  );

  const selectImage = async (event, { imageIndex }) => {
    const selectedImageEl = event.currentTarget;
    setSelectedImageIndex(imageIndex);
    setSelectedImage(images[imageIndex]);
    // open the menu on the selected image
    setAnchorEl(selectedImageEl);
  };

  useEffect(() => {
    console.log("selectedImage: ", selectedImage);
  }, [selectedImage]);

  const renderMenu = useCallback(() => {
    if (!tags?.length) return;
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {tags.map((tag = {}) => {
          const { tagId } = tag;
          if (!tagId) return null;
          console.log("selected image:", selectedImage);
          console.log(
            "selected image has tagId: ",
            selectedImage?.tags?.[tagId] === tagId
          );

          return <TagMenuItem tag={tag} key={tagId} onCheck={addOrRemoveTag} />;
        })}
      </Menu>
    );
  }, [
    images,
    anchorEl?.current,
    isMenuOpen,
    closeMenu,
    selectedImage,
    addOrRemoveTag,
  ]);

  return (
    <div>
      <section className="images-grid raised--high card shadow--curved glass">
        {images?.map(({ url, id, author }, imageIndex) => {
          const isSelectedImageIndex = selectedImageIndex === imageIndex;
          return (
            <>
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
        {renderMenu()}
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
