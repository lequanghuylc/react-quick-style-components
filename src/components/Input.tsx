import React, { RefCallback, useRef, useState, useEffect, useMemo, RefObject } from 'react';
import {
  TextInput,
  TextInputProps,
  Platform,
  View,
} from 'react-native';

import Text from './Text';

type TReactComponent = any; // TODO: use proper type

import { usePropsStyle, useHoverStyle, useResponsiveStyle } from './hooks';

export interface ITextInputProps {
  id?: string,
  onRef?(ref: any): void,
  value?: any,
  onChange?(newValue : any): any,
  multiLines?: boolean,
  placeholder?: string,
  placeholderColor?: string,
  style?: any,
  onSubmitEditing?(): any,
  onEnter?(): any,
  inputProps?: TextInputProps,
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

interface TextInstanceManager {
  get(): string,
  set(newValue: string): void,
  focus(): void,
  isFocused(): boolean,
  blur(): void,
}

interface IInput {
  (props : ITextInputProps): TReactComponent,
  query(id: string): null | TextInstanceManager,
  instances: {
    [componentId : string]: TextInstanceManager,
  }
}

(() => {
  if ( Platform.OS !== 'web' ) return;
  const style = document.createElement('style')
	style.textContent = `textarea, select, input, button { outline: none!important; }`
	document.head.append(style);
})();

const Input : IInput = (props) => {
  const { placeholder, multiLines, onSubmitEditing, onEnter, inputProps, onHoverStyle, onResponsiveStyle, placeholderColor } = props;
  // the main idea here is to get this component to work with/without value & onChange props
  const [value, setValue] = useState(props.value);
  const style = usePropsStyle(props);
  const compRef = useRef<TextInput>();
  const onRef : RefCallback<TextInput> = (ref) => {
    if (!ref) return;
    compRef.current = ref;
    if (props.onRef) props.onRef(ref);
  }
  const useNativeStyleProps = props.useNativeStyleProps === false ? false : true; // default is true
  const [hoverProps, combinedStyle] = useHoverStyle(onHoverStyle, useNativeStyleProps, style, compRef as RefObject<View>);
  const responsiveStyle = useResponsiveStyle(onResponsiveStyle);

  const handleChange = (newText : string) => {
    if (props.onChange) props.onChange(newText);
    else setValue(newText);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (!props.id) return;
    Input.instances[props.id] = {
      get: () => value,
      set: (newValue) => setValue(newValue),
      focus: () => !!compRef.current && compRef.current.focus(),
      isFocused: () => !!compRef.current && compRef.current.isFocused(),
      blur: () => !!compRef.current && compRef.current.blur(),
    }
    return () => {
      if (props.id) delete Input.instances[props.id];
    }
  }, [props.id, value])

  const inputStyle = [Text.defaultFont, combinedStyle, responsiveStyle];
  
  return useMemo(() => {
    return (
      <TextInput
        value={String(value)}
        autoCapitalize="none"
        onChangeText={handleChange}
        underlineColorAndroid="transparent"
        placeholderTextColor={placeholderColor || Text.defaultFont.color}
        placeholder={placeholder}
        ref={onRef}
        textAlignVertical="top"
        multiline={multiLines}
        onSubmitEditing={onSubmitEditing || onEnter}
        {...hoverProps}
        {...inputProps}
        style={inputStyle}
      />
    );
    // prevent rerender if props.value changes
  }, [value, inputStyle, placeholder, placeholderColor, multiLines, onSubmitEditing, onEnter, hoverProps, inputProps]);
};

Input.instances = {};

Input.query = (id) => {
  return Input.instances[id] || null;
};

export default Input;
