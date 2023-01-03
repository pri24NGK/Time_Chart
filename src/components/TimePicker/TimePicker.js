import React from "react";
import TimePicker from "react-time-picker";
import "./TimePicker.css";

export const TimePickerComponent = (props) => {
  return (
    <TimePicker
      onChange={(date) => props.change(date)}
      value={props.value}
      {...props}
      clearIcon={null}
    />
  );
};
