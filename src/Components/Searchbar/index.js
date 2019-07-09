import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Button } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from 'Themes';

function Searchbar({ value, onSearch, addButton, addButtonOnClick }) {
  return (
    <Container>
      <Input value={value} placeholder="Pesquise pela descricão" />
      <Button onClick={onSearch}>Pesquisar</Button>
      {addButton && (
        <Button
          noBorder
          color="#ffffff"
          backgroundColor={COLORS.primary}
          onClick={addButtonOnClick}
        >
          <FontAwesomeIcon icon="plus" color="white" />
        </Button>
      )}
    </Container>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  addButton: PropTypes.bool,
  addButtonOnClick: PropTypes.func
};

Searchbar.defaultProps = {
  value: '',
  onSearch: () => {},
  addButton: false,
  addButtonOnClick: () => {}
};

export default Searchbar;
