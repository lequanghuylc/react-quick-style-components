import React, { Component } from 'react';
import {
  Text as TextDefault,
  StyleSheet,
} from 'react-native';

import { propsToStyle } from '../utils/globalProps';

interface DefaultFontType {
  family: { regular: string, bold: string, semiBold: string },
  color: string,
}

let defaultFont = {
  family: { regular: undefined, bold: undefined, semiBold: undefined },
  color: undefined,
};

export interface Props {
  onRef?(): void,
  bold?: boolean,
  semiBold?: boolean,
  [key: string]: any,
}

export default class Text extends Component<Props> {

  static setFontFamily(fontFamily: DefaultFontType) {
    defaultFont = fontFamily;
  }

  render() {
    const { style, bold, semiBold } = this.props;
    const combinedStyle = [
      {
        fontFamily: !!bold ? defaultFont.family.bold : !!semiBold ? defaultFont.family.semiBold : defaultFont.family.regular,
        color: defaultFont.color,
      },
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

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'SF Pro Text',
  },
});
