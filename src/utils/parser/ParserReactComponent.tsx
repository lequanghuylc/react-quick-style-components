import React from 'react';
import { IComponentJson } from './ComponentJsonType';
import ParserJSON from './ParserJSON';
import Banks from './Banks';
import TransformMiddlewares from './TransformMiddlewares';
import TreeAllocation from './TreeAllocation';

interface IParserProps extends IComponentJson {
  [additionProps: string]: any,
}

interface IParser {
  (props: IParserProps) : any,
  Banks: typeof Banks,
  TransformMiddlewares: typeof TransformMiddlewares,
  TreeAllocation: typeof TreeAllocation,
}

const Parser : IParser = (props) => {
  let data : IComponentJson;
  try {
    data = ParserJSON.genComponentJSON(props);
  } catch(err) {
    data = {
      id: 'error_'+Math.random(),
      from: 'Text',
      props: {
        text: 'Error: ' + err.message,
      }
    }
  }

  let Component;
  if (!!Banks.reactFrom[data.from]) Component = Banks.reactFrom[data.from].reactComponent;
  else if (!!Banks.banks[data.from]) {
    Component = (p : IParserProps) => {
      return (
        <Parser {...p} />
      )
    };
  }

  const renderChildren = () => {
    if (!data.tree) return null;
    if (!data.banks) return null;
    if (!data.tree.children) return null;
    return (
      <>
        {data.tree.children.map((val, i) => {
          const id = val.id;
          const childData = !!data.banks && !!data.banks[id] ? data.banks[id] : undefined;
          if (!childData) return null;
          return (
            <Parser
              key={'render-child-'+id+'-'+i}
              {...childData}
              banks={data.banks}
              tree={{
                id: childData.id,
                children: val.children,
              }}
            />
          )
        })}
      </>
    );
  };

  return (
    <Component
      {...data.props}
      onHoverStyle={data.onHoverStyle}
      onResponsiveLayout={data.onResponsiveLayout}
      onResponsiveStyle={data.onResponsiveStyle}
      style={data.style}
      hasWrapper
    >
      {renderChildren()}
    </Component>
  );
}

Parser.Banks = Banks;
Parser.TransformMiddlewares = TransformMiddlewares;
Parser.TreeAllocation = TreeAllocation;

export default Parser;