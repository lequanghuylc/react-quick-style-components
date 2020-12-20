import React, { Component } from 'react';

import {
  TouchableOpacity,
  Platform,
} from 'react-native';

export interface Props {
  onRef?(): void,
  onPress?(event: any): void,
  noPrevent? : boolean,
  eventName?: string,
  activeOpacity? : number,
  noRipple?: boolean,
  onLayout?(): void,
  onLongPress?(): void,
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

  static onPressEvent = (eventName, callback) => {
    if (!eventName || !callback) return;
    pressEventListeners[eventName] = callback;
  };

  render() {
    const { style, activeOpacity, children, onLayout, onLongPress } = this.props;
    return (
      <TouchableOpacity onLongPress={onLongPress} onLayout={onLayout} activeOpacity={activeOpacity || DEFAULT_OPACITY} onPress={this.handlePress} style={style}>
        {children}
      </TouchableOpacity>
    );
  }

  handlePress = (e) => {
    const { noPrevent, onPress, eventName } = this.props;
    noPrevent ? onPress(e) : preventDoublePress(onPress, e);
    if (typeof eventName === 'string' && eventName !== '' && typeof pressEventListeners[eventName] === 'function') {
      pressEventListeners[eventName](e);
    }
  }
}