import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Platform,
  ScrollViewProps,
  Dimensions,
} from 'react-native';

import { ResponsiveContext, getResponsiveRule } from './Responsive';

export interface Props {
  onRef?(ref: any): void,
  onLayout?(event: any): any,
  horizontal?: boolean,
  style?: any,
  scrollViewProps?: ScrollViewProps,
  showIndicator?: boolean
  onScroll?: any,
  onHoverStyle?: any,
  onResponsiveStyle?: {
    sm?: any,
    md?: any,
    lg?: any,
    xl?: any,
    [breakpoint: string]: any,
  },
  useNativeStyleProps?: boolean,
  [key: string]: any,
}

(() => {
  if (Platform.OS !== 'web') return;
  const style = document.createElement('style')
  style.textContent = `
    ::-webkit-scrollbar {
      width: 8px;
      cursor: grab;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3); 
      border-radius: 5px;
    }
  
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.5); 
    }
    * {
      scrollbar-width: thin;
      scrollbar-color: dark;
    }
  `;
  document.head.append(style);
})();

export default class Scroll extends Component<Props> {

  static contextType = ResponsiveContext;

  state = {
    responsiveStyle: {},
  }

  root;

  onRef = (componentRef) => {
    const { onRef } = this.props;
    this.root = componentRef;
    !!onRef && onRef(componentRef);
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
    const { responsiveStyle } = this.state;
    const { style, onScroll, showIndicator, horizontal, scrollViewProps, children, onLayout } = this.props;
    const defaultShowIndicator = showIndicator !== undefined ? showIndicator : Platform.select({
      ios: false,
      android: false,
      web: true,
    });
    const scrollIndicatorProps = horizontal ? {
      showsHorizontalScrollIndicator: defaultShowIndicator,
    } : {
        showsVerticalScrollIndicator: defaultShowIndicator,
      };
    return (
      <ScrollView
        ref={this.onRef}
        onLayout={onLayout}
        horizontal={horizontal}
        {...scrollIndicatorProps}
        contentContainerStyle={[style, responsiveStyle]}
        keyboardShouldPersistTaps="always"
        onScroll={onScroll}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})