import React, { useState, useEffect } from 'react';
import { propsToStyle, Col } from 'custom-libs';

interface Props {
  id?: string,
  [key: string]: any,
}

interface PlaceholderInstaceType {
  [id: string]: {
    setComponent(children: any): any,
  }
}

export const Placeholder = (props : Props) : any => {
  const [children, setChildren] = useState(null);
  const [useStateChildren, setUseStateChildren] = useState(false);

  const setComponent = (node: any) => {
    setChildren(node);
    setUseStateChildren(true);
  }

  useEffect(() => {
    const { id } = props;
    if (!id) return;
    Placeholder.instance[id] = {
      setComponent,
    }
    return () => {
      delete Placeholder.instance[id]
    };
  }, [])
  if (!useStateChildren) return props.children || null;
  return children || null;
};

Placeholder.instance = {};

Placeholder.query = (id: string) => {
  if (Placeholder.instance[id]) {
    return Placeholder.instance[id];
  } else return null;
}