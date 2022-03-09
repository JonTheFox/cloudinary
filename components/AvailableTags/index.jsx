import {
  Component,
  useState,
  useEffect,
  useCallback,
} from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import tagsState from "../../store/atoms/tags.js";
import imagesState from "../../store/atoms/images.js";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import _ from "lodash";
import { Button } from "@mui/material";

export default function AvailableTags(props) {
  const [tags, setTags] = useRecoilState(tagsState);
  const [images, setImages] = useRecoilState(imagesState);
  const [editingLabelIndex, setEditingLabelIndex] = useState(null);
  const [editingLabelText, setEditingLabelText] = useState("");

  const saveEditedLabel = useCallback(
    (prevTagLabel) => {
      if (!editingLabelText) {
        // leave without saving
        return setEditingLabelIndex(null);
      }
      setTags((prevTags) => {
        const allTagsClone = _.cloneDeep(prevTags);
        const tagClone = _.get(allTagsClone, prevTagLabel);

        //remove current propery key ( for example: "beaches")
        _.set(allTagsClone, prevTagLabel, undefined);
        delete allTagsClone[prevTagLabel];

        // create a new property, with its key as the input text,
        // and its value as the cloned tag (no change in its content)
        _.set(allTagsClone, editingLabelText, tagClone);

        return allTagsClone;
      });
      setEditingLabelIndex(null);
    },
    [setEditingLabelIndex, editingLabelText, setTags]
  );

  const handleEditBtnClick = useCallback(
    (tagIndex) => {
      setEditingLabelIndex(tagIndex);
    },
    [setEditingLabelIndex]
  );

  const handleEditingLabelInput = useCallback(
    (event, { tagLabel = "", tagIndex }) => {
      const inputValue = event?.currentTarget?.innerText || "";
      setEditingLabelText(inputValue);
      console.log("input value:", inputValue);
    },
    [setEditingLabelText]
  );

  const deleteTag = useCallback(
    (tagLabelToDelete) => {
      let newTags;
      setTags((prevTags) => {
        const tagsClone = _.cloneDeep(prevTags);
        delete tagsClone[tagLabelToDelete];
        newTags = tagsClone;
        return tagsClone;
      });

      // for each image, remove the tag from its 'tags' property
      setImages((prevImages) => {
        // recoil doesn't allow mutating state properties,
        // so we make deep clones of them first
        const imagesClone = _.cloneDeep(prevImages);

        // since we are going to iterate over imagesClone AND mutate the object,
        // we define a new variable, so that we don't mess up the loop while it's going
        const updatedImages = imagesClone; //

        // for each image,
        imagesClone?.forEach((image, imageIndex) => {
          // get its current tags
          const imageTags = image?.tags || {};

          // filter out the tag that is to be deleted
          // by assigning all the other tags to the updatedImages object
          const filteredTagsObject = {};
          Object.entries(imageTags)?.filter?.(([tagLabel, tag]) => {
            // keep the tags that do not have the deleted tag's label
            if (tagLabel !== tagLabelToDelete) {
              _.set(updatedImages, `[${imageIndex}].tags[${tagLabel}]`, tag);
            }
            return;
          });
        });
        return updatedImages;
      });
    },
    [setTags, setImages]
  );

  return (
    <div className="available-tags card glass">
      <div className="all-tags--title">
        <span className="all-tags--title---span">All tags</span>
      </div>
      <div className="tags-list">
        {Object.entries(tags || [])?.map?.(
          ([tagLabel, { color }], tagIndex) => {
            const isLabelEditable = editingLabelIndex === tagIndex;
            if (isLabelEditable) {
              console.log(`label #${tagIndex} is now editable`);
            }

            return (
              <div
                className="tag-container"
                style={{ backgroundColor: color || "" }}
                key={tagLabel}
              >
                <span
                  contentEditable={isLabelEditable}
                  className={`tab-label ${isLabelEditable ? "glass" : ""}`}
                  onInput={(event) =>
                    handleEditingLabelInput(event, { tagIndex, tagLabel })
                  }
                >
                  {tagLabel || ""}
                </span>
                <Button className="edit-btn">
                  {isLabelEditable ? (
                    <CheckIcon onClick={() => saveEditedLabel(tagLabel)} />
                  ) : (
                    <EditIcon onClick={() => handleEditBtnClick(tagIndex)} />
                  )}
                </Button>
                <Button
                  className="delete-btn"
                  onClick={() => deleteTag(tagLabel)}
                >
                  <DeleteOutlinedIcon />
                </Button>
              </div>
            );
          }
        )}
      </div>
      <style jsx>{`
        .available-tags {
          grid-area: available-tags;
          margin-top: 16px;
          height: 532px;
          max-height: 532px;
          overflow: auto;
        }

        .tag-container {
          display: flex;

          min-height: 40px;

          opacity: 0.85;
          margin: 4px 0;
        }
        .tag-container:hover {
          opacity: 1;
        }

        .tab-label {
          margin: auto;
          margin-left: 12px;
          max-width: 60%;
        }

        .tab-label[contenteditable="true"] {
          padding: 0 4px;
          font-weight: bold;
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
