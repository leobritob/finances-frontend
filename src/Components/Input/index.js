import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'Themes';

export default styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  margin: 5px 0;
  background-color: #ffffff;
  border: none;
  border-bottom: 2px solid #cccccc;
  font-size: 0.9rem;

  &:focus {
    border-color: ${COLORS.primary};
  }
`;
