import React, { Component } from 'react';

import {
  Dimensions
} from 'react-native';

import Col from './Col';
import Responsive from './Responsive';

export interface Props {
  onRef?(): void,
  stretch?: boolean,
  responsive?: {
    sm?: string,
    md?: string,
    lg?: string,
    xl?: string,
    [breakpoint: string]: string,
  },
  [key: string]: any,
}

export default class Row extends Component<Props> {

  state = {
    responsiveRule: '',
  }

  render() {
    const { stretch, responsive, children } = this.props;
    const { responsiveRule } = this.state;
    
    return (
      <Col
        flexDirection="row"
        alignItems={stretch ? "stretch" : "center"}
        {...this.props}
        flexWrap={responsiveRule.includes('%') ? 'wrap' : undefined}
        ref={this.props.onRef}
      >
        <Responsive rules={responsive} onChange={rule => this.setState({ responsiveRule: rule })}>
          {children}
        </Responsive>
      </Col>
    );
  }
}