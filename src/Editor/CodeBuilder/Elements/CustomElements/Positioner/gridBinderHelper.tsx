import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { AppDefinitionType, PositionsType, LayoutsEnum, LayoutsType } from '@/types/EditorTypes/AppTypes';
import { canvasRowHeightInPixels, onePercentOfCanvasColumnAmount } from '@/_helpers/constants';
import { ElementsToRenderPropsType } from '@/types/EditorTypes/InspectorElementTypes';

type RoundComponentLayoutPropertiesType = (
  props: ElementsToRenderPropsType & { roundedProperty: ReturnType<CheckIsBindedToGridType> }
) => () => void;

export const roundComponentLayoutProperties: RoundComponentLayoutPropertiesType =
  ({ currentPageId, component, currentLayout, appDefinition, appDefinitionChanged, roundedProperty }) =>
  () => {
    if (!roundedProperty.isBindedToGrid) {
      const newAppDefinition = cloneDeep(appDefinition);
      appDefinitionChanged(
        mutateComponentLayoutProperties({
          componentId: component.id,
          newAppDefinition,
          roundedProperty,
          currentPageId,
          currentLayout,
        })
      );
    }
  };

type MutateComponentLayoutPropertiesType = (props: {
  roundedProperty: ReturnType<CheckIsBindedToGridType>;
  newAppDefinition: AppDefinitionType;
  currentLayout: LayoutsEnum;
  currentPageId: string;
  componentId: string;
}) => AppDefinitionType;

export const mutateComponentLayoutProperties: MutateComponentLayoutPropertiesType = ({
  newAppDefinition,
  currentPageId,
  roundedProperty,
  componentId,
  currentLayout,
}) => {
  set(
    newAppDefinition,
    `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.top`,
    roundedProperty.top
  );
  set(
    newAppDefinition,
    `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.left`,
    roundedProperty.left
  );
  set(
    newAppDefinition,
    `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.width`,
    roundedProperty.width
  );
  set(
    newAppDefinition,
    `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.height`,
    roundedProperty.height
  );
  return newAppDefinition;
};

export type CheckIsBindedToGridType = (props: {
  layouts: LayoutsType;
  currentLayout: LayoutsEnum;
}) => PositionsType & { isBindedToGrid: boolean };

export const checkIsBindedToGrid: CheckIsBindedToGridType = ({ layouts, currentLayout }) => {
  const roundedProperty = {
    left: Math.round(layouts[currentLayout].left * onePercentOfCanvasColumnAmount) / onePercentOfCanvasColumnAmount,
    top: Math.round(layouts[currentLayout].top / canvasRowHeightInPixels) * canvasRowHeightInPixels,
    width: Math.round(layouts[currentLayout].width),
    height: Math.round(layouts[currentLayout].height / canvasRowHeightInPixels) * canvasRowHeightInPixels,
  };
  if (
    Number(roundedProperty.left.toFixed(2)) !== Number(layouts[currentLayout].left.toFixed(2)) ||
    roundedProperty.top !== layouts[currentLayout].top ||
    roundedProperty.height !== layouts[currentLayout].height ||
    roundedProperty.width !== Number(layouts[currentLayout].width.toFixed(2))
  )
    return { ...roundedProperty, isBindedToGrid: false };
  else return { ...roundedProperty, isBindedToGrid: true };
};
