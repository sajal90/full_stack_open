/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisible };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisible}>
          new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button type="button" onClick={toggleVisible}>
          cancel
        </button>
      </div>
    </div>
  );
});

export default Togglable;
