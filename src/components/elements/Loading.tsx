import { COLOR } from 'const';
import React from 'react';
import {
  ActivityIndicator
} from 'react-native';

interface Props {
  size?: 'large' | 'small',
  color?: string,
}

export const Loading  = (props : Props) => {
  return (
    <ActivityIndicator
      size={props.size || 'small'}
      color={props.color || COLOR.MAIN}
    />
  )
};