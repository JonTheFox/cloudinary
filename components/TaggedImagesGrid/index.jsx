import { useState, useCallback } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import _ from "lodash";

export default function TaggedImagesGrid(props) {
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

  const removeTagFromImage = useCallback(
    ({ image: imageOfTag, originalImageIndex, tagLabel, tag }) => {
      setImages((prevImages) => {
        const imagesClone = _.cloneDeep(prevImages);

        // if the tag doesn't exist in the image's tags, we don't mutate the state
        if (!imagesClone?.[originalImageIndex]?.tag?.[tagLabel]) imagesClone;

        // if the tag does exist as one of the tags linked to the image,
        // remove the tag from the image
        _.set(
          imagesClone,
          `[${originalImageIndex}].tags[${tagLabel}]`,
          undefined
        );
        // TODO: BUG: the image doesn't appear in the untagged images again
        return imagesClone;
      });
    },
    []
  );

  return (
    <div className="tagged-images--container card">
      {Object.entries(tags || [])?.map?.(([tagLabel, tag]) => {
        if (!tag || !tagLabel) return null;
        const { color } = tag;
        return (
          <div
            className="tag--container"
            style={{ backgroundColor: color || "" }}
            key={tagLabel}
          >
            <span className="tab-label">{tagLabel || ""}</span>
            {getImagesByTag({
              tag,
              tagLabel,
              allImages: images,
            })?.map((imageOfTag, imageIndex, imagesArr) => {
              const { url, originalImageIndex } = imageOfTag;
              return (
                <div
                  className="tagged-image--container"
                  key={originalImageIndex}
                >
                  <div className="tagged-image--first-row">
                    <span className="tagged-images--image-name">
                      Image {originalImageIndex}
                    </span>
                    <Button
                      className="delete-btn"
                      onClick={() =>
                        removeTagFromImage({
                          image: imageOfTag,
                          originalImageIndex,
                          tagLabel,
                          tag,
                        })
                      }
                    >
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
          width: calc(25% - 8px);
          max-width: calc(25% - 8px);
          min-width: calc(25% - 8px);
          overflow: auto;
          padding: 4px;
          margin: 4px;
        }

        .tagged-image--container {
          margin-top: 12px;
        }

        .tagged-image {
          height: 64px;
          border-radius: 4px;
          padding: 0;
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
