import React, { Component } from 'react';

import {
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native';

export interface IButtonProps {
  onRef?(ref: any): void,
  onPress?(event: GestureResponderEvent): void,
  noPrevent? : boolean,
  id?: string,
  activeOpacity? : number,
  onLayout?(event: any): any,
  onLongPress?(event: any): void,
  onMouseEnter?(event: any): void,
  onMouseLeave?(event: any): void,
  style?: any,
  [key: string]: any,
}

const DEFAULT_OPACITY = 0.4;
const DURATION_PREVENT = 200;
let _lastTime = 0;

const preventDoublePress = (func : (event : GestureResponderEvent) => unknown, event : GestureResponderEvent) => {
  if (typeof func !== 'function') return;
  let executedTime = new Date().getTime();
  if (executedTime - _lastTime > DURATION_PREVENT) {
    func(event);
    _lastTime = executedTime;
  }
};

interface PressEventListener {
  [eventId: string]: any,
}

const pressEventListeners : PressEventListener = {};

const Button = (props : IButtonProps) => {
  const { style, activeOpacity, children, onLayout, onLongPress, onMouseEnter, onMouseLeave, onRef } = props;
  const hoverProps = !!onMouseEnter && !!onMouseLeave ? { onMouseEnter, onMouseLeave } : {};

  const handlePress = (e : GestureResponderEvent) => {
    const { noPrevent, onPress, id } = props;
    if (!onPress) return;
    noPrevent ? onPress(e) : preventDoublePress(onPress, e);
    if (typeof id === 'string' && id !== '' && typeof pressEventListeners[id] === 'function') {
      pressEventListeners[id](e);
    }
  };

  return (
    <TouchableOpacity
      ref={onRef}
      {...hoverProps}
      onLongPress={onLongPress}
      onLayout={onLayout}
      activeOpacity={activeOpacity || DEFAULT_OPACITY}
      onPress={handlePress}
      style={style}
    >
        {children}
      </TouchableOpacity>
  );
};

export default Button;