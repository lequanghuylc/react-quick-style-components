import React, { useState, useEffect } from 'react';
import { Col, Text, Scroll } from '../lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export const withUIAndCodeTab = (navigation : StackNavigationProp<any> | DrawerNavigationProp<any> | any, code : string, children: React.ReactNode) : any => () => {
  const [showCode, setShowCode] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Col
          padding10
          onPress={() => navigation.openDrawer()}
        >
          <Text style={{ fontSize: 20 }}>☰</Text>
        </Col>
      ),
      headerRight: () => (
        <Col
          padding10
          onPress={() => setShowCode(!showCode)}
        >
          <Text>{showCode ? 'View' : 'Code'}</Text>
        </Col>
      ),
    });
  }, [showCode])
  return Boolean(showCode) ? (
    <Col flex1>
      <Scroll style={{ padding: 20 }}>
        <Text>{code}</Text>
      </Scroll>
    </Col>
  ) : (
    <Col flex1>
      <Scroll style={{ padding: 20 }}>
        {children}
      </Scroll>
    </Col>
  );
};