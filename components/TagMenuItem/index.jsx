import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.development";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

function TagMenuItem(props) {
  const [checked, setChecked] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(props.checked);

  //on mounted
  useEffect(() => {
    //  get checked value
  }, []);

  return <MenuItem>{props.label}</MenuItem>;
}

TagMenuItem.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  color: PropTypes.string,
};

export default TagMenuItem;
