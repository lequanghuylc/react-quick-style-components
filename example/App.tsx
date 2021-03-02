import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StyleProps,
  StyleNumberProps,
  HoverProps,
  ResponsiveUI,
  JSONToReact,
  CoreComponents,
  SimpleBenchmark,
  UniversalNavigation,
} from './src/screens';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const withStack = (ScreenComponent : React.ReactNode | any, name : string) => () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={name} component={ScreenComponent} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Style Props">
        <Drawer.Screen name="Style Props" component={withStack(StyleProps, "Style Props")} />
        <Drawer.Screen name="Style Number Props" component={withStack(StyleNumberProps, "Style Number Props")} />
        <Drawer.Screen name="Core Components" component={withStack(CoreComponents, "Core Components")} />
        <Drawer.Screen name="Hover Props" component={withStack(HoverProps, "Hover Props")} />
        <Drawer.Screen name="Responsive UI" component={withStack(ResponsiveUI, "Responsive UI")} />
        <Drawer.Screen name="JSON To React" component={withStack(JSONToReact, "JSON To React")} />
        <Drawer.Screen name="Simple Benchmark" component={withStack(SimpleBenchmark, "Simple Benchmark")} />
        <Drawer.Screen name="Universal Navigation" component={withStack(UniversalNavigation, "Universal Navigation")} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
