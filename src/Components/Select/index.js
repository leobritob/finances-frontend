import React from 'react';
import ReactSelect from 'react-select';
import Colors from 'Themes/Colors';
import chroma from 'chroma-js';

const customStyles = {
  container: styles => ({
    ...styles,
    margin: '0 0 10px 0',
  }),
  menu: styles => ({
    ...styles,
    borderRadius: 0,
  }),
  menuList: styles => ({
    ...styles,
  }),
  menuPortal: styles => ({
    ...styles,
  }),
  control: (styles, { isFocused }) => {
    let borderColor = isFocused ? Colors.primary : '#cccccc';

    return {
      ...styles,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor,
      borderRadius: 0,
      margin: 0,
      ':hover': {
        borderWidth: 1,
        borderColor: '#999999',
      },
      ':active': {
        borderWidth: 1,
        borderColor: Colors.primary,
      },
    };
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
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
      color: isDisabled ? '#ccc' : isSelected ? '#000000' : '#000000',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':hover': {
        ...styles[':hover'],
      },

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled &&
          (isSelected ? color.alpha(0.4).css() : color.alpha(0.3).css()),
      },
    };
  },
  input: styles => ({
    ...styles,
    border: 0,
    borderRadius: 0,
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: 14,
  }),
  singleValue: styles => ({
    ...styles,
    fontSize: 14,
  }),
};

export default function Select(props) {
  return (
    <ReactSelect
      styles={customStyles}
      noOptionsMessage={() => 'Nenhuma opcão'}
      {...props}
    />
  );
}
