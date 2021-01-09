import React from 'react';
import { Row, Col } from 'custom-libs';

interface Props {
  [key: string]: any,
}

export const RD12 = (props : Props) => {
  const { children } = props;
  if (!children || !children.props?.children || !children.props?.children[0]) return null;
  return (
    <Row>
      <Col flex1>

      </Col>
      <Col flex2>
        
      </Col>
    </Row>
  );
};