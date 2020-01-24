import { globalStyleInstance } from './utils/globalProps';
import TextComponent from './components/Text';

export { _s, styleSet, propsToStyle } from './utils/globalProps';
export { commonStyle } from './utils/commonStyle';

export { default as Text } from './components/Text';
export { default as Button } from './components/Button';
export { default as Col } from './components/Col';
export { default as Row } from './components/Row';

type FontObject = {
  family: {
    regular: string,
    bold: string,
    semiBold: string,
  },
  color: string,
};


export const initQuickStyle = {
  /**
   * @param mainColor  Use for quick prop like: colorMain, bgMain.
   */
  setMainColor: (mainColor: string) => {
    globalStyleInstance.setMainColor(mainColor);
  },
  /**
   * @param styles  Use for quick style, e.g: if you pass Style.create({ white: { color: 'white' } }). You will be able to use <Text white>Hello World!</Text>
   */
  setAdditionStyles: (styles) => {
    globalStyleInstance.setAdditionStyles(styles);
  },
  /**
   * @param fontObject  Use for default text style
   */
  setFontStyle: (fontObject : FontObject) => {
    TextComponent.setFontFamily(fontObject);
  }
};