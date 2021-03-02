import React from 'react';
import { Col, Row, Text, Img, Input, Scroll } from '../lib';
import { withUIAndCodeTab } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

const { code } = require('./StyleNumberProps.jsx.json');

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}

export const CoreComponents = ({ navigation } : IScreenProps) => {
  const Content = withUIAndCodeTab(navigation, code,
    <Col flex1 padding20>

      <Row style={styles.rowBorder}>
        <Col flex1 style={styles.colBorder}>
          <Text center>{'All components'}</Text>
        </Col>
        <Col flex1 padding10>
          <Text>Support style props, style number props, hover and responsive style</Text>
        </Col>
      </Row>

      <Row style={styles.rowBorder}>
        <Col flex1 style={styles.colBorder}>
          <Text center>{'< Text />'}</Text>
        </Col>
        <Col flex1 padding10>
          <Text>Text with default font family and color </Text>
        </Col>
      </Row>

      <Row style={styles.rowBorder}>
        <Col flex1 style={styles.colBorder}>
          <Text center>{'< Col />'}</Text>
        </Col>
        <Col flex1 padding10>
          <Text>Just a default View, or Touchable Opacity when onPress prop is available</Text>
        </Col>
      </Row>

      <Row style={styles.rowBorder}>
        <Col flex1 style={styles.colBorder}>
          <Text center>{'< Row />'}</Text>
        </Col>
        <Col flex1 padding10>
          <Text>a {`< Col />`} with flexDirection row</Text>
          <Text>and responsive layout props</Text>
          <Text>all your responsive layouts will be configured using this component</Text>
        </Col>
      </Row>

      <Row style={styles.rowBorder}>
        <Col flex1 style={styles.colBorder}>
          <Text center>{'< Input />'}</Text>
        </Col>
        <Col flex1 padding10>
          <Text>TextInput component with some configuration</Text>
          <Text>it has getter/setter when id prop is available</Text>
        </Col>
      </Row>

      <Row style={styles.rowBorder}>
        <Col flex1 style={styles.colBorder}>
          <Text center>{'< Scroll />'}</Text>
        </Col>
        <Col flex1 padding10>
          <Text>ScrollView component </Text>
          <Text>with indicator style for web</Text>
        </Col>
      </Row>

      <Row style={styles.rowBorder}>
        <Col flex1 style={styles.colBorder}>
          <Text center>{'< Img />'}</Text>
        </Col>
        <Col flex1 padding10>
          <Text>Image component </Text>
          <Text>render a placeholder view when image error</Text>
        </Col>
      </Row>

    </Col>
  );
  return <Content />
};

const styles = StyleSheet.create({
  rowBorder: {
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  colBorder: {
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderRightWidth: 1,
    padding: 10,
  }
});