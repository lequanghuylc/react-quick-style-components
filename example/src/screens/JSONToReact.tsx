import React from 'react';
import { Col, Row, Text, Parser } from '../lib';
import { withUIAndCodeTab } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';

const { code } = require('./JSONToReact.jsx.json');

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}

export const JSONToReact = ({ navigation }: IScreenProps) => {
  const Content = withUIAndCodeTab(navigation, code,
    <Col flex1 padding20>

      <Parser
        {...({
          id: 'Heading',
          from: 'Text',
          style: {
            fontSize: 25,
          },
          props: {
            text: 'Render react component from JSON'
          }
        })}
      />

      <Parser
        {...({
          id: 'Description',
          from: 'Text',
          style: {
            fontSize: 14,
          },
          props: {
            text: 'Take a look at the code to see how it works'
          }
        })}
      />

      <Parser
        {...({
          id: 'Line1',
          from: 'Col',
          style: {
            height: 1,
            marginVertical: 20,
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        })}
      />

      <Parser
        {...({
          id: 'Support_Children',
          from: 'Col',
          props: {
            middle: true,
            useNestedHover: true,
          },
          style: {
            height: 70,
            width: 200,
            backgroundColor: 'pink',
          },
          onHoverStyle: {
            backgroundColor: 'black',
          },
          banks: {
            'ChildText1': {
              id: 'ChildText1',
              from: 'Text',
              props: { text: 'Support children' },
              onHoverStyle: {
                color: 'white',
              },
            }
          },
          tree: {
            id: 'Support_Children',
            children: [{
              id: 'ChildText1', children: [],
            }]
          }
        })}
      />

    </Col>
  );
  return <Content />
};