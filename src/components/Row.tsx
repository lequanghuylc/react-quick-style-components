import React from 'react';
import { useResponsiveStyle, IResponsiveLayoutProps, getResponsiveLayout } from './hooks';
import Col, { IColProps } from './Col';
import Responsive from './Responsive';

export interface IRowProps extends IColProps, IResponsiveLayoutProps {
  onRef?(ref: any): void,
  onLayout?(event: any): any,
  stretch?: boolean,
  hasWrapper?: boolean,
  children?: any,
  [key: string]: any,
}

const Row = (props : IRowProps) => {
  const { stretch, children, onRef, hasWrapper } = props;
  const responsiveLayout = getResponsiveLayout(props);
  const responsiveRule = useResponsiveStyle(responsiveLayout);

  return (
    <Col
      flexDirection="row"
      alignItems={stretch ? "stretch" : "center"}
      {...props}
      flexWrap={!!responsiveRule && responsiveRule.includes('%') ? 'wrap' : undefined}
      ref={onRef}
    >
      {Boolean(!responsiveLayout || children === undefined) ? children : (
        <Responsive hasWrapper={hasWrapper} rules={responsiveLayout}>
          {children}
        </Responsive>
      )}
    </Col>
  );
};

export default Row;