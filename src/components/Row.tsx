import React, { Component } from 'react';

import { Props as ButtonProps } from './Button';
import { Props as ColProps } from './Col';

import Col from './Col';
import Responsive from './Responsive';

export interface Props {
  onRef?(ref: any): void,
  onLayout?(event: any): any,
  stretch?: boolean,
  responsive?: {
    sm?: string,
    md?: string,
    lg?: string,
    xl?: string,
    [breakpoint: string]: string,
  },
  hasWrapper?: boolean,
  [key: string]: any,
}

export default class Row extends Component<Props & ColProps & ButtonProps> {

  state = {
    responsiveRule: '',
  }

  render() {
    const { stretch, responsive, children, onRef, id, hasWrapper } = this.props;
    const { responsiveRule } = this.state;
    
    return (
      <Col
        flexDirection="row"
        alignItems={stretch ? "stretch" : "center"}
        {...this.props}
        flexWrap={responsiveRule.includes('%') ? 'wrap' : undefined}
        ref={onRef}
      >
        {Boolean(!responsive || children === undefined) ? children : (
          <Responsive hasWrapper={hasWrapper} rules={responsive} onChange={rule => this.setState({ responsiveRule: rule })}>
            {children}
          </Responsive>
        )}
      </Col>
    );
  }
}