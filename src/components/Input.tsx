import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Platform,
  TextInputProps,
} from 'react-native';

import { defaultFont } from './Text';

export interface Props {
  id?: string,
  onRef?(): void,
  value?: any,
  onChange?(newValue : any): any,
  multiLines?: boolean,
  placeholder?: string,
  style?: any,
  inputProps?: TextInputProps,
  [key: string]: any,
}

(() => {
  if ( Platform.OS !== 'web' ) return;
  const style = document.createElement('style')
	style.textContent = `textarea, select, input, button { outline: none!important; }`
	document.head.append(style);
})();



interface TextInstanceManager {
  [id: string]: {
    getValue(): string,
    setValue(newValue: string): void,
    text: any,
  },
}

const textInstances : TextInstanceManager = {};

export default class Input extends Component<Props> {

  static query = (id) => textInstances[id];

  state = {
    value: this.props.value || '',
    forceUseValueState: false,
  }

  componentDidMount() {
    const { id } = this.props;
    if (!id) return;
    textInstances[id] = {
      getValue: () => {
        return this.getValue();
      },
      setValue: (newValue) => {
        this.setState({
          value: newValue,
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

  componentWillUnmount() {
    const { id } = this.props;
    if (!id) return;
    delete textInstances[id]; 
  }

  handleChange = text => {
    const { onChange } = this.props;
    const { forceUseValueState } = this.state;
    if (forceUseValueState || !onChange) {
      this.setState({ value: text });
    } else {
      onChange(text);
    }
  }

  getValue = () => {
    const { onChange } = this.props;
    const { forceUseValueState } = this.state;
    const value = forceUseValueState ? this.state.value :
      !onChange ? this.state.value : this.props.value;
    return value;
  }

  render() {
    const { style, onRef, placeholder, multiLines, inputProps } = this.props;
    const value = this.getValue();
    
    return (
      <TextInput
        value={String(value)}
        autoCapitalize="none"
        onChangeText={this.handleChange}
        style={[multiLines ? styles.textarea : styles.input, defaultFont, style]}
        underlineColorAndroid="transparent"
        placeholderTextColor={'rgba(0,0,0,0.2)'}
        placeholder={placeholder}
        ref={onRef}
        textAlignVertical="top"
        multiline={multiLines}
        {...inputProps}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minHeight: 30,
  },
  textarea: {
    width: '100%',
    minHeight: 100,
  },
})