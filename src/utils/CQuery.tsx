import React, { useState, useEffect, useCallback } from 'react';

interface ICQuery {
  getProps(): any,
  setProps(newProps : object): any,
}

interface IIDManager {
  [componentId : string]: ICQuery | null,
}

const ids : IIDManager = {};

export const withCQuery = (Component) => (props) => {

  const [innerProps, setInnerProps] = useState(props);

  useEffect(() => {
    setInnerProps(props);
  }, [props]);

  const initInstace = (id) => {
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
    text: () => CQuery(id).getProps().text,
    setText: (newText : string) => CQuery(id).setProps({ text: newText }),
  }
}

export const ButtonQuery = (id: string) => {
  if (!CQuery(id)) return null;
  return {
    press: (callback) => {
      CQuery(id).setProps({
        onPress: () => {
          callback();
        }
      })
    }
  }
}

window.cQuery = CQuery;

export default CQuery;
