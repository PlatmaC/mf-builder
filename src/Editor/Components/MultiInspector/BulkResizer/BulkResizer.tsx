import { useState } from 'react';

import { SizeManipulator } from '@/Editor/CodeBuilder/Elements/CustomElements/Resizer/SizeManipulator';
import { PositionsEnum } from '@/types/EditorTypes/AppTypes';

import { MultiInspectorDrillingPropsType } from '../MultiInspector';
import { changeSelectedComponentLayouts } from './BulkResizerHelper';

export const BulkResizer = (props: MultiInspectorDrillingPropsType) => {
  const heightState = useState<number>();
  const widthState = useState<number>();

  return (
    <div className="multi-inspector__container">
      <h5 className="multi-inspector__headline">Size</h5>
      <SizeManipulator
        onHeightChange={changeSelectedComponentLayouts({
          propery: PositionsEnum.height,
          properyState: heightState,
          ...props,
        })}
        onWidthChange={changeSelectedComponentLayouts({
          propery: PositionsEnum.width,
          properyState: widthState,
          ...props,
        })}
        canvasHeight={props.appDefinition.globalSettings.canvasMaxHeight}
        height={heightState[0]}
        width={widthState[0]}
      />
    </div>
  );
};
