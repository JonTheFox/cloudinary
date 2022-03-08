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

  const [selectedImageIndex, setSelectedImageIndex] = useState();

  const handleChange = (event) => {
    const { label, tagId, color } = props.tag;
    const nowChecked = event.target.checked;
    props.onCheck?.({
      tag: { label, tagId, color },
      checked: nowChecked,
    });
  };

  //on mounted
  useEffect(() => {
    //  get checked value
  }, []);

  return (
    <MenuItem>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedImage?.tags?.[props?.tag?.tagId]}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={props.tag?.label}
        />
      </FormGroup>
    </MenuItem>
  );
}

TagMenuItem.propTypes = {
  tag: PropTypes.object,
};

export default TagMenuItem;
