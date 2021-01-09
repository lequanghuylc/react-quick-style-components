import React, { Component } from 'react';

import {
  TouchableOpacity,
  Platform,
} from 'react-native';

export interface Props {
  onRef?(ref: any): void,
  onPress?(event: any): void,
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
const preventDoublePress = (func, event) => {
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

export default class Button extends Component<Props> {

  static onPressEvent = (id, callback) => {
    if (!id || !callback) return;
    pressEventListeners[id] = callback;
  };

  render() {
    const { style, activeOpacity, children, onLayout, onLongPress, onMouseEnter, onMouseLeave, onRef } = this.props;
    const hoverProps = !!onMouseEnter && !!onMouseLeave ? { onMouseEnter, onMouseLeave } : {};
    return (
      <TouchableOpacity ref={onRef} {...hoverProps} onLongPress={onLongPress} onLayout={onLayout} activeOpacity={activeOpacity || DEFAULT_OPACITY} onPress={this.handlePress} style={style}>
        {children}
      </TouchableOpacity>
    );
  }

  handlePress = (e) => {
    const { noPrevent, onPress, id } = this.props;
    noPrevent ? onPress(e) : preventDoublePress(onPress, e);
    if (typeof id === 'string' && id !== '' && typeof pressEventListeners[id] === 'function') {
      pressEventListeners[id](e);
    }
  }
}