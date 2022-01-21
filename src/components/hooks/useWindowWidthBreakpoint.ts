import { Dimensions, Platform } from 'react-native';
import { useEffect, useState } from 'react';

export interface IResponsiveRule<T> {
  xs?: T | undefined,
  sm?: T | undefined,
  md?: T | undefined,
  lg?: T | undefined,
  xl?: T | undefined,
  xxl?: T | undefined,
  xxxl?: T | undefined,
  [breakpoint: string]: T | undefined,
}

export interface IGetResponsiveRule<T> {
  (viewportWidth : number, rules : IResponsiveRule<T>): T
}

export const minWidthBreakpoints : IResponsiveRule<number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1380,
  xxxl: 1560,
};

export const getResponsiveRule : IGetResponsiveRule<any> = (viewportWidth, rules) => {
    
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
};

export const useWindowWidthBreakpoint = () => {

  const getBreakpoint = () => {
    return getResponsiveRule(Dimensions.get('window').width, {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      xxl: 'xxl',
      xxxl: 'xxxl',
    });
  }

  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'>(getBreakpoint());

  const updateBreakpoint = () => {
    const newBreakpoint = getBreakpoint();
    if (breakpoint !== newBreakpoint) {
      setBreakpoint(newBreakpoint);
    }
  };

  useEffect(() => {
    Dimensions.addEventListener('change', updateBreakpoint);
    return () => {
      Dimensions.removeEventListener('change', updateBreakpoint);
    };
  }, []);
  return breakpoint;
};
