import React, { Component } from 'react';
import {
  Text as TextDefault,
} from 'react-native';

import { propsToStyle } from '../utils/globalProps';

export interface DefaultFontType {
  family: {
    regular: string,
    bold: string,
    semiBold: string,
    extraBold: string,
    black: string,
    light: string,
    medium: string,
  },
  color: string,
}

let defaultFont = {
  family: {
    regular: undefined,
    bold: undefined,
    semiBold: undefined,
    extraBold: undefined,
    black: undefined,
    light: undefined,
    medium: undefined,
  },
  color: undefined,
};

export interface Props {
  onRef?(): void,
  bold?: Boolean,
  semiBold?: Boolean,
  extraBold?: Boolean,
  black?: Boolean,
  light?: Boolean,
  medium?: Boolean,
  [key: string]: any,
}

export default class Text extends Component<Props> {

  static setFontFamily(fontFamily: DefaultFontType) {
    defaultFont = fontFamily;
  }

  render() {
    const { style, bold, semiBold, extraBold, black, light, medium } = this.props;
    let fontFamily;
    switch(true) {
      case (light): fontFamily = defaultFont.family.light; break;
      case (medium): fontFamily = defaultFont.family.medium; break;
      case (semiBold): fontFamily = defaultFont.family.semiBold; break;
      case (bold): fontFamily = defaultFont.family.bold; break;
      case (extraBold): fontFamily = defaultFont.family.extraBold; break;
      case (black): fontFamily = defaultFont.family.black; break;
      default: fontFamily = defaultFont.family.regular;
    }
    const combinedStyle = [
      {
        fontFamily,
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

