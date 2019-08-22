import React from "react";
import PropTypes from "prop-types";
import { Container, Input, Button } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Searchbar({ value, buttonIsVisible, onChange, onClick, placeholder }) {
  return (
    <Container>
      <Input value={value} placeholder={placeholder} onChange={onChange} />
      {buttonIsVisible && (
        <Button onClick={() => onClick(value)}>
          <FontAwesomeIcon icon="search" color="#333333" />
        </Button>
      )}
    </Container>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  buttonIsVisible: PropTypes.bool,
  placeholder: PropTypes.string
};

Searchbar.defaultProps = {
  value: "",
  onChange: () => {},
  onClick: () => {},
  buttonIsVisible: true,
  placeholder: "Digite aqui para pesquisar"
};

export default Searchbar;
