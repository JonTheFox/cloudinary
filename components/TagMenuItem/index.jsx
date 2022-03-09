import { useState, useEffect } from "react/cjs/react.development";
import { useRecoilValue } from "recoil";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import selectedImageState from "../../store/atoms/selectedImage.js";

function TagMenuItem(props) {
  const selectedImage = useRecoilValue(selectedImageState);
  const [checked, setChecked] = useState(
    !!selectedImage?.tags?.[props?.tag?.label]
  );

  useEffect(() => {
    // a tag should be checked if it's includes in the 'tags' property of an image
    setChecked(!!selectedImage?.tags?.[props?.tagLabel]);
  }, [selectedImage]);

  const handleCheckboxChange = (event) => {
    const isNowChecked = event.target.checked;
    setChecked(isNowChecked);
    props.onCheck?.({
      tag: props.tag,
      tagLabel: props.tagLabel,
      checked: isNowChecked,
    });
  };

  return (
    <MenuItem>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={props.tagLabel || ""}
        />
      </FormGroup>
    </MenuItem>
  );
}

TagMenuItem.propTypes = {
  tag: PropTypes.object,
  tagLabel: PropTypes.string,
};

export default TagMenuItem;
