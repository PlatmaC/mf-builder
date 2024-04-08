import { ElementsToRenderPropsType } from '@/types/EditorTypes/InspectorElementTypes';
import { PositionsEnum } from '@/types/EditorTypes/AppTypes';

import { changeComponentLayoutProperty } from '../Resizer/layoutChangeHelper';
import { PositionManipulator } from './PositionManipulator';
import { GridBinder } from './GridBinder';

export const Positioner = (props: ElementsToRenderPropsType) => (
  <div className="layout-changer__wrapper">
    <PositionManipulator
      onLeftChange={changeComponentLayoutProperty({ ...props, propery: PositionsEnum.left })}
      onTopChange={changeComponentLayoutProperty({ ...props, propery: PositionsEnum.top })}
      canvasHeight={props.appDefinition.globalSettings.canvasMaxHeight}
      left={props.component.layouts[props.currentLayout].left}
      top={props.component.layouts[props.currentLayout].top}
    />
    <GridBinder {...props} />
  </div>
);
