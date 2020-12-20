import React, { Component } from 'react';
import {
  View, StyleSheet
} from 'react-native';
import Button from './Button';
import { propsToStyle } from '../utils/globalProps';

import { Props as ButtonProps } from './Button';

export interface Props {
  onRef?(): void,
  onPress?(): void,
  style?: any,
  [key: string]: any,
}

export default class Col extends Component<Props & ButtonProps> {

  render() {
    const { onPress, style, onRef, } = this.props;
    const combinedStyle = [
      propsToStyle(this.props),
      style,
    ];
    
    return typeof onPress === 'function' ? (
      <Button ref={onRef} onPress={onPress} activeOpacity={0.9} {...this.props} style={combinedStyle} />
    ) : (
      <View ref={onRef} {...this.props} style={combinedStyle} />
    );
  }
}