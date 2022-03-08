import { Component, useState } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import { useEffect } from "react/cjs/react.development";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";
import ImagesGrid from "../ImagesGrid/index.jsx";
import TageWithAssociatedImages from "../TagsWithAssociatedImages/index.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [name, setName] = useState("Cat in the Hat");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="tag-creator card glass">
      <TextField
        class="tag-label-input"
        label="Add tag"
        variant="outlined"
        color="success"
        value={name}
        onChange={handleChange}
      />
      <Button variant="contained">Add</Button>
      <style jsx>{`
        .tag-creator {
          grid-area: available-tags;
          display: flex;
          flex-direction: column;
          height: calc(35% - 16px);
          min-height: 200px;
        }

        .tag-creator div:first-child {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
