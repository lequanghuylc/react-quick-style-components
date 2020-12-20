import React, { Component } from 'react';
import {
  Text as TextDefault,
} from 'react-native';

import { propsToStyle } from '../utils/globalProps';

export interface DefaultFontType {
  fontFamily: string,
  color: string,
}

export let defaultFont = {
  fontFamily: undefined,
  color: undefined,
};

export interface Props {
  onRef?(): void,
  center?: boolean,
  [key: string]: any,
}

export default class Text extends Component<Props> {

  static setFontFamily(fontFamily: DefaultFontType) {
    defaultFont = fontFamily;
  }

  render() {
    const { style, center } = this.props;
    const combinedStyle = [
      defaultFont,
      center ? { textAlign: 'center' } : {},
      propsToStyle(this.props),
      style,
    ];
    return (
      <TextDefault
        {...this.props}
        ref={this.props.onRef}
        style={combinedStyle}
      />
    )
  }
}

