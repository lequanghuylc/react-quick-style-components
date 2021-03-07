import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Col, Row, Text, Img, Input, Scroll } from '../lib';
import { withUIAndCodeTab } from '../components';
import { StackNavigationProp } from '@react-navigation/stack';
import { Platform, StyleSheet, View } from 'react-native';

const { code } = require('./StyleNumberProps.jsx.json');

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}
const TYPE = {
  VIEW: 'VIEW',
  COL: 'COL',
  ROW: 'ROW',
};

function useDidUpdate (callback : () => void, deps : Array<any>) {
  const hasMount = useRef(false)

  useEffect(() => {
    if (hasMount.current) {
      callback()
    } else {
      hasMount.current = true
    }
  }, deps)
}

const BenchMarkComponent = () => {

  const timeRef = useRef(0);

  const [compType, setCompType] = useState('');
  const [number, setNumber] = useState(0);
  const [renderId, setRenderId] = useState(0);
  const [message, setMessage] = useState('');
  const [isClear, setIsClear] = useState(false);

  const renderView = () => {
    setIsClear(false);
    timeRef.current = new Date().getTime();
    setCompType(TYPE.VIEW);
    setNumber(10000);
    setRenderId(Math.random());
  }

  const renderCol = () => {
    setIsClear(false);
    timeRef.current = new Date().getTime();
    setCompType(TYPE.COL);
    setNumber(10000);
    setRenderId(Math.random());
  }

  const renderRow = () => {
    setIsClear(false);
    timeRef.current = new Date().getTime();
    setCompType(TYPE.ROW);
    setNumber(10000);
    setRenderId(Math.random());
  }

  const clear = () => {
    timeRef.current = new Date().getTime();
    setCompType('');
    setNumber(0);
    setMessage('');
    setIsClear(true);
  }

  useDidUpdate(() => {
    const now = new Date().getTime();
    const delta = now - timeRef.current;
    timeRef.current = now;
    setMessage(`it tooks: ${delta} miliseconds`);
  }, [renderId]);

  const DemoView = () => (
    <View style={{ width: 40, height: 40, margin: 5, backgroundColor: 'gray' }} />
  );

  const DemoCol = () => (
    <Col width40 height40 margin5 backgroundColor="gray" />
  );

  const DemoRow = () => (
    <Row width40 height40 margin5 backgroundColor="gray" />
  );

  if (Platform.OS === 'web') console.count('rerender');

  return (
    useMemo(() => (
      <Col flex1 padding20>

        <Col width300 height50 middle marginBottom5 onPress={renderView} backgroundColor="black">
          <Text colorWhite>Render 10,000 {`< View />`}s</Text>
        </Col>

        <Col width300 height50 middle marginBottom5 onPress={renderCol} backgroundColor="black">
          <Text colorWhite>Render 10,000 {`< Col />`}s</Text>
        </Col>

        <Col width300 height50 middle marginBottom5 onPress={renderRow} backgroundColor="black">
          <Text colorWhite>Render 10,000 {`< Row />`}s</Text>
        </Col>

        {Boolean(message) && <Text>{message}</Text>}

        <Col width300 height30 middle marginTop5 onPress={clear} backgroundColor="gray">
          <Text colorWhite>Clear & Reset time</Text>
        </Col>

        {Boolean(!isClear) && new Array(number).fill(1).map((val, i) => {
          if (compType === TYPE.VIEW) return (
            <DemoView key={`view-${i}`} />
          )
          if (compType === TYPE.COL) return (
            <DemoCol key={`col-${i}`} />
          )
          if (compType === TYPE.ROW) return (
            <DemoRow key={`row-${i}`} />
          )
          return null;
        })}
      </Col>
    ), [renderId, message, isClear])
  )
}

export const SimpleBenchmark = ({ navigation } : IScreenProps) => {
  
  const Content = withUIAndCodeTab(navigation, code,
    <BenchMarkComponent />
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