import { ElementsToRenderPropsType } from '@/types/EditorTypes/InspectorElementTypes';

import { changeComponentLayoutProperty } from './layoutChangeHelper';
import { PositionsEnum } from '@/types/EditorTypes/AppTypes';
import { SizeManipulator } from './SizeManipulator';

import '@/_styles/widgets/layout-changer.scss';

export const Resizer = (props: ElementsToRenderPropsType) => (
  <SizeManipulator
    onHeightChange={changeComponentLayoutProperty({ ...props, propery: PositionsEnum.height })}
    onWidthChange={changeComponentLayoutProperty({ ...props, propery: PositionsEnum.width })}
    canvasHeight={props.appDefinition.globalSettings.canvasMaxHeight}
    height={props.component.layouts[props.currentLayout].height}
    width={props.component.layouts[props.currentLayout].width}
  />
);
