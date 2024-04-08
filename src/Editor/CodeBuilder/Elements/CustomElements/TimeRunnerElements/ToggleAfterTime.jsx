import React from 'react';

import { Toggle } from '../../Toggle';

export const ToggleAfterTime = ({ onChange, paramUpdated, ...restProps }) => {
  const handleOnChange = (isOnce) => {
    paramUpdated({ name: 'after', type: 'code' }, 'isActive', isOnce === '{{true}}', 'properties');
    onChange(isOnce);
  };

  return <Toggle {...restProps} onChange={handleOnChange} withFxButton={false} />;
};
