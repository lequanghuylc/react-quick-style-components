import React from 'react';
import { Col, Row } from '../lib';
import { withUIAndCodeTab } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';

const { code } = require('./StyleNumberProps.jsx.json');

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}

export const StyleNumberProps = ({ navigation } : IScreenProps) => {
  const Content = withUIAndCodeTab(navigation, code,
    <Col flex1 padding20>

      <Col height50 width50 marginBottom10 backgroundColor="red" />
      <Col height50 width50 marginBottom10 backgroundColor="green" />
      <Col height50 width50 backgroundColor="blue" />

      <Col height1 marginVertical10 backgroundColor="rgba(0,0,0,0.1)" />
    </Col>
  );
  return <Content />
};