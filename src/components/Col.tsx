import React, { useRef, RefCallback } from 'react';
import {
  View,
} from 'react-native';
import { usePropsStyle, useHoverStyle, useResponsiveStyle, HoverContext } from './hooks';
import Button, { IButtonProps } from './Button';

export interface IColProps extends IButtonProps {
  onRef?(ref: any): void,
  onHoverStyle?: any,
  useNativeStyleProps?: boolean,
  useNestedHover?: boolean,
  onResponsiveStyle?: {
    xs?: any,
    sm?: any,
    md?: any,
    lg?: any,
    xl?: any,
    [breakpoint: string]: any,
  },
  style?: any,
  btn?: boolean,
  [key: string]: any,
}

const Col = (props :  IColProps) => {
  const { btn, onPress, onHoverStyle, onResponsiveStyle, useNestedHover } = props;
  const style = usePropsStyle(props);

  const compRef = useRef(null);
  const onRef : RefCallback<any> = (ref) => {
    compRef.current = ref;
    if (props.onRef) props.onRef(ref);
  }
  const useNativeStyleProps = props.useNativeStyleProps === false ? false : true; // default is true
  const [hoverProps, combinedStyle, isHovered] = useHoverStyle(onHoverStyle, useNestedHover ? false : useNativeStyleProps, style, compRef);
  const responsiveStyle = useResponsiveStyle(onResponsiveStyle);

  const renderWithWrapper = (children : any) => {
    if (useNestedHover) {
      return (
        <HoverContext.Provider value={{ isHovered, useHoverContext: useNestedHover }}>
          {children}
        </HoverContext.Provider>
      );
    }
    return children;
  };

  const mainContent = Boolean(typeof onPress === 'function' || btn) ? (
    <Button
      onRef={onRef}
      onPress={onPress}
      activeOpacity={0.9}
      {...hoverProps}
      {...props}
      style={[combinedStyle, responsiveStyle]}
    />
  ) : (
    <View
      ref={onRef}
      {...hoverProps}
      {...props}
      style={[combinedStyle, responsiveStyle]}
    />
  );

  return renderWithWrapper(mainContent);
};

export default Col;