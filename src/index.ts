import { globalStyleInstance } from './utils/globalProps';
import TextComponent from './components/Text';
import { DefaultFontType } from './components/Text';

export { _s, styleSet, propsToStyle } from './utils/globalProps';
export { commonStyle } from './utils/commonStyle';

export { default as Text } from './components/Text';
export { default as Button } from './components/Button';
export { default as Col } from './components/Col';
export { default as Row } from './components/Row';
export { default as Input } from './components/Input';
export { default as Scroll } from './components/Scroll';
export { default as Img } from './components/Img';

const setMainColor = (mainColor : string) => {
  globalStyleInstance.setMainColor(mainColor);
}

const setAdditionStyles = (styles) => {
  globalStyleInstance.setAdditionStyles(styles);
}

const setFontStyle = (fontObject : DefaultFontType) => {
  TextComponent.setFontFamily(fontObject);
}

const setStyleHooks = (hooks) => {
  globalStyleInstance.setStyleHooks(hooks);
}

export const initQuickStyle = {
  
  setMainColor,
  setAdditionStyles,
  setFontStyle,
  setStyleHooks,

};