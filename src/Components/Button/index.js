import React from 'react';
import PropTypes from 'prop-types';
import { Container, Span } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from 'Themes';
import chroma from 'chroma-js';

const stylesButton = {
  default: {
    container: {
      backgroundColor: '#ffffff',
      borderColor: '#cccccc',
      activeBoxShadow: COLORS.primary,
    },
    spinner: {
      text: { color: 'rgba(0, 0, 0, 0.8)' },
      icon: { color: 'rgba(0, 0, 0, 0.8)' },
    },
    text: { color: '#333333' },
    icon: { color: '#333333' },
  },
  primary: {
    container: {
      backgroundColor: COLORS.primary,
      borderColor: chroma(COLORS.primary)
        .alpha(0.8)
        .css(),
      activeBoxShadow: chroma(COLORS.primary)
        .alpha(0.8)
        .css(),
    },
    spinner: {
      text: { color: 'rgba(255, 255, 255, 0.8)' },
      icon: { color: 'rgba(255, 255, 255, 0.8)' },
    },
    text: { color: '#ffffff' },
    icon: { color: '#ffffff' },
  },
  danger: {
    container: {
      backgroundColor: COLORS.expenses,
      borderColor: chroma(COLORS.expenses)
        .alpha(0.8)
        .css(),
      activeBoxShadow: chroma(COLORS.expenses)
        .alpha(0.8)
        .css(),
    },
    spinner: {
      text: { color: 'rgba(255, 255, 255, 0.8)' },
      icon: { color: 'rgba(255, 255, 255, 0.8)' },
    },
    text: { color: '#ffffff' },
    icon: { color: '#ffffff' },
  },
};

export default function Button({
  height,
  label,
  icon,
  iconColor,
  iconSize,
  allowSpinnerLoading,
  onClick,
  styleButton,
  backgroundColor,
  activeBoxShadow,
  borderColor,
  textColor,
  noMargin,
  noPadding,
  noBorder,
  margin,
  isLoading,
  setIsLoading,
}) {
  const onClickModified = e => {
    if (!isLoading) {
      onClick(e);
      if (allowSpinnerLoading) {
        setIsLoading(true);
      }
    }
  };

  let containerStyles =
    styleButton !== 'custom'
      ? stylesButton[styleButton].container
      : {
          backgroundColor,
          borderColor,
          noMargin,
          noPadding,
          noBorder,
          activeBoxShadow,
          margin,
        };

  let textStyles = styleButton !== 'custom' ? stylesButton[styleButton].text : { color: textColor };

  let iconStyles = styleButton !== 'custom' ? stylesButton[styleButton].icon : { color: iconColor };

  let spinnerTextStyles =
    styleButton !== 'custom' ? stylesButton[styleButton].spinner.text : { color: 'rgba(0, 0, 0, 0.5)' };

  let spinnerIconStyles =
    styleButton !== 'custom' ? stylesButton[styleButton].spinner.icon : { color: 'rgba(0, 0, 0, 0.5)' };

  return (
    <Container height={height} onClick={onClickModified} disabled={typeof onClick === 'undefined'} {...containerStyles}>
      {isLoading && (
        <>
          <FontAwesomeIcon pulse icon="circle-notch" {...spinnerTextStyles} style={{ marginRight: 5 }} />
          <Span {...spinnerIconStyles}>Aguarde...</Span>
        </>
      )}
      {!isLoading && (
        <>
          {label && <Span {...textStyles}>{label}</Span>}
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              size={iconSize || 'sm'}
              style={{ marginLeft: label ? 8 : 0 }}
              {...iconStyles}
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
  onClick: PropTypes.func,
  noMargin: PropTypes.bool,
  noPadding: PropTypes.bool,
  noBorder: PropTypes.bool,
  styleButton: PropTypes.oneOf(['default', 'primary', 'danger']),
  backgroundColor: PropTypes.string,
  activeBoxShadow: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  margin: PropTypes.string,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};

Button.defaultProps = {
  styleButton: 'default',
  isLoading: false,
  setIsLoading: () => {},
};
