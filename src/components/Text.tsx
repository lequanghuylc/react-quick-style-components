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
  onRef?(ref: any): void,
  center?: boolean,
  text?: string,
  onHoverStyle?: any,
  useNativeStyleProps?: boolean,
  [key: string]: any,
}

interface TextInstanceManager {
  [id: string]: {
    getValue(): string,
    setValue(newValue: string): void,
    text: any,
  },
}

const textInstances : TextInstanceManager = {};

export default class Text extends Component<Props> {

  static setFontFamily(fontFamily: DefaultFontType) {
    defaultFont = fontFamily;
  }

  static query = (id) => textInstances[id];

  static getDerivedStateFromProps(props) {
    const { style, center } = props;
    const combinedStyle = [
      defaultFont,
      center ? { textAlign: 'center' } : {},
      propsToStyle(props),
      style,
    ];
    return { propStyle: combinedStyle };
  }

  state = {
    text: this.props.text || '',
    forceUseValueState: false,
    propStyle: {},
    additionStyle: {},
  }

  root;

  onRef = (componentRef) => {
    const { onRef } = this.props;
    this.root = componentRef;
    !!onRef && onRef(componentRef);
  }

  componentDidMount() {
    const { id } = this.props;
    if (!id) return;
    textInstances[id] = {
      getValue: () => {
        return this.getText();
      },
      setValue: (newValue) => {
        this.setState({
          text: newValue,
          forceUseValueState: true,
        });
      },
      text: undefined,
    }
    // just trying to make it jQuery-like, get and set in one function
    textInstances[id].text = function() {
      if (arguments.length === 0) return textInstances[id].getValue();
      textInstances[id].setValue(arguments[0]);
    }.bind(this);
  }

  setStyles = (additionStyle) => {
    const { useNativeStyleProps } = this.props;
    const { propStyle } = this.state;
    // @ts-ignore
    const root : any = this.root;
    if (useNativeStyleProps && !!root) {
      root.setNativeProps({
        style: [propStyle, additionStyle],
      })
    } else {
      this.setState({ additionStyle })
    }
    
  }

  componentWillUnmount() {
    const { id } = this.props;
    if (!id) return;
    delete textInstances[id]; 
  }

  getText = () => {
    const { forceUseValueState } = this.state;
    const value = forceUseValueState ? this.state.text : this.props.text;
    return value;
  }

  render() {
    const { children, onHoverStyle } = this.props;
    const text = this.getText();
    const { propStyle, additionStyle } = this.state;

    const hoverProps = !onHoverStyle ? {} : {
      onMouseEnter: () => this.setStyles(onHoverStyle),
      onMouseLeave: () => this.setStyles(undefined),
    };

    return (
      <TextDefault
        {...this.props}
        ref={this.onRef}
        style={[propStyle, additionStyle]}
        {...hoverProps}
      >
        {text || children || null}
      </TextDefault>
    )
  }
}

