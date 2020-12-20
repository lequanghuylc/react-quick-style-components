import { commonStyle } from './commonStyle';

class GlobalStyle {

  MAIN_COLOR = '#000000';

  additionStyles = {};

  styleHooks : any = {};

  setMainColor(color) {
    this.MAIN_COLOR = color;
  }

  setAdditionStyles = (styles) => {
    if (typeof styles !== 'object') throw new Error('setAdditionStyles must use object as object of styles');
    this.additionStyles = styles;
  }

  setStyleHooks = (hooks) => {
    this.styleHooks = hooks;
  }

}

export const globalStyleInstance = new GlobalStyle();

const styleProperties = ['alignContent', 'alignItems', 'alignSelf', 'aspectRatio', 'backfaceVisibility', 'backgroundColor', 'borderBottomColor', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomWidth', 'borderColor', 'borderLeftColor', 'borderLeftWidth', 'borderRadius', 'borderRightColor', 'borderRightWidth', 'borderStyle', 'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopWidth', 'borderWidth', 'bottom', 'color', 'decomposedMatrix', 'direction', 'display', 'elevation', 'flex', 'flexBasis', 'flexDirection', 'flexGrow', 'flexShrink', 'flexWrap', 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'height', 'includeFontPadding', 'justifyContent', 'left', 'letterSpacing', 'lineHeight', 'margin', 'marginBottom', 'marginHorizontal', 'marginLeft', 'marginRight', 'marginTop', 'marginVertical', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'opacity', 'overflow', 'overlayColor', 'padding', 'paddingBottom', 'paddingHorizontal', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingVertical', 'position', 'right', 'rotation', 'scaleX', 'scaleY', 'shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius', 'textAlign', 'textAlignVertical', 'textDecorationColor', 'textDecorationLine', 'textDecorationStyle', 'textShadowColor', 'textShadowOffset', 'textShadowRadius', 'tintColor', 'top', 'transform', 'transformMatrix', 'translateX', 'translateY', 'width', 'writingDirection', 'zIndex'];

const dynamicStyle = () => ({
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

const commonStyleSheet = () => ({
  ...dynamicStyle(),
  ...commonStyle,
  ...globalStyleInstance.additionStyles,
})

export const styleSet = (name) => {
  if (!!dynamicStyle()[name]) return dynamicStyle()[name];
  if (!!commonStyle[name]) return commonStyle[name];
  return {};
};

export const _s = styleSet; // for short

const hasNumber = (myString) => {
  return /\d/.test(myString);
};

const styleHooks = (key, value) => {
  if(globalStyleInstance.styleHooks[key]) {
    return globalStyleInstance.styleHooks[key](value);
  }
  return value;
}

export const propsToStyle = (props = {}) => {
  let style = {};
  for (let key in props) {
    if (styleProperties.indexOf(key) !== -1) style[key] = styleHooks(key, props[key]);
    else if (hasNumber(key)) { // make prop style with number, flex1 -> flex: 1
      let matchArr = key.match(/\d+/g);
      if (matchArr != null && matchArr.length === 1 && key.indexOf(matchArr[0]) === key.length - matchArr[0].length) {
        const numberValue = Number(matchArr[0]);
        const propertyValue = key.substring(0, key.indexOf(matchArr[0]));
        const styleObject = { [propertyValue]: styleHooks(propertyValue, numberValue) };
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
