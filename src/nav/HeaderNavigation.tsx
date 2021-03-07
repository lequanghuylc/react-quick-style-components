import React, { memo, useEffect, useMemo, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { withHeaderLayout, makeHeader, THeaderStyle, THeaderComponent, TUIAllocation } from './HeaderComponent';
import { makeLinkingConfig, withoutHeader, routeWithFirstFromName } from './NavUtils';
import Col from '../components/Col';
import Text from '../components/Text';
import { Dimensions } from 'react-native';
import _ from 'lodash';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

type RouteArray = Array<{
  name: string,
  path: string,
  component: any,
  parse?: any,
}>

interface IHeaderNavigationProps {
  prefixes: [string, string],
  routes: RouteArray,
  header: {
    style?: THeaderStyle,
    initialState?: {
      [key: string]: any,
    },
    banks: {
      [name: string]: THeaderComponent,
    },
    alloc: {
      [breakpoint: string]: TUIAllocation,
    }
  }
}

interface IStackNavProps {
  routesArr: RouteArray,
}

const HeaderNavigation = (props : IHeaderNavigationProps) => {
  const { routes, header } = props;
  if (!header.banks || Object.keys(header.banks).length === 0) return null;
  const [Header, alloc] = makeHeader(header);

  const haveDrawer = alloc.drawer && alloc.drawer.length > 0;
  const haveTab = alloc.tab && alloc.tab.length > 0;

  const StackNav = (props : IStackNavProps) => {
    const { routesArr } = props;
    return (
      <Stack.Navigator screenOptions={withoutHeader}>
        {routesArr.map((val, i) => {
          const Screen = withHeaderLayout(val.component, Header);
          return (
            <Stack.Screen
              key={'route-'+val.path+i}
              name={val.name}
            >
              {(props) => useMemo(() => <Screen {...props} />, [alloc])}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    );
  };

  const renderTabNav = (props : any) => useMemo(() => {
    return (
      <Tab.Navigator {...props}>
        {alloc.tab?.map(name => header.banks[name]).map((val, i) => {
          const InnerStack = (props : any) => (
            <Col height={Dimensions.get('window').height}>
              <StackNav routesArr={routeWithFirstFromName(routes, val.name)} {...props} />
            </Col>
          );
          return (
            <Tab.Screen
              key={`tab-`+val.name}
              name={val.name}
            >
              {(props) => useMemo(() =>  <InnerStack {...props} />, [alloc])}
            </Tab.Screen>
          )
        })}
      </Tab.Navigator>
    );
  }, [alloc.tab, routes]);

  const renderDrawerNav = (props : any) => useMemo(() => {
    return (
      <Drawer.Navigator {...props}>
        {alloc.drawer?.map(name => header.banks[name]).map((val, i) => {
          const InnerStack = () => <StackNav routesArr={routeWithFirstFromName(routes, val.name)} />;
          return (
            <Drawer.Screen
              key={`tab-`+val.name}
              name={val.name}
              component={InnerStack}
            />
          );
        })}
      </Drawer.Navigator>
    );
  }, [alloc.drawer, routes]);

  const tabName = alloc?.options?.tab?.name ? alloc.options.tab.name : 't';
  const drawerName = alloc?.options?.drawer?.name ? alloc.options.drawer.name : 'd';

  return (
    <NavigationContainer
      linking={{
        prefixes: props.prefixes,
        config: makeLinkingConfig(routes),
      }}
      independent
    >
      <Stack.Navigator
        initialRouteName={routes[0].name}
        screenOptions={withoutHeader}
      >
        {routes.map((val, i) => {
          const Screen = withHeaderLayout(val.component, Header);
          return (
            <Stack.Screen
              key={'stack-'+val.path+i}
              name={val.name}
            >
              {(props) => useMemo(() => <Screen {...props} />, [alloc])}
            </Stack.Screen>
          );
        })}
        {Boolean(!!haveTab) && (
          <Stack.Screen name={tabName}>
            {renderTabNav}
          </Stack.Screen>
        )}
        {Boolean(!!haveDrawer) && (
          <Stack.Screen name={drawerName}>
            {renderDrawerNav}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default HeaderNavigation;