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
  useEffect(() => {
    const filteredImages = images?.filter((image) => {
      return _.isEmpty(image?.tags);
    });
    statesRefs.current.imagesWithTags = selectedImage;
    setImagesWithTags(filteredImages);
  }, [images]);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
    updateImageTags();
  }, [setAnchorEl]);

  const selectImage = async (event, { imageIndex }) => {
    const selectedImageEl = event.currentTarget;
    setSelectedImageIndex(imageIndex);
    setSelectedImage(images[imageIndex]);
    // open the menu on the selected image
    setAnchorEl(selectedImageEl);
  };

  const getCheckedTagsTuples = (image) => {
    if (!image) return null;
    if (!image.tags) {
      return [];
    }
    return Object.entries(image.tags);
  };

  const checkedTags = useRef(getCheckedTagsTuples(selectedImage) || []);

  const handleTagCheck = useCallback(
    ({ tag, tagLabel, checked }) => {
      if (!checked) {
        const tagInArray = checkedTags?.current?.find?.(
          ({ tagLabel: checkedTagLabel }) => {
            return checkedTagLabel === tagLabel;
          }
        );

        if (!tagInArray) return;

        const indexOfTagToRemove = checkedTags?.current?.indexOf(tagInArray);
        checkedTags?.current?.splice(
          indexOfTagToRemove, //TODO: get the index of the tag to remove
          1
        );
        return;

        // return delete checkedTags?.current?.[indexOfTagToRemove]; //ERROR HERE. splice instead
      }
      checkedTags.current.push({ tagLabel, tag });
    },
    [checkedTags.current]
  );

  const updateImageTags = useCallback(() => {
    setImages((prevImages = []) => {
      // recoil doesn't allow mutating state properties,
      // so we make deep clones of them first
      const imagesClone = _.cloneDeep(prevImages);
      const selectedImageClone = _.cloneDeep(selectedImage || {});
      checkedTags.current?.forEach(({ tagLabel, tag }) => {
        selectedImageClone.tags[tagLabel] = tag;
      });

      imagesClone[selectedImageIndex].tags = selectedImageClone.tags;

      return imagesClone;
    });

    setAnchorEl(null);
  }, [checkedTags.current, selectedImage]);

  useEffect(() => {
    console.log("selectedImage: ", selectedImage);
  }, [selectedImage]);

  const renderMenu = useCallback(() => {
    const tagsArray = Object.entries(tags || []);
    if (!tagsArray?.length) return;

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
        {tagsArray?.map(([tagLabel, tag]) => {
          console.log("tagLabel: ", tagLabel);
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
    anchorEl?.current,
    isMenuOpen,
    closeMenu,
    selectedImage,
    updateImageTags,
    handleTagCheck,
  ]);

  return (
    <div>
      <section className="images-grid raised--high card shadow--curved glass">
        {imagesWithTags?.map(({ url, id }, imageIndex) => {
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
