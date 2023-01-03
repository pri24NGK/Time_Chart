import React from "react";
import Classes from "./Switch.module.css";

export const Switch = (props) => {
  return (
    <>
      <input
        checked={props.check}
        onChange={props.toggle}
        className={Classes.react_switch_checkbox}
        id={props.labelText}
        type="checkbox"
      />
      <label
        style={{ background: props.check && props.color }}
        className={Classes.react_switch_label}
        htmlFor={props.labelText}
      >
        <span className={Classes.react_switch_button} />
      </label>
    </>
  );
};
