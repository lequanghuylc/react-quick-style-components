import React, { useRef, RefCallback } from 'react';
import {
  ScrollView,
  Platform,
  ScrollViewProps,
} from 'react-native';

import { usePropsStyle, useHoverStyle, useResponsiveStyle } from './hooks';

interface IScroll {
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

const Scroll = (props : IScroll) => {
  const { horizontal, children, onHoverStyle, onResponsiveStyle, showIndicator, scrollViewProps, onScroll } = props;
  const style = usePropsStyle(props);
  const compRef = useRef(null);
  const onRef : RefCallback<any> = (ref) => {
    compRef.current = ref;
    if (props.onRef) props.onRef(ref);
  }
  const useNativeStyleProps = props.useNativeStyleProps === false ? false : true; // default is true
  const [hoverProps, combinedStyle] = useHoverStyle(onHoverStyle, useNativeStyleProps, style, compRef);
  const responsiveStyle = useResponsiveStyle(onResponsiveStyle);

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
      {...hoverProps}
      contentContainerStyle={[combinedStyle, responsiveStyle]}
      keyboardShouldPersistTaps="always"
      onScroll={onScroll}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
};

export default Scroll;
