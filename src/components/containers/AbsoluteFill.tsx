import React from 'react';
import { propsToStyle, Col } from 'custom-libs';

interface Props {
  [key: string]: any,
}

export const AbsoluteFill = (props : Props) => {
  return (
    <Col absoluteFill {...props} />
  );
};

export default AbsoluteFill;