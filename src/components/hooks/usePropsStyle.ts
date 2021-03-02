import { useState, useEffect } from 'react';
import { propsToStyle } from '../../utils/globalProps';

export const usePropsStyle = (props : any) => {
  const [style, setStyle] = useState([
    propsToStyle(props),
    props.style,
  ]);

  useEffect(() => {
    const newStyle = [
      propsToStyle(props),
      props.style,
    ];
    setStyle(newStyle);
  }, [props]);

  return style;
};