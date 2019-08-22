import React from "react";
import PropTypes from "prop-types";
import { H1 } from "./styles";

function Title({ children }) {
  return <H1>{children}</H1>;
}

Title.propTypes = {
  title: PropTypes.string
};

export default Title;
