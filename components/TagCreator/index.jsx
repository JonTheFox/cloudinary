import { Component, useState, useCallback } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";
import ImagesGrid from "../ImagesGrid/index.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ColorPicker from "../ColorPicker/index.jsx";

export default function TagCreator(props) {
  const [tagColor, setTagColor] = useState("#7600bf");
  const [images, setImages] = useRecoilState(imagesState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [tagLabel, setTagLabel] = useState("");
  const [isTagValid, setIsTagValid] = useState(false); // todo: change the initial value

  const saveTag = useCallback(() => {
    if (!isTagValid) return;
    // TODO: add the tag to the global state
    setTags((prevTags) => {
      // recoil doesn't allow mutating state properties,
      // so we make deep clones of them first

      const updatedTags = _.cloneDeep(prevTags);
      updatedTags[tagLabel] = {
        label: tagLabel,
        color: tagColor,
        tagId: Date.now(),
      };

      // clear the tag label input
      setTagLabel("");

      return updatedTags;

      // const updatedSelectedImage = _.cloneDeep(selectedImage);
      // // lodash doesn't copy the nested 'tags' array, so we copy it ourselves
      // const updatedSelectedImageTags =
      //   { ...prevTags[selectedImageIndex].tags } || {};

      // updatedImages[selectedImageIndex].tags = updatedSelectedImageTags;
      // updatedSelectedImageTags[tagLabel] = checked ? tag : undefined;
      // updatedSelectedImage.tags = updatedSelectedImageTags;
      // updatedImages[selectedImageIndex] = updatedSelectedImage;

      // return updatedImages;
    });
  }, [isTagValid, setTags, tagLabel, tagColor]);

  const handleTagNameChange = useCallback(
    (event) => {
      setTagLabel(event.target.value);
    },
    [setTagLabel]
  );

  useEffect(() => {
    const isFormFilled = !!(tagLabel && tagColor);
    if (!isFormFilled) return setIsTagValid(false);
    const isLabelUnique = !Object.keys(tags).includes?.(tagLabel);
    setIsTagValid(isLabelUnique);
  }, [tagLabel, tagColor, tags]);

  useEffect(() => {
    console.log("tags: ", tags);
  }, [tags]);

  const handleColorSelect = useCallback(
    (newColor) => {
      setTagColor(newColor);
      console.log("new tagColor selected: ", newColor);
    },
    [setTagColor]
  );

  return (
    <div className="tag-creator card glass">
      <TextField
        className="tag-label-input"
        label="Label"
        variant="outlined"
        color="success"
        value={tagLabel}
        onChange={handleTagNameChange}
      />

      <div
        className={`tag-invalid-msg ${isTagValid ? "is-hidden" : "is-shown"}`}
      >
        <span>Please enter a unique label</span>
      </div>

      <div className="tag-color-controls">
        <ColorPicker
          onSelect={handleColorSelect}
          openButtonBgColor={tagColor}
          openButtonId="tag-creator--color-picker-btn"
        />

        <label
          htmlFor="tag-creator--color-picker-btn"
          className="tag--color-hex"
        >
          {tagColor}
        </label>
      </div>

      <Button
        id="save-tag--btn"
        variant="contained"
        onClick={saveTag}
        disabled={!isTagValid}
      >
        Save Tag
      </Button>

      <style jsx>{`
        .tag-creator {
          grid-area: available-tags;
          display: flex;
          flex-direction: column;
          height: 176px;
          max-height: 176px;
          min-height: 176px;
          overflow: hidden;
        }

        .tag-creator div:first-child {
          margin-bottom: 0.5rem;
        }

        .tag-color-controls {
          display: flex;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .tag--color-hex {
          height: auto;
          margin: auto;
        }

        .tag-invalid-msg {
          font-size: 0.85rem;
          padding-top: 4px;
          padding-left: 2px;
          padding-bottom: 4px;
        }
        .tag-invalid-msg.is-hidden {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
