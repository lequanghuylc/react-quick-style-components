import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Dimensions,
  TextStyle,
  ViewStyle,
  ImageStyle,
  useWindowDimensions,
} from 'react-native';

type TOneStyle = TextStyle & ViewStyle & ImageStyle & any;

export interface IResponsiveLayoutProps {
  responsiveLayout?: {
    xs?: string | undefined,
    sm?: string | undefined,
    md?: string | undefined,
    lg?: string | undefined,
    xl?: string | undefined,
    [breakpoint: string]: string | undefined,
  },
  xs?: string | undefined,
  sm?: string | undefined,
  md?: string | undefined,
  lg?: string | undefined,
  xl?: string | undefined,
}

export const getResponsiveLayout = ( props : IResponsiveLayoutProps ) => {
  const { responsiveLayout, xs, sm, md, lg, xl } = props;
  if (!!responsiveLayout) return responsiveLayout;
  const shortObj = { xs, sm, md, lg, xl };
  if (typeof shortObj.xs === 'undefined') delete shortObj.xs;
  if (typeof shortObj.sm  === 'undefined') delete shortObj.sm;
  if (typeof shortObj.md  === 'undefined') delete shortObj.md;
  if (typeof shortObj.lg  === 'undefined') delete shortObj.lg;
  if (typeof shortObj.xl  === 'undefined') delete shortObj.xl;
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

interface IResponsiveRule<T> {
  xs?: T | undefined,
  sm?: T | undefined,
  md?: T | undefined,
  lg?: T | undefined,
  xl?: T | undefined,
  [breakpoint: string]: T | undefined,
}

interface GetResponsiveRule<T> {
  (viewportWidth : number, rules : IResponsiveRule<T>): T
}

export const getResponsiveRule : GetResponsiveRule<any> = (viewportWidth, rules) => {
    const minWidthBreakpoints : IResponsiveRule<number> = {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    };
    for (let customBreakpoint in rules) {
      if (typeof minWidthBreakpoints[customBreakpoint] === 'number') continue;
      if (!customBreakpoint.includes('px')) continue; // skip invalid breakpoint
      const breakpointWidth = +customBreakpoint.replace('px', '');
      if (isNaN(breakpointWidth)) continue; // skip invalid breakpoint
      minWidthBreakpoints[customBreakpoint] = breakpointWidth;
    }

    const breakpoints = Object.keys(minWidthBreakpoints).sort((a, b) => {
      const widthA = minWidthBreakpoints[a];
      if (typeof widthA !== 'number') return 1;
      const widthB = minWidthBreakpoints[b];
      if (typeof widthB !== 'number') return 1;
      return widthA > widthB ? -1 : 1;
    });

    let currentBreakpoint = 'xs';
    for (let i=0; i<= breakpoints.length; i++) {
      const breakpointCode = breakpoints[i];
      const compareWidth = minWidthBreakpoints[breakpointCode];
      if (typeof compareWidth !== 'number') continue;
      if (viewportWidth >= compareWidth) {
        currentBreakpoint = breakpointCode;
        if (!rules[breakpointCode]) continue;
        break;
      }
    }
    const responsiveRule = rules[currentBreakpoint];
    return responsiveRule;
}

export const useResponsiveStyle = (onResponsiveStyle : TOneStyle | string) : TOneStyle | string => {
  if (!onResponsiveStyle) return undefined;
  const { width } = useWindowDimensions();
  const { width : customWidth, useCustomViewport } = useContext(ResponsiveContext);
  const viewportWidth = useCustomViewport ? customWidth : width;
  const responsiveRule : TOneStyle = getResponsiveRule(viewportWidth, onResponsiveStyle);
  return responsiveRule;
};

export function useResponsiveData<T>(rules : IResponsiveRule<T>) : T | undefined {
  if (!rules) return undefined;
  const { width } = useWindowDimensions();
  const { width : customWidth, useCustomViewport } = useContext(ResponsiveContext);
  const viewportWidth = useCustomViewport ? customWidth : width;
  const responsiveRule = getResponsiveRule(viewportWidth, rules);
  return responsiveRule;
};