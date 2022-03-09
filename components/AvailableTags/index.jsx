import {
  Component,
  useState,
  useEffect,
  useCallback,
} from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import selectedImageState from "../../store/atoms/selectedImage.js";
import ImagesGrid from "../ImagesGrid/index.jsx";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import _ from "lodash";
import { Button } from "@mui/material";

export default function AvailableTags(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  return (
    <div className="available-tags card glass">
      <div className="all-tags--title">
        <span className="all-tags--title---span">All tags</span>
      </div>
      <div className="tags-list">
        {Object.entries(tags || [])?.map?.(([tagLabel, { color }]) => {
          return (
            <div
              className="tag-container"
              style={{ backgroundColor: color || "" }}
              key={tagLabel}
            >
              <span className="tab-label">{tagLabel || ""}</span>
              <Button
                className="delete-tag-btn"
                onClick={() => deleteTag(tagLabel)}
              >
                <DeleteOutlinedIcon />
              </Button>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .available-tags {
          grid-area: available-tags;
          margin-top: 16px;
          height: calc(100% - 176px - 32px);
        }
        .tag-container {
          display: flex;
          height: 40px;
        }

        .tab-label {
          margin: auto;
          margin-left: 12px;
        }
        .MuiSvgIcon-root {
          margin: auto 0;
        }

        .all-tags--title {
          margin-bottom: 6px;
        }
        .all-tags--title---span {
          font-size: 1rem;
          padding-left: 2px;
        }
      `}</style>
    </div>
  );
}
