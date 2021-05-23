import React, { useState } from 'react';
import { useResponsiveStyle } from './hooks/useResponsiveStyle';
import Col from './Col';

interface IResponsiveProps {
  rules?: {
    xs?: string | undefined,
    sm?: string | undefined,
    md?: string | undefined,
    lg?: string | undefined,
    xl?: string | undefined,
    [breakpoint: string]: string | undefined,
  },
  hasWrapper?: boolean,
  children: any,
}

const Responsive = (props : IResponsiveProps) => {
  const [uniqueId] = useState('responsive_id_' + Math.random());
  const { children, rules } = props;
  if (!rules) return children;

  const responsiveRule : string = useResponsiveStyle(rules);
  const childrenArray = React.Children.toArray(props.hasWrapper ? children?.props?.children : children);

  switch(true) {
    case typeof responsiveRule !== 'string':
      return children;
    break;
    case responsiveRule.includes('%'):
      const percent = Number(responsiveRule.replace('%', ''));
      if (isNaN(percent)) return children;
      return childrenArray.map((child, childIndex) => (
        <Col width={responsiveRule} key={'responsive-r1-'+childIndex+uniqueId}>{child}</Col>
      ));
    break;
    case (responsiveRule === '1:.'):
      return childrenArray.map((child, childIndex) => (
        <Col flex1 key={'responsive-r2-'+childIndex+uniqueId}>{child}</Col>
      ))
    break;
    case (responsiveRule.includes(':')):
      const flexs = responsiveRule.split(':').map(val => val);
      if (flexs.filter(val => isNaN(Number(val)) && val !== 'any' && !val.includes('px')).length > 0) {
        throw new Error('invalid responsive rule');
      }
      return flexs.map((val, i) => (
        <Col flex={val === 'any' || val.includes('px') ? undefined : val} width={val.includes('px') ? Number(val.replace('px', '')) : undefined} key={"responsive-r3-"+i+uniqueId}>{childrenArray[i]}</Col>
      ));
    break;
    default: return children;
  }
}

export default Responsive;