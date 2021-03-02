import { useState, useEffect } from 'react';
import {
  TextStyle, ViewStyle,ImageStyle,
} from 'react-native';
import { commonStyle } from './commonStyle';

const styleProperties = ['alignContent', 'alignItems', 'alignSelf', 'aspectRatio', 'backfaceVisibility', 'backgroundColor', 'borderBottomColor', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomWidth', 'borderColor', 'borderLeftColor', 'borderLeftWidth', 'borderRadius', 'borderRightColor', 'borderRightWidth', 'borderStyle', 'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopWidth', 'borderWidth', 'bottom', 'color', 'decomposedMatrix', 'direction', 'display', 'elevation', 'flex', 'flexBasis', 'flexDirection', 'flexGrow', 'flexShrink', 'flexWrap', 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'height', 'includeFontPadding', 'justifyContent', 'left', 'letterSpacing', 'lineHeight', 'margin', 'marginBottom', 'marginHorizontal', 'marginLeft', 'marginRight', 'marginTop', 'marginVertical', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'opacity', 'overflow', 'overlayColor', 'padding', 'paddingBottom', 'paddingHorizontal', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingVertical', 'position', 'right', 'rotation', 'scaleX', 'scaleY', 'shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius', 'textAlign', 'textAlignVertical', 'textDecorationColor', 'textDecorationLine', 'textDecorationStyle', 'textShadowColor', 'textShadowOffset', 'textShadowRadius', 'tintColor', 'top', 'transform', 'transformMatrix', 'translateX', 'translateY', 'width', 'writingDirection', 'zIndex'] as const;

type TStyleProperty = typeof styleProperties[number];

type TOneStyle = TextStyle & ViewStyle & ImageStyle & any;
export interface IObjectStyle {
  [styleName : string]: TOneStyle,
}

type TStyleHooks = {
  [key in TStyleProperty]?: <T>(inputedValue : T) => T
}

export interface IStyleHooks extends TStyleHooks {}

class GlobalStyle {

  MAIN_COLOR : string = '#000000';

  additionStyles : IObjectStyle = {};

  styleHooks : IStyleHooks = {};

  setMainColor(color : string) : void {
    this.MAIN_COLOR = color;
  }

  setAdditionStyles = (styles : IObjectStyle) : void => {
    if (typeof styles !== 'object') throw new Error('setAdditionStyles must use object as object of styles');
    this.additionStyles = styles;
  }

  setStyleHooks = (hooks : IStyleHooks) : void => {
    this.styleHooks = hooks;
  }

}

export const globalStyleInstance = new GlobalStyle();



const dynamicStyle = () : IObjectStyle => ({
  bgMain: {
    backgroundColor: globalStyleInstance.MAIN_COLOR,
  },
  colorMain: {
    color: globalStyleInstance.MAIN_COLOR,
  },
  borderColorMain: {
    borderColor: globalStyleInstance.MAIN_COLOR,
  },
});

const commonStyleSheet = () : IObjectStyle => ({
  ...dynamicStyle(),
  ...commonStyle,
  ...globalStyleInstance.additionStyles,
})

export const styleSet = (name : string) : TOneStyle => {
  if (!!dynamicStyle()[name]) return dynamicStyle()[name];
  if (!!commonStyle[name]) return commonStyle[name];
  return {};
};

export const _s = styleSet; // for short

const hasNumber = (myString : string) : boolean => {
  return /\d/.test(myString);
};

const styleHooks = <T>(key : TStyleProperty, value : T) : T => {
  const hookFunction = globalStyleInstance.styleHooks[key];
  if(hookFunction) return hookFunction(value);
  return value;
}

type TPropStyle = {
  [key in TStyleProperty]? : unknown
}
interface IProps extends TPropStyle {
  [key : string]: unknown,
}

export const propsToStyle = (props : IProps = {}) => {
  let style : TOneStyle = {};
  for (let key in props) {
    if (styleProperties.includes(key as TStyleProperty)) style[key] = styleHooks(key as TStyleProperty, props[key]);
    else if (hasNumber(key)) { // make prop style with number, flex1 -> flex: 1
      let matchArr = key.match(/\d+/g);
      if (matchArr != null && matchArr.length === 1 && key.indexOf(matchArr[0]) === key.length - matchArr[0].length) {
        const numberValue = Number(matchArr[0]);
        const propertyValue = key.substring(0, key.indexOf(matchArr[0]));
        const styleObject = { [propertyValue]: styleHooks(propertyValue  as TStyleProperty, numberValue) };
        style = (<any>Object).assign(style, styleObject);
      }
    }
  }
  for (let key in commonStyleSheet()) {
    if (!!props[key]) {
      style = (<any>Object).assign(style, commonStyleSheet()[key]);
    }
  }
  return style;
};