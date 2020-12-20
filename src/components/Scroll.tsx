import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Platform,
  ScrollViewProps
} from 'react-native';

export interface Props {
  onRef?(): void,
  horizontal?: boolean,
  style?: any,
  scrollViewProps?: ScrollViewProps,
  showIndicator?: boolean
  onScroll?: any,
  [key: string]: any,
}

export default class Scroll extends Component<Props> {

  render() {
    const { style, onRef, onScroll, showIndicator, horizontal, scrollViewProps, children } = this.props;
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
        ref={onRef}
        horizontal={horizontal}
        {...scrollIndicatorProps}
        contentContainerStyle={style}
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