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

  const getImagesByTag = useCallback(({ tag, tagLabel, allImages }) => {
    if (!tag || !tagLabel || _.isEmpty(tag)) return [];

    const imagesOfTag = allImages.reduce(
      (accumulated, image, originalImageIndex) => {
        const tagInImage = image?.tags?.[tagLabel];
        // if the image indeed contains the tag,
        // and we haven't already added this image,
        // add it
        if (tagInImage && !accumulated?.[tagLabel]) {
          accumulated.push({ ...image, originalImageIndex });
        }
        return accumulated;
      },
      []
    );

    return imagesOfTag;
  }, []);

  return (
    <div className="tagged-images--container card">
      {Object.entries(tags || [])?.map?.(([tagLabel, tag]) => {
        if (!tag || !tagLabel) return null;
        const { color } = tag;
        return (
          <div
            className="tag--container"
            style={{ backgroundColor: color || "" }}
            key={tag.key}
          >
            <span className="tab-label">{tagLabel || ""}</span>
            {getImagesByTag({
              tag,
              tagLabel,
              allImages: images,
            })?.map((imageOfTag, imageIndex, imagesArr) => {
              const { url, originalImageIndex } = imageOfTag;
              return (
                <div className="tagged-image--container">
                  <div className="tagged-image--first-row">
                    <span className="tagged-images--image-name">
                      Image {originalImageIndex}
                    </span>
                    <Button className="delete-btn">
                      <DeleteOutlinedIcon />
                    </Button>
                  </div>

                  <img className="tagged-image" src={url} />
                  {imagesArr.length > imageIndex + 1 && (
                    <hr className="divider"></hr>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      <style jsx>{`
        .tagged-images--container {
          margin-top: 12px;
          height: calc(47% - 32px);
          display: flex;
          flex-direction: row;
          overflow: auto;
          max-width: 100%;
        }

        .tag--container {
          width: 25%;
          max-width: 25%;
          min-width: 25%;
          overflow: auto;
          padding: 4px;
        }

        .tagged-image--container {
          margin-top: 12px;
        }

        .tagged-image {
          width: 100%;
          height: auto;
          border-radius: 12px;
          padding: 8px;
        }

        .divider {
          border-top: 0.25px solid black;
          border-bottom: none;
        }

        .tagged-image--first-row {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
}
