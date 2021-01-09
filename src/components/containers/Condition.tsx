import React, { Fragment } from 'react';
import { propsToStyle, Col } from 'custom-libs';
import {
  Platform
} from 'react-native'

interface Props {
  index?: number,
  options?: Array<string>,
  name?: string,
  hasWrapper?: boolean,
  forPlatform?: boolean,
  [key: string]: any,
}

export const Condition = (props : Props) : any => {
  const { index, options, forPlatform, children, hasWrapper } = props;
  const name = forPlatform ? Platform.OS : props.name;
  if (!children) return null;
  let comp;
  const childrenArray = React.Children.toArray(hasWrapper ? children.props?.children : children);
  if (typeof index === 'number' && index < childrenArray.length) {
    comp = childrenArray[index];
  } else if (!options && !name) {
    comp = null;
  }
  const childIndex = options.indexOf(name);
  if (childIndex != -1 && childIndex < childrenArray.length) {
    comp = childrenArray[childIndex];
  }
  return comp || null;
};

export default Condition;

/*

const Button = ({ isLoading }) => {
  return (
    <ChildCondition index={0}>
      <Col><Text>Loading</Col>
      <Col>Click me</Col>
    </Condition>
  );
}

const Button = ({ isLoading }) => {
  return (
    <ChildCondition name="loading" options={['loading', 'normal', 'disable']}>
      <Col><Text>Loading</Col>
      <Col>Click me</Col>
    </Condition>
  );
}

*/