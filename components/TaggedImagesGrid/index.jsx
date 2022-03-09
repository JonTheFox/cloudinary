import {
  Component,
  useState,
  useEffect,
  useCallback,
} from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import _ from "lodash";

export default function TagsWithAssociatedImages(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [taggedImages, setTaggedImages] = useState({});

  const getTagImages = useCallback((tag) => {
    if (!tag || _.isEmpty(tag)) return null;
  }, []);

  useEffect(() => {
    const filteredImages = images?.filter?.((image) => {
      return !_.isEmpty(image?.tags);
    });
    setTaggedImages(filteredImages);
  }, [images]);

  return (
    <div className="tagged-images--container card">
      {Object.entries(tags || [])?.map?.(
        ([tagLabel, { url, color, id: imageId }]) => {
          return (
            <div
              className="tag--container"
              style={{ backgroundColor: color || "" }}
              key={tagLabel}
            >
              <div className="tagged-image--container">
                <span className="tab-label">{tagLabel || ""}</span>
                <img className="tagged-image" src={url}></img>
                <Button
                  className="delete-tag-btn"
                  onClick={() => deleteTag(tagLabel)}
                >
                  <DeleteOutlinedIcon />
                </Button>
              </div>
            </div>
          );
        }
      )}
      <style jsx>{`
        .tagged-images--container {
          margin-top: 12px;
          height: calc(35.5% - 12px);
          display: flex;
          flex-direction: row;
        }

        .tag--container {
          width: 25%;
        }

        .tagged-image--container {
        }
      `}</style>
    </div>
  );
}
