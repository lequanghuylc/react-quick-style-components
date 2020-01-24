import React, { Component } from 'react';
import {
  View, StyleSheet
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Button from './Button';
import { propsToStyle } from '../utils/globalProps';

import { Props as ButtonProps } from './Button';

export interface Props {
  onRef?(): void,
  onPress?(): void,
  animation?: {
    animation: string,
    duration: number,
    delay?: number,
    easing?: string,
    iterationCount?: number,
    iterationDelay?: number,
    onAnimationBegin?(): void,
    onAnimationEnd?(): void,
    useNativeDriver?: boolean,
    [key: string]: any,
  },
  style?: any,
  [key: string]: any,
}

export default class Col extends Component<Props & ButtonProps> {

  render() {
    const { onPress, style, animation } = this.props;
    const combinedStyle = [
      propsToStyle(this.props),
      style,
    ];
    return typeof onPress === 'function' ? (
      Boolean(!!animation) ? (
        <Animatable.View {...animation} style={combinedStyle}>
          <Button onPress={onPress} activeOpacity={0.9} {...this.props} style={StyleSheet.absoluteFill} />
        </Animatable.View>
      ) : (
        <Button onPress={onPress} activeOpacity={0.9} {...this.props} style={combinedStyle} />
      )
    ) : (
      Boolean(!!animation) ? (
        <Animatable.View {...this.props} {...animation} style={combinedStyle} />
      ) : (
        <View {...this.props} style={combinedStyle} />
      )
    );
  }
}