import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Dimensions,
  TextStyle,
  ViewStyle,
  ImageStyle,
  useWindowDimensions,
} from 'react-native';
import { IResponsiveRule, TOneBreakpoint, useWindowWidthBreakpoint } from './useWindowWidthBreakpoint';

type TOneStyle = TextStyle & ViewStyle & ImageStyle & any;

export interface IResponsiveLayoutProps {
  responsiveLayout?: {
    xs?: string | undefined,
    sm?: string | undefined,
    md?: string | undefined,
    lg?: string | undefined,
    xl?: string | undefined,
    xxl?: string | undefined,
    xxxl?: string | undefined,
    [breakpoint: string]: string | undefined,
  },
  xs?: string | undefined,
  sm?: string | undefined,
  md?: string | undefined,
  lg?: string | undefined,
  xl?: string | undefined,
  xxl?: string | undefined,
  xxxl?: string | undefined,
}

export const getResponsiveLayout = ( props : IResponsiveLayoutProps ) => {
  const { responsiveLayout, xs, sm, md, lg, xl, xxl, xxxl } = props;
  if (!!responsiveLayout) return responsiveLayout;
  const shortObj = { xs, sm, md, lg, xl, xxl, xxxl };
  if (typeof shortObj.xs === 'undefined') delete shortObj.xs;
  if (typeof shortObj.sm  === 'undefined') delete shortObj.sm;
  if (typeof shortObj.md  === 'undefined') delete shortObj.md;
  if (typeof shortObj.lg  === 'undefined') delete shortObj.lg;
  if (typeof shortObj.xl  === 'undefined') delete shortObj.xl;
  if (typeof shortObj.xxl  === 'undefined') delete shortObj.xxl;
  if (typeof shortObj.xxxl  === 'undefined') delete shortObj.xxxl;
  return Object.keys(shortObj).length > 0 ? shortObj : undefined;
}

export const ResponsiveContext = createContext({
  width: Dimensions.get('window').width,
  useCustomViewport: false,
});

interface IResponsiveViewportProps {
  width: number,
  children: React.ReactNode,
}

export const ResponsiveViewport = ({ width, children } : IResponsiveViewportProps)  => {
  return (
    <ResponsiveContext.Provider value={{ width, useCustomViewport: true }}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export const useDynamicResponsiveValue = () => {
  const order = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
  // const breakpoint = useResponsiveStyle({
  //   xs: 'xs',
  //   sm: 'sm',
  //   md: 'md',
  //   lg: 'lg',
  //   xl: 'xl',
  //   xxl: 'xxl',
  //   xxxl: 'xxxl',
  // });
  const breakpoint = useWindowWidthBreakpoint();
  return (dynamicObj : IResponsiveRule<any>) => {
    // if the breakpoint value is defined, use that value
    // if not, use value of breakpoint right before
    // example: breakpoint = 'md';  ({ xs: 100, lg: 200 }) =>  100 (use xs value)
    const orderIndex = order.indexOf(breakpoint);
    for (let i=orderIndex; i>=0; i--) {
      // even the value is undefine, if the property exists in dynamicObj, use the value
      if (order[i] in dynamicObj) {
        return dynamicObj[order[i]];
      }
    }
    return undefined;
  };
};

const bpOrder = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
const findNearestLowerBreakpointValue = (breakpoint : string, rules : TOneStyle | string ) => {
  if (rules[breakpoint]) return rules[breakpoint];
  const index = bpOrder.indexOf(breakpoint);
  let i = index;
  while (!rules[bpOrder[i]]) {
    if (i === 0) return undefined;
    i -= 1;
  }
  return rules[bpOrder[i]];
}

export const useResponsiveStyle = (onResponsiveStyle : TOneStyle | string) : TOneStyle | string => {
  if (!onResponsiveStyle) return undefined;
  // const { width } = useWindowDimensions();
  // const { width : customWidth, useCustomViewport } = useContext(ResponsiveContext);
  // const viewportWidth = useCustomViewport ? customWidth : width;
  // const responsiveRule : TOneStyle = getResponsiveRule(viewportWidth, onResponsiveStyle);
  // return responsiveRule;
  const breakpoint = useWindowWidthBreakpoint(Object.keys(onResponsiveStyle) as Array<TOneBreakpoint>);
  return findNearestLowerBreakpointValue(breakpoint, onResponsiveStyle);
};

export function useResponsiveData<T>(rules : IResponsiveRule<T>) : T | undefined {
  if (!rules) return undefined;
  // const { width } = useWindowDimensions();
  // const { width : customWidth, useCustomViewport } = useContext(ResponsiveContext);
  // const viewportWidth = useCustomViewport ? customWidth : width;
  // const responsiveRule = getResponsiveRule(viewportWidth, rules);
  // return responsiveRule;

  const breakpoint = useWindowWidthBreakpoint(Object.keys(rules) as Array<TOneBreakpoint>);
  return findNearestLowerBreakpointValue(breakpoint, rules);
};