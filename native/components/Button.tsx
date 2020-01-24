import React, { Component } from 'react';

import GlobalEvent from 'js-events-listener';
import {
  TouchableOpacity,
  Platform,
} from 'react-native';

export interface Props {
  onRef?(): void,
  onPress?(): void,
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
const preventDoublePress = (func) => {
  if (typeof func !== 'function') return;
  let executedTime = new Date().getTime();
  if (executedTime - _lastTime > DURATION_PREVENT) {
    func();
    _lastTime = executedTime;
  }
};

export default class Button extends Component<Props> {

  render() {
    const { style, activeOpacity, children, onLayout, onLongPress } = this.props;
    return (
      <TouchableOpacity onLongPress={onLongPress} onLayout={onLayout} activeOpacity={activeOpacity || DEFAULT_OPACITY} onPress={this.handlePress} style={style}>
        {children}
      </TouchableOpacity>
    );
  }

  handlePress = () => {
    this.props.noPrevent ? this.props.onPress() : preventDoublePress(this.props.onPress);
    if (typeof this.props.eventName === 'string' && this.props.eventName !== '') {
      GlobalEvent.emit('SENDING_EVENT', this.props.eventName);
    }
  }
}