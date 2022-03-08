import { Component, useState, useCallback } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";
import ImagesGrid from "../ImagesGrid/index.jsx";
import TageWithAssociatedImages from "../TagsWithAssociatedImages/index.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ColorPicker from "../ColorPicker/index.jsx";

export default function Home(props) {
  const [color, setColor] = useState("#7600bf");
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [tagLabel, setTagLabel] = useState("");
  const handleTagNameChange = (event) => {
    setTagLabel(event.target.value);
  };

  const handleColorSelect = useCallback((newColor) => {
    setColor(newColor);
    console.log("new color selected: ", newColor);
  });

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

      <div className="tag-color-controls">
        <ColorPicker
          onSelect={handleColorSelect}
          openButtonBgColor={color}
          openButtonId="tag-creator--color-picker-btn"
        />

        <label
          for="tag-creator--color-picker-btn"
          className="tag--color-hex"
          value={color}
        >
          {color}
        </label>
      </div>

      <Button id="save-tag--btn" variant="contained">
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
      `}</style>
    </div>
  );
}
