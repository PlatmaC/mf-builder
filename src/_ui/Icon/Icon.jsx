import React from 'react';
import './Icon.scss';
import Icon from './bulkIcons/index';

const IconEl = (props) => {
  const { name, ...restProps } = props;
  return <Icon {...restProps} name={name} />;
};
export default IconEl;
