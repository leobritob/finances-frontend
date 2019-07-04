import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Button } from './styles';

function Searchbar({ value, onSearch }) {
  return (
    <Container>
      <Input value={value} placeholder="Pesquise pela descricão" />
      <Button onClick={onSearch}>Pesquisar</Button>
    </Container>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired
};

export default Searchbar;
