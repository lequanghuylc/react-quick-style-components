import React, { Component } from 'react';

import Col from './Col';

export interface Props {
  onRef?(): void,
  [key: string]: any,
}

export default class Row extends Component<Props> {

  render() {
    return (
      <Col
        flexDirection="row"
        alignItems="center"
        {...this.props}
        ref={this.props.onRef}
      />
    )
  }
}