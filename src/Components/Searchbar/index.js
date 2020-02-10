import React from 'react';
import PropTypes from 'prop-types';
import Input from 'Components/Input';
import Button from 'Components/Button';
import { Container } from './styles';

function Searchbar({ value, buttonIsVisible, onChange, onClick, placeholder }) {
  return (
    <Container>
      <Input value={value} placeholder={placeholder} onChange={onChange} margin="0 10px 0 0" />
      {buttonIsVisible && (
        <Button
          styleButton="default"
          icon="search"
          onClick={() => onClick(value)}
        />
      )}
    </Container>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  buttonIsVisible: PropTypes.bool,
  placeholder: PropTypes.string,
};

Searchbar.defaultProps = {
  value: '',
  onChange: () => {},
  onClick: () => {},
  buttonIsVisible: true,
  placeholder: 'Digite aqui para pesquisar',
};

export default Searchbar;
