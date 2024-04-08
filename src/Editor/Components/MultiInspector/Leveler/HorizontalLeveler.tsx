import { IconAlignBoxCenterMiddle, IconAlignBoxLeftMiddle, IconAlignBoxRightMiddle } from '@tabler/icons-react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { PositionsType } from '@/types/EditorTypes/AppTypes';
import { canvasColumnAmount } from '@/_helpers/constants';

import { MultiInspectorDrillingPropsType } from '../MultiInspector';
import { getAlignmentInfo } from '../MultiInspectorHelper';

import '@/_styles/editor/multi-inspector.scss';

export const HorizontalLeveler = ({
  appDefinitionChanged,
  selectedComponents,
  currentPageId,
  currentLayout,
  appDefinition,
}: MultiInspectorDrillingPropsType) => {
  const alignHorizontallyLeft = () => {
    const { selectedComponentDefinitions } = getAlignmentInfo({ selectedComponents, appDefinition, currentPageId });
    const leftmostCoordinate = selectedComponentDefinitions.reduce((mostLeft, [_componentId, definition]) => {
      if (mostLeft === null) return definition.layouts[currentLayout].left;
      else return Math.min(definition.layouts[currentLayout].left, mostLeft);
    }, null);
    if (leftmostCoordinate !== null) {
      const newAppDefinition = cloneDeep(appDefinition);
      selectedComponentDefinitions.forEach(([componentId]) => {
        set(
          newAppDefinition,
          `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.left`,
          leftmostCoordinate
        );
      });
      appDefinitionChanged(newAppDefinition);
    }
  };

  const alignHorizontallyRight = () => {
    const { selectedComponentDefinitions, canvasAreaWidth } = getAlignmentInfo({
      selectedComponents,
      appDefinition,
      currentPageId,
    });
    if (canvasAreaWidth) {
      const rightmostCoordinate = selectedComponentDefinitions.reduce((mostRight, [_componentId, definition]) => {
        const componentWidthInPixels = definition.layouts[currentLayout].width * (canvasAreaWidth / canvasColumnAmount);
        const componentLeftInPixels = (definition.layouts[currentLayout].left * canvasAreaWidth) / 100;
        const currentRightCoordinate = componentLeftInPixels + componentWidthInPixels;
        if (mostRight === null) return currentRightCoordinate;
        else return Math.max(currentRightCoordinate, mostRight);
      }, null);
      if (rightmostCoordinate !== null) {
        const newAppDefinition = cloneDeep(appDefinition);
        selectedComponentDefinitions.forEach(([componentId, definition]) => {
          const widthInPixels = definition.layouts[currentLayout].width * (canvasAreaWidth / canvasColumnAmount);
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.left`,
            ((rightmostCoordinate - widthInPixels) * 100) / canvasAreaWidth
          );
        });
        appDefinitionChanged(newAppDefinition);
      }
    }
  };

  const alignHorizontallyCenter = () => {
    const { selectedComponentDefinitions, canvasAreaWidth } = getAlignmentInfo({
      selectedComponents,
      appDefinition,
      currentPageId,
    });
    if (canvasAreaWidth) {
      const widestLayout = selectedComponentDefinitions.reduce<null | PositionsType>(
        (widestComponent, [_componentId, definition]) => {
          if (widestComponent === null) return definition.layouts[currentLayout];
          else
            return definition.layouts[currentLayout].width > widestComponent.width
              ? definition.layouts[currentLayout]
              : widestComponent;
        },
        null
      );
      if (widestLayout !== null) {
        const widestLayoutWidthInPixels = widestLayout.width * (canvasAreaWidth / canvasColumnAmount);
        const widestLayoutLeftCoordinateInPixels = (widestLayout.left * canvasAreaWidth) / 100;
        const widestLayoutCenterInPixels = widestLayoutLeftCoordinateInPixels + widestLayoutWidthInPixels / 2;
        const newAppDefinition = cloneDeep(appDefinition);
        selectedComponentDefinitions.forEach(([componentId, definition]) => {
          const halfWidthInPixels =
            (definition.layouts[currentLayout].width * (canvasAreaWidth / canvasColumnAmount)) / 2;
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.left`,
            ((widestLayoutCenterInPixels - halfWidthInPixels) * 100) / canvasAreaWidth
          );
        });
        appDefinitionChanged(newAppDefinition);
      }
    }
  };

  return (
    <div className="multi-inspector__receptacle">
      <h6 className="multi-inspector__title">Horizontal:</h6>
      <IconAlignBoxLeftMiddle className="multi-inspector__icon" onClick={alignHorizontallyLeft} />
      <IconAlignBoxCenterMiddle className="multi-inspector__icon" onClick={alignHorizontallyCenter} />
      <IconAlignBoxRightMiddle className="multi-inspector__icon" onClick={alignHorizontallyRight} />
    </div>
  );
};
