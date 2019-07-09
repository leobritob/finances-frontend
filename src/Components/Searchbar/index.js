import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Button } from './styles';

function Searchbar({ value, buttonIsVisible, onChange, onClick }) {
  return (
    <Container>
      <Input
        value={value}
        placeholder="Pesquise pela descricão"
        onChange={onChange}
      />
      {buttonIsVisible && (
        <Button onClick={() => onClick(value)}>Pesquisar</Button>
      )}
    </Container>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  buttonIsVisible: PropTypes.bool
};

Searchbar.defaultProps = {
  value: '',
  onChange: () => {},
  onClick: () => {},
  buttonIsVisible: true
};

export default Searchbar;
