import React from 'react';
import { Col, Row, Text, Input, Img, Scroll, withCQuery } from 'custom-libs';
import { Container } from '../containers'
import { Element } from '../elements'
import { genComponentJSON, transformUsageProps } from "./genComponentJSON";
import Store from 'store';

const Parser = (props) => {
  let data;
  try {
    data = genComponentJSON(props);
    // console.log('componentJSON', data);
  } catch(err) {
    data = {
      from: 'Text',
      props: {
        text: 'Error: ' + err.message,
      }
    }
  }

  let Component;
  switch(data.from) {
    case 'Col':
      Component = Col;
    break;
    case 'Row':
      Component = Row;
    break;
    case 'Scroll':
      Component = Scroll;
    break;
    case 'Text':
      Component = Text;
    break;
    case 'Img':
      Component = Img;
    break;
    case 'Input':
      Component = Input;
    break;
    default: Component = () => null;
  }
  if (!!Container[data.from]) Component = Container[data.from];
  else if (!!Element[data.from]) Component = Element[data.from];
  else if (!!Store.Component.library[data.from]) {
    Component = (p) => {
      // console.log('p', p);
      const transformedProps = transformUsageProps(p, Store.Component.library[data.from]);
      // console.log('transformedProps', transformedProps);
      return (
        <Parser {...transformedProps} />
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
          const childData = data.banks[id];
          return (
            <Parser
              key={'render-child-'+id+'-'+i}
              {...childData}
              banks={data.banks}
              tree={{
                children: val.children,
              }}
            />
          )
        })}
      </>
    );
  };
  // if (props.id === 'AddButton' || props.id === 'ScreenTodo') 
  // console.log('props', props);

  return (
    <Component id={data.id} {...data.props} style={data.style} hasWrapper>
      {renderChildren()}
    </Component>
  );
};

export default (Parser);