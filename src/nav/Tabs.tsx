import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { THeaderComponent, withHeaderLayout } from './HeaderComponent';

const Tab = createBottomTabNavigator();

interface ITabProps {
  renderHeader?(): any,
  tabs: Array<THeaderComponent>,
}

interface ITabStates {

}

export default class Tabs extends Component<ITabProps, ITabStates> {

  render() {
    const { tabs, renderHeader } = this.props;
    return (
      <Tab.Navigator>
      </Tab.Navigator>
    );
  }
}