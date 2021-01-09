import React from 'react';
import { propsToStyle, Col } from 'custom-libs';

interface Props {
  [key: string]: any,
}

export const Absolute = (props : Props) => {
  return (
    <Col absolute {...props} />
  );
};

export default Absolute;