import { useMemo } from 'react';
import cn from 'classnames';

import { checkIsBindedToGrid, roundComponentLayoutProperties } from '../Positioner/gridBinderHelper';
import { ElementsToRenderPropsType } from '@/types/EditorTypes/InspectorElementTypes';

export const GridBinder = (props: ElementsToRenderPropsType) => {
  const roundedProperty = useMemo(
    () => checkIsBindedToGrid({ layouts: props.component.layouts, currentLayout: props.currentLayout }),
    [props.component, props.currentLayout]
  );

  return (
    <button
      className={cn('layout-changer__button layout-changer__button--margin', {
        ['layout-changer__button--selected']: !roundedProperty.isBindedToGrid,
      })}
      onClick={roundComponentLayoutProperties({ ...props, roundedProperty })}
    >
      Bind to grid
    </button>
  );
};
