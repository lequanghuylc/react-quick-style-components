import React, { RefCallback, useRef } from 'react';
import {
  Text as TextDefault,
  TextStyle,
} from 'react-native';

import { usePropsStyle, useHoverStyle, useResponsiveStyle } from './hooks';

type TReactComponent = any; // TODO: use proper type

export interface TDefaultFont {
  fontFamily: string | undefined,
  color: string | undefined,
};

export interface ITextProps extends TextStyle {
  onRef?(ref: any): void,
  center?: boolean,
  text?: string,
  onHoverStyle?: any,
  useNativeStyleProps?: boolean,
  onResponsiveStyle?: {
    xs?: any,
    sm?: any,
    md?: any,
    lg?: any,
    xl?: any,
    [breakpoint: string]: any,
  },
  [key: string]: any,
}

interface IText {
  (props: ITextProps): TReactComponent,
  defaultFont: TDefaultFont,
  setFontStyle({ fontFamily, color } : TDefaultFont): void,
}

const Text : IText = (props) => {
  const { text, children, onHoverStyle, onResponsiveStyle } = props;
  const style = usePropsStyle(props);
  const compRef = useRef(null);
  const onRef : RefCallback<any> = (ref) => {
    compRef.current = ref;
    if (props.onRef) props.onRef(ref);
  }
  const useNativeStyleProps = props.useNativeStyleProps === false ? false : true; // default is true
  const [hoverProps, combinedStyle] = useHoverStyle(onHoverStyle, useNativeStyleProps, style, compRef);
  const responsiveStyle = useResponsiveStyle(onResponsiveStyle);

  return (
    <TextDefault
      ref={onRef}
      {...hoverProps}
      {...props}
      style={[Text.defaultFont, combinedStyle, responsiveStyle]}
    >
      {text || children || null}
    </TextDefault>
  );
};

Text.defaultFont = {
  fontFamily: undefined,
  color: undefined,
};

Text.setFontStyle = ({ fontFamily, color }) => {
  Text.defaultFont.fontFamily = fontFamily;
  Text.defaultFont.color = color;
};

export default Text;
