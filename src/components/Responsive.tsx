import React, { useEffect } from 'react';
import {
  useWindowDimensions,
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

const Responsive = (props : Props) => {
  const { width } = useWindowDimensions();
  
  const { children, rules, onChange } = props;
  if (!rules) return children;

  const getResponsiveRule = () => {
    const minWidth = ['xl', 'lg', 'md', 'sm', 'xs'];
    let currentBreakpoint = 'xs';
    for (let i=0; i<= minWidth.length; i++) {
      const breakpointCode = minWidth[i];
      if (width > minWidthBreakpoints[breakpointCode]) {
        currentBreakpoint = breakpointCode;
        if (!rules[breakpointCode]) continue;
        break;
      }
    }
    const responsiveRule = rules[currentBreakpoint];
    return responsiveRule;
  }
  const responsiveRule = getResponsiveRule();
  if (!responsiveRule) return children;

  useEffect(() => {
    onChange(responsiveRule);
  }, [width]);

  switch(true) {
    case responsiveRule.includes('%'):
      const percent = Number(responsiveRule.replace('%', ''));
      if (isNaN(percent)) return children;
      else return React.Children.map(children, child => (
        React.cloneElement(<Col width={responsiveRule}>{child}</Col>)
    ));
    break;
    case (responsiveRule === '1:.'):
      return React.Children.map(children, child => (
        React.cloneElement(<Col flex1>{child}</Col>)
      ));
    break;
    case (responsiveRule.includes(':')):
      const flexs = responsiveRule.split(':').map(val => Number(val));
      if (flexs.filter(val => isNaN(val)).length > 0) {
        throw new Error('invalid responsive rule');
      }
      return flexs.map((val, i) => (
        <Col flex={val} key={"res-"+Math.random()}>{children[i]}</Col>
      ));
    break;
    default: return children;
  }


};

export default Responsive;
