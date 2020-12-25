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