import React, { Component, createRef,  } from 'react';
import {
  View, StyleSheet, Dimensions
} from 'react-native';
import Button from './Button';
import { propsToStyle } from '../utils/globalProps';
import { Props as ButtonProps } from './Button';

import { ResponsiveContext, getResponsiveRule } from './Responsive';

export interface Props {
  onRef?(ref: any): void,
  onHoverStyle?: any,
  onResponsiveStyle?: {
    sm?: any,
    md?: any,
    lg?: any,
    xl?: any,
    [breakpoint: string]: any,
  },
  useNativeStyleProps?: boolean,
  style?: any,
  btn?: boolean,
  [key: string]: any,
}

export default class Col extends Component<Props & ButtonProps> {

  static getDerivedStateFromProps(props) {
    const newStyle = [
      propsToStyle(props),
      props.style,
    ];
    return { propStyle: newStyle };
  }

  static contextType = ResponsiveContext;

  state = {
    propStyle: {},
    additionStyle: {},
    responsiveStyle: {},
  }

  root;

  onRef = (componentRef) => {
    const { onRef } = this.props;
    this.root = componentRef;
    !!onRef && onRef(componentRef);
  }

  setStyles = (additionStyle) => {
    const { useNativeStyleProps } = this.props;
    const { propStyle, responsiveStyle } = this.state;
    // @ts-ignore
    const root : any = this.root;
    if (useNativeStyleProps && !!root) {
      root.setNativeProps({
        style: [propStyle, additionStyle, responsiveStyle],
      })
    } else {
      this.setState({ additionStyle })
    }
    
  }

  componentDidMount() {
    const { onResponsiveStyle } = this.props;
    if (!onResponsiveStyle) return;
    Dimensions.addEventListener('change', this.handleDimensionsChange);
    this.handleDimensionsChange();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionsChange);
  }

  handleDimensionsChange = () => {
    const { onResponsiveStyle } = this.props;
    const viewportWidth = this.context.useCustomViewport ? this.context.width : Dimensions.get('window').width; 
    const responsiveStyle = getResponsiveRule(viewportWidth, onResponsiveStyle);
    // console.log('responsiveStyle', responsiveStyle);
    this.setState({ responsiveStyle });
  }

  render() {
    const { onPress, btn, onHoverStyle } = this.props;
    const { propStyle, additionStyle, responsiveStyle } = this.state;

    const hoverProps = !onHoverStyle ? {} : {
      onMouseEnter: () => this.setStyles(onHoverStyle),
      onMouseLeave: () => this.setStyles(undefined),
    };
    
    return Boolean(typeof onPress === 'function' || btn) ? (
      <Button
        onRef={this.onRef}
        onPress={onPress}
        activeOpacity={0.9}
        {...this.props}
        {...hoverProps}
        style={[propStyle, additionStyle, responsiveStyle]}
      />
    ) : (
      <View
        ref={this.onRef}
        {...this.props}
        // @ts-ignore
        {...hoverProps}
        style={[propStyle, additionStyle, responsiveStyle]}
      />
    );
  }
}