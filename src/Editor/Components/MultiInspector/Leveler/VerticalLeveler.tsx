import { IconAlignBoxCenterMiddle, IconAlignBoxBottomCenter, IconAlignBoxTopCenter } from '@tabler/icons-react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { PositionsType } from '@/types/EditorTypes/AppTypes';

import { MultiInspectorDrillingPropsType } from '../MultiInspector';
import { getAlignmentInfo } from '../MultiInspectorHelper';

import '@/_styles/editor/multi-inspector.scss';

export const VerticalLeveler = ({
  appDefinitionChanged,
  selectedComponents,
  currentPageId,
  currentLayout,
  appDefinition,
}: MultiInspectorDrillingPropsType) => {
  const alignVeryicallyTop = () => {
    const { selectedComponentDefinitions } = getAlignmentInfo({ selectedComponents, appDefinition, currentPageId });
    const topmostCoordinate = selectedComponentDefinitions.reduce((mostTop, [_componentId, definition]) => {
      if (mostTop === null) return definition.layouts[currentLayout].top;
      else return Math.min(definition.layouts[currentLayout].top, mostTop);
    }, null);
    if (topmostCoordinate !== null) {
      const newAppDefinition = cloneDeep(appDefinition);
      selectedComponentDefinitions.forEach(([componentId]) => {
        set(
          newAppDefinition,
          `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.top`,
          topmostCoordinate
        );
      });
      appDefinitionChanged(newAppDefinition);
    }
  };

  const alignVerticallyBottom = () => {
    const { selectedComponentDefinitions, canvasAreaWidth } = getAlignmentInfo({
      selectedComponents,
      appDefinition,
      currentPageId,
    });
    if (canvasAreaWidth) {
      const bottommostCoordinate = selectedComponentDefinitions.reduce((mostBottom, [_componentId, definition]) => {
        const bottomCoordinate = definition.layouts[currentLayout].top + definition.layouts[currentLayout].height;
        if (mostBottom === null) return bottomCoordinate;
        else return Math.max(bottomCoordinate, mostBottom);
      }, null);
      if (bottommostCoordinate !== null) {
        const newAppDefinition = cloneDeep(appDefinition);
        selectedComponentDefinitions.forEach(([componentId, definition]) => {
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.top`,
            bottommostCoordinate - definition.layouts[currentLayout].height
          );
        });
        appDefinitionChanged(newAppDefinition);
      }
    }
  };

  const alignVerticallyMiddle = () => {
    const { selectedComponentDefinitions, canvasAreaWidth } = getAlignmentInfo({
      selectedComponents,
      appDefinition,
      currentPageId,
    });
    if (canvasAreaWidth) {
      const highestLayout = selectedComponentDefinitions.reduce<null | PositionsType>(
        (highestComponent, [_componentId, definition]) => {
          if (highestComponent === null) return definition.layouts[currentLayout];
          else
            return definition.layouts[currentLayout].height > highestComponent.height
              ? definition.layouts[currentLayout]
              : highestComponent;
        },
        null
      );
      if (highestLayout !== null) {
        const highestLayoutMiddle = highestLayout.top + highestLayout.height / 2;
        const newAppDefinition = cloneDeep(appDefinition);
        selectedComponentDefinitions.forEach(([componentId, definition]) => {
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${componentId}.layouts.${currentLayout}.top`,
            highestLayoutMiddle - definition.layouts[currentLayout].height / 2
          );
        });
        appDefinitionChanged(newAppDefinition);
      }
    }
  };

  return (
    <div className="multi-inspector__receptacle">
      <h6 className="multi-inspector__title">Vertical:</h6>
      <IconAlignBoxTopCenter className="multi-inspector__icon" onClick={alignVeryicallyTop} />
      <IconAlignBoxCenterMiddle
        className="multi-inspector__icon multi-inspector__icon--rotated"
        onClick={alignVerticallyMiddle}
      />
      <IconAlignBoxBottomCenter className="multi-inspector__icon" onClick={alignVerticallyBottom} />
    </div>
  );
};
