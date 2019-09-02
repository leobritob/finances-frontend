import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Container, Swatch, Color } from './styles';

export default function InputColor({ value, onChange }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Swatch onClick={() => setIsVisible(!isVisible)}>
        <Color color={value} />
      </Swatch>
      {isVisible && (
        <Container>
          <SketchPicker color={value} onChange={onChange} />
        </Container>
      )}
    </>
  );
}
