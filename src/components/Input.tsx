import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Platform,
  TextInputProps,
} from 'react-native';

import { defaultFont } from './Text';

export interface Props {
  onRef?(): void,
  value: any,
  onChange(newValue : any): any,
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

export default class Input extends Component<Props> {

  render() {
    const { style, onRef, placeholder, multiLines, value, onChange, inputProps } = this.props;
    return (
      <TextInput
        value={String(value)}
        autoCapitalize="none"
        onChangeText={onChange}
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