import React, { useEffect } from 'react';
import { Col, Row, Text, HeaderNavigation } from '../lib';
import { StackNavigationProp } from '@react-navigation/stack';
import { Link } from '@react-navigation/native';

interface IScreenProps {
  navigation: StackNavigationProp<any>,
}

const ScreenA = ({ navigation }) => (
  <Col flex1 middle>
    <Text>Screen A</Text>

    <Col padding20 marginVertical10 backgroundColor="red" onPress={() => navigation.navigate('t')}>
      <Text>go to tab</Text>
    </Col>

    <Col padding20 backgroundColor="red" onPress={() => navigation.navigate('Screen B')}>
      <Text>Go to screen B</Text>
    </Col>

    <Link to="/screen-b/2">Screen B</Link>
  </Col>
)
const ScreenB = ({ route, navigation }) => {
  const id = !!route.params ? route.params.id : '';
  return (
    <Col flex1 middle>
      <Text>Screen B</Text>
      <Text>{id}</Text>

      <Col padding20 marginVertical10 backgroundColor="red" onPress={() => navigation.openDrawer()}>
        <Text>Open Drawer</Text>
      </Col>
    </Col>
  )
}
const ScreenC = () => (
  <Col flex1 middle>
    <Text>Screen C</Text>
  </Col>
)
const ScreenD = () => (
  <Col flex1 middle>
    <Text>Screen D</Text>
  </Col>
)

const MiniApp = () => {
  return (
    <Col flex1>
      <HeaderNavigation
        prefixes={['http://localhost:19002', 'myapp://']}
        routes={[
          {
            name: 'Home',
            path: '/',
            component: ScreenA,
          },
          {
            name: 'Screen A',
            path: '/screen-a',
            component: ScreenA,
          },
          {
            name: 'Screen B',
            path: '/screen-b/:id',
            parse: {
              id: Number,
            },
            component: ScreenB,
          },
          {
            name: 'Screen C',
            path: '/screen-c',
            component: ScreenC,
          },
          {
            name: 'Screen D',
            path: '/screen-d',
            component: ScreenD,
          },
        ]}
        header={{
          banks: {
            'Logo': {
              name: 'Logo',
              isMainNav: false,
              renderer: () => <Text>AppIcon</Text>
            },
            'Space': {
              name: 'Space',
              isMainNav: false,
              renderer: () => <Col flex1 />
            },
            'Screen A': {
              name: 'Screen A',
              isMainNav: false,
              renderer: () => <Text>Screen A</Text>
            },
            'Screen B': {
              name: 'Screen B',
              isMainNav: false,
              renderer: () => <Text>Screen B</Text>
            },
            'Screen C': {
              name: 'Screen C',
              isMainNav: false,
              renderer: () => <Text>Screen B</Text>
            }
          },
          alloc: {
            xs: {
              header: ['Logo', 'Space', 'Screen A'],
              drawer: ['Screen A', 'Screen B'],
              tab: ['Screen A', 'Screen C'],
            },
            // lg: {
            //   header: ['Logo', 'Space', 'Screen A'],
            // }
          }
        }}
      />
    </Col>
  )
};

export const UniversalNavigation = ({ navigation } : IScreenProps) => {

  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    })
  }, []);

  return (
    <Col flex1>
      <MiniApp />
    </Col>
  );
};

