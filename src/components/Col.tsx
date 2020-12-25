import React, { Component } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import Button from './Button';
import { propsToStyle } from '../utils/globalProps';

import { Props as ButtonProps } from './Button';

export interface Props {
  onRef?(): void,
  onHoverStyle?: any,
  useHoverNativeProps?: boolean,
  style?: any,
  [key: string]: any,
}

export default class Col extends Component<Props & ButtonProps> {

  state = {
    style: (() => {
      const combinedStyle = [
        propsToStyle(this.props),
        this.props.style,
      ];
      return combinedStyle;
    })(),
  }

  setStyles = (styles) => {
    const { useHoverNativeProps } = this.props;
    // @ts-ignore
    const root : any = this.root;
    if (useHoverNativeProps && !!root) {
      root.setNativeProps({
        style: styles,
      })
    } else {
      this.setState({ style: styles })
    }
    
  }

  render() {
    const { onPress, onRef, onHoverStyle } = this.props;
    const { style } = this.state;
    const combinedStyle = [
      propsToStyle(this.props),
      this.props.style,
    ];

    const hoverProps = !onHoverStyle ? {} : {
      onMouseEnter: () => this.setStyles([combinedStyle, onHoverStyle]),
      onMouseLeave: () => this.setStyles(combinedStyle),
    }
    
    return typeof onPress === 'function' ? (
      <Button
        ref={onRef}
        onPress={onPress}
        activeOpacity={0.9}
        {...this.props}
        {...hoverProps}
        style={style}
      />
    ) : (
      <View
        ref={onRef}
        {...this.props}
        // @ts-ignore
        {...hoverProps}
        style={style}
      />
    );
  }
}