import { useState, useRef, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function ColorPicker(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openBtnRef = useRef(null);
  const [color, setColor] = useState("#aabbcc");

  const handleClick = useCallback(
    (event) => {
      setAnchorEl(openBtnRef.current);
    },
    [setAnchorEl, openBtnRef]
  );

  const handleColorSet = useCallback(() => {
    console.log("selected color:", color);
    props.onSelect && props.onSelect(color);
    handleClose();
  }, [color]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div id="weiss-color-picker">
      <Button
        aria-describedby={id}
        variant="contained"
        size="small"
        onClick={handleClick}
        ref={openBtnRef}
        style={{ backgroundColor: props.openButtonBgColor || "" }}
        id={props.openButtonId}
      >
        Color
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <HexColorPicker color={color} onChange={setColor} />
        <div
          className="card glass"
          id="weiss-color-picker--set-button---container"
        >
          <Button
            aria-describedby={id}
            variant="contained"
            id="weiss-color-picker--set-button"
            style={{ backgroundColor: color }}
            onClick={handleColorSet}
          >
            Set
          </Button>
        </div>
      </Popover>
      <style jsx>{``}</style>
    </div>
  );
}

ColorPicker.propTypes = {
  onSelect: PropTypes.func,
  openButtonBgColor: PropTypes.string,
  openButtonId: PropTypes.string,
};

export default ColorPicker;
