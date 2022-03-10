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
        _.set(
          imagesClone,
          `[${originalImageIndex}].tags[${tagLabel}]`,
          undefined
        );

        // now that we have the path to the property, we can safely delete it entirely
        // so that the property doesn't get picked up by _.isEmpty() as an actual property with a value
        delete imagesClone[originalImageIndex].tags[tagLabel];
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
          border-radius: 10px;
        }

        .tag--container {
          width: calc(25% - 8px);
          max-width: calc(25% - 8px);
          min-width: calc(25% - 8px);
          overflow: auto;
          padding: 4px;
          margin: 4px;
          border-radius: 6px;
        }

        @media screen and (min-width: 1400px) {
          .tag--container {
            width: calc(20% - 0.5rem);
            min-width: calc(20% - 0.5rem);
            max-width: calc(20% - 0.5rem);
          }
        }

        @media screen and (min-width: 1000px) {
          .tag--container {
            width: calc(25% - 0.5rem);
            min-width: calc(25% - 0.5rem);
            max-width: calc(25% - 0.5rem);
          }
        }

        @media screen and (max-width: 800px) {
          .tag--container {
            width: calc(50% - 0.5rem);
            min-width: calc(50% - 0.5rem);
            max-width: calc(50% - 0.5rem);
          }
        }

        @media screen and (max-width: 600px) {
          .tag--container {
            width: calc(100% - 0.5rem);
            min-width: calc(100% - 0.5rem);
            max-width: calc(100% - 0.5rem);
          }
        }

        .tagged-image--container {
          margin-top: 12px;
        }

        .tagged-image {
          height: 128px;
          border-radius: 6px;
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

        .tagged-images--image-name {
          padding-right: 8px;
        }
      `}</style>
    </div>
  );
}
