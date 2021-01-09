import React, { useState, useEffect, Fragment } from 'react';

interface Props {
  data: Array<any>,
  children: any,
}

export const Loop = ({ data, children } : Props) => {
  if (!data.length || data.length === 0) return null;
  // console.log('children', children);
  if (!children || !children.props?.children || !children.props?.children[0]) return null;
  return (
    <Fragment>
      {data.map((item, index) => {
        // console.log('item', item);
        return (
          <Fragment key={'loop-item-'+index+item.key}>
            {React.cloneElement(children.props?.children[0], { ...item })}
          </Fragment>
        );
      })}
    </Fragment>
  );
};
