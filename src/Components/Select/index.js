import React from "react";
import ReactSelect from "react-select";
import Colors from "Themes/Colors";
import chroma from "chroma-js";

const customStyles = {
  control: (styles, { isFocused }) => {
    let borderBottomColor = isFocused ? Colors.primary : "#cccccc";

    return {
      ...styles,
      backgroundColor: "white",
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor,
      borderRadius: 0,
      ":active": {
        ...styles[":active"]
      }
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(Colors.primary);
    return {
      ...styles,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderRadius: 0,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? color.alpha(0.2).css()
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled ? "#ccc" : isSelected ? "#000000" : "#000000",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled &&
          (isSelected ? color.alpha(0.4).css() : color.alpha(0.3).css())
      }
    };
  },
  input: styles => {
    return {
      ...styles,
      border: 0,
      borderRadius: 0,
      fontSize: 14
    };
  },
  placeholder: styles => {
    return {
      ...styles,
      fontSize: 14
    };
  },
  singleValue: (styles, { data }) => {
    return {
      ...styles,
      fontSize: 14
    };
  }
};

export default function Select(props) {
  return <ReactSelect styles={customStyles} {...props} />;
}
