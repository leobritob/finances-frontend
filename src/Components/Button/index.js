import React from 'react';
import { Container } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({ label, icon, onClick }) {
  return (
    <Container onClick={onClick}>
      {label}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          color="white"
          size="sm"
          style={{ marginLeft: 8 }}
        />
      )}
    </Container>
  );
}
