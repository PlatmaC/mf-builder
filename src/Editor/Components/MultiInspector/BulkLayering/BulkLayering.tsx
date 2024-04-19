import { useState } from 'react';

import { NumberInput } from '@/_ui/NumberInput/NumberInput';

import { MultiInspectorDrillingPropsType } from '../MultiInspector';
import { bubblingLayer } from './BulkLayeringHelper';

export const BulkLayering = (props: MultiInspectorDrillingPropsType) => {
  const zIndexState = useState();

  return (
    <div className="multi-inspector__container">
      <h5 className="multi-inspector__headline">Z-index</h5>
      <section className="layout-changer__wrapper">
        <div className="layout-changer__container">
          <NumberInput
            onChange={bubblingLayer({ properyState: zIndexState, ...props })}
            className="layout-changer__input"
            value={zIndexState[0]}
            label={'Layer:'}
            min={-9999}
            max={9999}
          />
        </div>
      </section>
    </div>
  );
};
