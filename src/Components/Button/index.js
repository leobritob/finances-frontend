import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Span } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
  height,
  label,
  icon,
  iconColor,
  iconSize,
  allowSpinnerLoading,
  onClick,
  backgroundColor
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 3500);
    }
  }, [isLoading]);

  const onClickModified = e => {
    if (!isLoading) {
      onClick(e);
      if (allowSpinnerLoading) {
        setIsLoading(true);
      }
    }
  };

  return (
    <Container
      height={height}
      onClick={onClickModified}
      backgroundColor={backgroundColor}
      disabled={typeof onClick === "undefined"}
    >
      {isLoading && (
        <>
          <FontAwesomeIcon pulse icon="spinner" color="rgba(255, 255, 255, 0.5)" style={{ marginRight: 5 }} />
          <Span color="rgba(255, 255, 255, 0.5)">Aguarde...</Span>
        </>
      )}
      {!isLoading && (
        <>
          {label && <Span>{label}</Span>}
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              color={iconColor || "white"}
              size={iconSize || "sm"}
              style={{ marginLeft: label ? 8 : 0 }}
            />
          )}
        </>
      )}
    </Container>
  );
}

Button.propTypes = {
  height: PropTypes.number,
  label: PropTypes.string,
  icon: PropTypes.any,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
  allowSpinnerLoading: PropTypes.bool,
  onClick: PropTypes.func
};
