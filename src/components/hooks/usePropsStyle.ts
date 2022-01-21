import { useMemo } from 'react';
import { propsToStyle } from '../../utils/globalProps';

export const usePropsStyle = (props : any) => {
  return useMemo(() => {
    return [
      propsToStyle(props),
      props.style,
    ];
  }, [props]);
};