import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function FlatButton({ label, href, onClick }) {
  return (
    <Container to={href} onClick={onClick}>
      {label}
    </Container>
  );
}

FlatButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func
};

FlatButton.defaultProps = {
  onClick: () => {}
};
