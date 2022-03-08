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
import TageWithAssociatedImages from "../TagsWithAssociatedImages/index.jsx";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function Home(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const deleteTag = useCallback(() => {
    debugger;
  }, []);

  return (
    <div className="available-tags card glass">
      <div>
        <span className="all-tags--title">All tags</span>
      </div>
      <div className="tags-list">
        {Object.entries(tags)?.map?.(([tagLabel, { color }]) => {
          return (
            <div
              className="tag-container"
              style={{ backgroundColor: color || "" }}
            >
              <span className="tab-label">{tagLabel || ""}</span>
              <DeleteOutlinedIcon
                className="delete-tag-btn"
                onClick={() => deleteTag(tagLabel)}
              />
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
      `}</style>
    </div>
  );
}
