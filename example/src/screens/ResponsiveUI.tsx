import React from 'react';
import { Col, Row, Text, ResponsiveViewport } from '../lib';
import { withUIAndCodeTab } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';

const { code } = require('./ResponsiveUI.jsx.json');

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}

export const ResponsiveUI = ({ navigation } : IScreenProps) => {
  const Content = withUIAndCodeTab(navigation, code,
    <Col flex1 padding20>

      <Text marginVertical15>Please use multiple devices to view this screen in different viewports</Text>

      <Text marginVertical15>Stack Layout in smaller screens</Text>

      <Row
        margin20 backgroundColor="rgba(0,0,0,0.1)" height100 stretch
        responsiveLayout={{
          xs: '100%',
          md: '1:.',
          lg: '1:2:1',
        }}
      >
        <Col backgroundColor="red" height100p />
        <Col backgroundColor="green" height100p />
        <Col backgroundColor="blue" height100p />
      </Row>

      <Text marginVertical15>With margin (and short props)</Text>

      <Row
        margin20 backgroundColor="rgba(0,0,0,0.1)" height100 stretch
        xs="100%"
        md="1:."
        lg="1:2:1"
      >
        <Col height100p>
          <Col flex1 backgroundColor="red" margin10 />
        </Col>
        <Col height100p>
          <Col flex1 backgroundColor="green" margin10 />
        </Col>
        <Col height100p>
          <Col flex1 backgroundColor="blue" margin10 />
        </Col>
      </Row>

      <Text marginVertical15>Equal Spaces</Text>

      <Row
        margin20 backgroundColor="rgba(0,0,0,0.1)" height100 stretch
        responsiveLayout={{
          xs: '100%',
          md: '1:.',
          lg: '1:2:1',
        }}
        padding5
      >
        <Col height100p>
          <Col flex1 backgroundColor="red" margin5 />
        </Col>
        <Col height100p>
          <Col flex1 backgroundColor="green" margin5 />
        </Col>
        <Col height100p>
          <Col flex1 backgroundColor="blue" margin5 />
        </Col>
      </Row>

      <Text marginVertical15>Equal Spaces (without edge spaces, no background color)</Text>

      <Row
        margin10 padding5
        height100 stretch
        responsiveLayout={{
          xs: '100%',
          md: '1:.',
          lg: '1:2:1',
        }}
      >
        <Col height100p >
          <Col flex1 backgroundColor="red" margin5  />
        </Col>
        <Col height100p >
          <Col flex1 backgroundColor="green" margin5  />
        </Col>
        <Col height100p >
          <Col flex1 backgroundColor="blue" margin5  />
        </Col>
      </Row>

      <Text marginVertical15>Responsive Grid</Text>

      <Row
        margin10 padding5 stretch
        responsiveLayout={{
          xs: `50%`,
          md: `${100/3}%`,
          lg: '25%',
          xl: '20%',
        }}
      >
        {new Array(30).fill(1).map((val, i) => (
          <Col height100 key={'item'+i}>
            <Col flex1 backgroundColor="gray" margin5 />
          </Col>
        ))}
      </Row>

      <Text marginVertical15>Custom Viewport Width</Text>

      <ResponsiveViewport width={375}>
        <Row
          margin10 padding5 stretch
          responsiveLayout={{
            xs: `50%`,
            md: `${100/3}%`,
            lg: '25%',
            xl: '20%',
          }}
        >
          {new Array(10).fill(1).map((val, i) => (
            <Col height100 key={'item'+i}>
              <Col flex1 backgroundColor="gray" margin5 />
            </Col>
          ))}
        </Row>
      </ResponsiveViewport>

      <Text marginVertical15>Custom breakpoints</Text>

      <ResponsiveViewport width={480}>
        <Row
          margin10 padding5 stretch
          responsiveLayout={{
            xs: `100%`,
            md: `${100/3}%`,
            '480px': `50%`,
          }}
        >
          {new Array(10).fill(1).map((val, i) => (
            <Col height100 key={'item'+i}>
              <Col flex1 backgroundColor="gray" margin5 />
            </Col>
          ))}
        </Row>
      </ResponsiveViewport>

      <Text marginVertical15>Row containing flexible width</Text>

      <Row
        margin20 padding5 backgroundColor="rgba(0,0,0,0.1)" height100 stretch
        responsiveLayout={{
          xs: 'any:1',
        }}
        // for this purpose we can use the props below for short
        // xs="any:1"
      >
        <Col height100p>
          <Col flex1 backgroundColor="red" margin5 width50 />
        </Col>
        <Col height100p>
          <Col flex1 backgroundColor="green" margin5 />
        </Col>
      </Row>
      
    </Col>
  );
  return <Content />
};