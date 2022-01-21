import React, { RefCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageProps,
  ImageStyle,
} from 'react-native';

import { usePropsStyle, useHoverStyle, useResponsiveStyle } from './hooks';
import Col from './Col';
import Text from './Text';

interface IImgProps extends ImageStyle {
  onRef?(ref: any): void,
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
  source: ImageSourcePropType,
  resizeMode?: 'center' | 'contain' | 'cover' | 'none' | 'repeat' | 'stretch' | any,
  imageProps?: ImageProps,
  [key: string]: any,
}

const Img = (props : IImgProps) => {
  const [err, setErr] = useState(false);
  const { onHoverStyle, onResponsiveStyle, useNestedHover, resizeMode, source, imageProps } = props;
  const style = usePropsStyle(props);

  const compRef = useRef(null);
  const onRef : RefCallback<any> = (ref) => {
    compRef.current = ref;
    if (props.onRef) props.onRef(ref);
  }
  const useNativeStyleProps = props.useNativeStyleProps === false ? false : true; // default is true
  const [hoverProps, combinedStyle, isHovered] = useHoverStyle(onHoverStyle, useNestedHover ? false : useNativeStyleProps, style, compRef);
  const responsiveStyle = useResponsiveStyle(onResponsiveStyle);

  const onError = () => setErr(true);

  useEffect(() => {
    setErr(false);
  }, [source]);

  if (err) {
    return (
      <Col middle backgroundColor="rgba(0,0,0,0.2)" style={[combinedStyle, responsiveStyle]}>
        <Img.ImageError />
      </Col>
    )
  }

  return (
    <Image
      ref={onRef}
      resizeMode={resizeMode}
      source={source}
      onError={onError}
      {...imageProps}
      {...hoverProps}
      style={[combinedStyle, responsiveStyle]}
    />
  )
}

Img.ImageError = () => <Text color="black" textAlign="center">Image error!</Text>

export default Img;