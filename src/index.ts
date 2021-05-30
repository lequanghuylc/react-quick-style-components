import { globalStyleInstance, IObjectStyle, IStyleHooks } from './utils/globalProps';
import TextComponent, { TDefaultFont } from './components/Text';

export { default as Button } from './components/Button';
export { default as Col } from './components/Col';
export { default as Row } from './components/Row';
export { default as Text } from './components/Text';
export { default as Scroll } from './components/Scroll';
export { default as Input } from './components/Input';
export { default as Img } from './components/Img';
export { default as Parser } from './utils/parser/ParserReactComponent';
export { ResponsiveViewport, useResponsiveStyle, useDynamicResponsiveValue } from './components/hooks/useResponsiveStyle';
export { default as CQuery,  withCQuery, ButtonQuery, TextQuery } from './utils/CQuery';
export { usePropsStyle } from './components/hooks';

const setMainColor = (mainColor : string) => {
  globalStyleInstance.setMainColor(mainColor);
}

const setAdditionStyles = (styles : IObjectStyle) => {
  globalStyleInstance.setAdditionStyles(styles);
}

const setFontStyle = (fontObject : TDefaultFont) => {
  TextComponent.setFontStyle(fontObject);
}

const setStyleHooks = (hooks : IStyleHooks) => {
  globalStyleInstance.setStyleHooks(hooks);
}

export const initQuickStyle = {
  
  setMainColor,
  setAdditionStyles,
  setFontStyle,
  setStyleHooks,

};