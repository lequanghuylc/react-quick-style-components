import React, { useState, useEffect, useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';

interface ICQuery {
  getProps(): any,
  setProps(newProps : object): any,
}

interface IIDManager {
  [componentId : string]: ICQuery | null,
}

type TReactComponent = new() => React.Component<any, any>

interface IProps {
  [key: string]: any,
}

const ids : IIDManager = {};

export const withCQuery = (Component : TReactComponent) => (props : IProps) => {

  const [innerProps, setInnerProps] = useState(props);

  useEffect(() => {
    setInnerProps(props);
  }, [props]);

  const initInstace = (id : string) => {
    if (!id) return;
    ids[id] = {
      getProps: () => {
        return innerProps;
      },
      setProps: (newProps) => {
        setInnerProps({ ...innerProps, ...newProps })
      },
    };
  };

  useEffect(() => {
    initInstace(props.id);
    return () => {
      delete ids[props.id];
    }
  }, [props.id, innerProps]);

  return (
    <Component {...innerProps} />
  );
};

const CQuery = (id : string) : ICQuery | null => {
  if (!id || !ids[id]) return null;
  return ids[id];
};

export const TextQuery = (id: string) => {
  if (!CQuery(id)) return null;
  return {
    text: () => {
      if (!CQuery(id)) return '';
      return CQuery(id)?.getProps().text;
    },
    setText: (newText : string) => {
      if (!CQuery(id)) return;
      return CQuery(id)?.setProps({ text: newText });
    },
  }
}

interface IPressCallback {
  (e : GestureResponderEvent): void,
}

export const ButtonQuery = (id: string) => {
  if (!CQuery(id)) return null;
  return {
    press: (callback : IPressCallback) => {
      if (CQuery(id))
      CQuery(id)?.setProps({
        onPress: (e : GestureResponderEvent) => {
          callback(e);
        }
      })
    }
  }
}

export default CQuery;
