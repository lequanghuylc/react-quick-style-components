import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  useWindowDimensions,
  Dimensions,
} from 'react-native';

import Col from './Col';

export interface Props {
  rules?: {
    sm?: string,
    md?: string,
    lg?: string,
    xl?: string,
    [breakpoint: string]: string,
  },
  onChange(ruleString : string): void,
  hasWrapper?: boolean,
  children: any,
}

export const minWidthBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

/*
responsive usage
  <Row responsive={{ md: '1:.' }} />
    -> every child will have flex 1 in md breakpoint

  <Row responsive={{ md: '1:2' }} />
    -> only render two first child, with flex 1 and flex 2 in md breakpoint

  <Row responsive={{ md: '1:2', sm: '100%' }} />
    -> same with the above, and in sm breakpoint all will have 100% width, and flex wrap style
*/

export const ResponsiveContext = createContext({
  width: Dimensions.get('window').width,
  useCustomViewport: false,
});

export const ResponsiveViewport = ({ width, children }) => {
  return (
    <ResponsiveContext.Provider value={{ width, useCustomViewport: true }}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export const getResponsiveRule = (viewportWidth, rules) => {
    // console.log('viewportWidth', viewportWidth);
    const minWidth = ['xl', 'lg', 'md', 'sm', 'xs'];
    let currentBreakpoint = 'xs';
    for (let i=0; i<= minWidth.length; i++) {
      const breakpointCode = minWidth[i];
      if (viewportWidth > minWidthBreakpoints[breakpointCode]) {
        currentBreakpoint = breakpointCode;
        if (!rules[breakpointCode]) continue;
        break;
      }
    }
    // console.log('currentBreakpoint', currentBreakpoint);
    const responsiveRule = rules[currentBreakpoint];
    return responsiveRule;
}

const Responsive = (props : Props) => {
  const [uniqueId] = useState('responsive_id_' + Math.random());
  const { width } = useWindowDimensions();

  const { children, rules, onChange } = props;
  if (!rules) return children;

  const customViewport = useContext(ResponsiveContext);

  // const getResponsiveRule = () => {
  //   const viewportWidth = customViewport.useCustomViewport ? customViewport.width : width;
  //   // console.log('viewportWidth', viewportWidth);
  //   const minWidth = ['xl', 'lg', 'md', 'sm', 'xs'];
  //   let currentBreakpoint = 'xs';
  //   for (let i=0; i<= minWidth.length; i++) {
  //     const breakpointCode = minWidth[i];
  //     if (viewportWidth > minWidthBreakpoints[breakpointCode]) {
  //       currentBreakpoint = breakpointCode;
  //       if (!rules[breakpointCode]) continue;
  //       break;
  //     }
  //   }
  //   // console.log('currentBreakpoint', currentBreakpoint);
  //   const responsiveRule = rules[currentBreakpoint];
  //   return responsiveRule;
  // }
  const viewportWidth = customViewport.useCustomViewport ? customViewport.width : width;
  const responsiveRule = getResponsiveRule(viewportWidth, rules);
  if (!responsiveRule) return children;
  useEffect(() => {
    onChange(responsiveRule);
  }, [width, customViewport.width]);

  const childrenArray = React.Children.toArray(props.hasWrapper ? children?.props?.children : children);
  
  // console.log('childrenArray', props.hasWrapper, childrenArray, children);
  switch(true) {
    case responsiveRule.includes('%'):
      const percent = Number(responsiveRule.replace('%', ''));
      if (isNaN(percent)) return children;
      return childrenArray.map((child, childIndex) => (
        <Col width={responsiveRule} key={'responsive-r1-'+childIndex+uniqueId}>{child}</Col>
      ));
      // else return React.Children.map(children, child => (
      //   React.cloneElement()

    // ));
    break;
    case (responsiveRule === '1:.'):
      // return React.Children.map(children, child => (
      //   React.cloneElement(<Col flex1>{child}</Col>)
      // ));
      return childrenArray.map((child, childIndex) => (
        <Col flex1 key={'responsive-r2-'+childIndex+uniqueId}>{child}</Col>
      ))
    break;
    case (responsiveRule.includes(':')):
      const flexs = responsiveRule.split(':').map(val => Number(val));
      if (flexs.filter(val => isNaN(val)).length > 0) {
        throw new Error('invalid responsive rule');
      }
      // const childrenArray = React.Children.toArray(children);
      return flexs.map((val, i) => (
        <Col flex={val} key={"responsive-r3-"+i+uniqueId}>{childrenArray[i]}</Col>
      ));
    break;
    default: return children;
  }
};

export default Responsive;
