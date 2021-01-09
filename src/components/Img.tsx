import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Platform,
  ImageProps,
  ImageSourcePropType,
} from 'react-native';

import Col from './Col';
import Text from './Text';
import { propsToStyle } from '../utils/globalProps';

export interface Props {
  onRef?(ref: any): void,
  style?: any,
  imageProps?: ImageProps,
  source: ImageSourcePropType,
  resizeMode?: 'center' | 'contain' | 'cover' | 'none' | 'repeat' | 'stretch' | any,
  [key: string]: any,
}



export default class Img extends Component<Props> {

  state = {
    error: false,
  }

  onError = () => {
    this.setState({ error: true });
  }

  render() {
    const { style, onRef, imageProps, resizeMode, source } = this.props;
    const { error } = this.state;
    const combinedStyle = [
      propsToStyle(this.props),
      style,
    ];
    if (error) {
      return (
        <Col middle backgroundColor="rgba(0,0,0,0.2)" style={combinedStyle}>
          <Text color="black">Image error!</Text>
        </Col>
      )
    }
    return (
      <Image
        ref={onRef}
        resizeMode={resizeMode}
        source={source}
        onError={this.onError}
        {...imageProps}
        style={combinedStyle}
      />
    )
  }
}

const styles = StyleSheet.create({
  
})