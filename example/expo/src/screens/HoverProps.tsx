import React from 'react';
import { Col, Row, Text } from '../lib';
import { withUIAndCodeTab } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';

const { code } = require('./HoverProps.jsx.json');

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}

export const HoverProps = ({ navigation }: IScreenProps) => {
  const Content = withUIAndCodeTab(navigation, code,
    <Col flex1 padding20>

      <Col
        height50
        width50
        marginBottom10
        backgroundColor="red"
        onHoverStyle={{
          backgroundColor: 'pink',
        }}
      />

      <Col
        height50
        width50
        marginBottom10
        backgroundColor="green"
        onHoverStyle={{
          backgroundColor: 'pink',
        }}
      />

      <Col
        height50
        width50
        backgroundColor="blue"
        onHoverStyle={{
          backgroundColor: 'pink',
        }}
      />

      <Col height1 marginVertical10 backgroundColor="rgba(0,0,0,0.1)" />

      <Row width300>
        <Col flex1>
          <Text fontSize20 marginBottom10>Normal Hover</Text>
          <Col
            width100 height50 backgroundColor="red" middle
            onHoverStyle={{
              backgroundColor: 'black'
            }}
          >
            <Text
              onHoverStyle={{
                color: 'white'
              }}
            >
              Hover me
            </Text>
            <Col
              width20 height20 backgroundColor="black"
              onHoverStyle={{
                backgroundColor: 'white'
              }}>
            </Col>
          </Col>
        </Col>
        <Col flex1>
          <Text fontSize20 marginBottom10>Nested Hover</Text>
          <Col
            width100 height50 backgroundColor="red" middle
            useNestedHover
            onHoverStyle={{
              backgroundColor: 'black'
            }}
          >
            <Text
              onHoverStyle={{
                color: 'white'
              }}
            >
              Hover me
            </Text>
            <Col
              width20 height20 backgroundColor="black"
              onHoverStyle={{
                backgroundColor: 'white'
              }}>
            </Col>
          </Col>
        </Col>
      </Row>


    </Col>
  );
  return <Content />
};