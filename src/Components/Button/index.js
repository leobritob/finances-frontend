import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Span } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({ label, icon, allowSpinnerLoading, onClick }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 5000);
    }
  }, [isLoading]);

  const onClickModified = () => {
    if (!isLoading) {
      onClick();
      if (allowSpinnerLoading) {
        setIsLoading(true);
      }
    }
  };

  return (
    <Container
      onClick={() => onClickModified()}
      disabled={typeof onClick === 'undefined'}
    >
      {isLoading && (
        <>
          <FontAwesomeIcon
            pulse
            icon="spinner"
            color="rgba(255, 255, 255, 0.5)"
            style={{ marginRight: 5 }}
          />
          <Span color="rgba(255, 255, 255, 0.5)">Aguarde...</Span>
        </>
      )}
      {!isLoading && (
        <>
          <Span>{label}</Span>
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              color="white"
              size="sm"
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </Container>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.any,
  allowSpinnerLoading: PropTypes.bool,
  onClick: PropTypes.func
};
