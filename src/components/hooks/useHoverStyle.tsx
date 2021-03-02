import React, { useState, useEffect, createContext, useContext, RefObject } from 'react';
import {
  TextStyle,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
  View,
} from 'react-native';

type TOneStyle = TextStyle & ViewStyle & ImageStyle & any;

interface IHoverStyleHook {
  (
    hoverStyle: TOneStyle,
    useNativeProps: boolean,
    currentStyle: TOneStyle,
    componentRef: RefObject<View>,
  )
    : // return hoverProps and style
  [
    {
      onMouseEnter?(e: GestureResponderEvent): void,
      onMouseLeave?(e: GestureResponderEvent): void,
    },
    TOneStyle,
    boolean,
  ]
}

export const HoverContext = createContext({
  isHovered: false,
  useHoverContext: false,
});

export const useHoverStyle : IHoverStyleHook = (hoverStyle, useNativeProps, currentStyle, componentRef) => {
  const [combineStyle, setCombineStyle] = useState(currentStyle);
  const [isHovered, setIsHovered] = useState(false);
  const context = useContext(HoverContext);
  useEffect(() => {
    setCombineStyle(currentStyle);
  }, [currentStyle])
  if (!hoverStyle || Object.keys(hoverStyle).length === 0) return [{}, currentStyle, false];

  const setStyles = (additionStyle: null | TOneStyle) => {
    const root = componentRef?.current;
    if (useNativeProps && !!root) {
      root.setNativeProps({
        style: [currentStyle, additionStyle],
      })
    } else {
      setCombineStyle([currentStyle, additionStyle])
      setIsHovered(!additionStyle ? false : true);
    }
    
  };

  const hoverProps = context.useHoverContext ? {} : {
    onMouseEnter: () => {
      setStyles(hoverStyle);
    },
    onMouseLeave: () => {
      setStyles(null);
    }
  }

  useEffect(() => {
    if (context.isHovered) {
      setStyles(hoverStyle);
    } else {
      setStyles(null);
    }
  }, [context.isHovered])

  return [hoverProps, combineStyle, isHovered];
}

