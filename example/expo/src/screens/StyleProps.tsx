import React from 'react';
import { Col, Row } from '../lib';
import { withUIAndCodeTab } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';

const { code } = require('./StyleProps.jsx.json');

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}

export const StyleProps = ({ navigation } : IScreenProps) => {
  const Content = withUIAndCodeTab(navigation, code,
    <Col flex={1} padding={20}>

      <Col height={50} width={50} marginBottom={10} backgroundColor="red" />
      <Col height={50} width={50} marginBottom={10} backgroundColor="green" />
      <Col height={50} width={50} backgroundColor="blue" />

      <Col height={1} marginVertical={10} backgroundColor="rgba(0,0,0,0.1)" />
    </Col>
  );
  return <Content />
};