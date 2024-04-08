import { useState } from 'react';

import { PositionManipulator } from '@/Editor/CodeBuilder/Elements/CustomElements/Positioner/PositionManipulator';
import { PositionsEnum } from '@/types/EditorTypes/AppTypes';

import { changeSelectedComponentLayouts } from '../BulkResizer/BulkResizerHelper';
import { MultiInspectorDrillingPropsType } from '../MultiInspector';

export const BulkPositioner = (props: MultiInspectorDrillingPropsType) => {
  const leftState = useState<number>();
  const topState = useState<number>();

  return (
    <div className="multi-inspector__container">
      <h5 className="multi-inspector__headline">Position</h5>
      <PositionManipulator
        onLeftChange={changeSelectedComponentLayouts({
          propery: PositionsEnum.left,
          properyState: leftState,
          ...props,
        })}
        onTopChange={changeSelectedComponentLayouts({ propery: PositionsEnum.top, properyState: topState, ...props })}
        canvasHeight={props.appDefinition.globalSettings.canvasMaxHeight}
        left={leftState[0]}
        top={topState[0]}
      />
    </div>
  );
};
