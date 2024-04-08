import cloneDeep from 'lodash/cloneDeep';

import {
  CheckIsBindedToGridType,
  mutateComponentLayoutProperties,
} from '@/Editor/CodeBuilder/Elements/CustomElements/Positioner/gridBinderHelper';
import { AppDefinitionChangeType, AppDefinitionType, LayoutsEnum } from '@/types/EditorTypes/AppTypes';

import { SelectedComponentDefinitionsType } from '../MultiInspectorHelper';

type RoundAllComponentLayoutPropertiesType = (props: {
  roundedProperties: { [key: string]: ReturnType<CheckIsBindedToGridType> };
  selectedComponentDefinitions: SelectedComponentDefinitionsType;
  appDefinitionChanged: AppDefinitionChangeType;
  isAllWidgetBindedToGrid: boolean;
  appDefinition: AppDefinitionType;
  currentLayout: LayoutsEnum;
  currentPageId: string;
}) => () => void;

export const roundAllComponentLayoutProperties: RoundAllComponentLayoutPropertiesType =
  ({
    selectedComponentDefinitions,
    isAllWidgetBindedToGrid,
    appDefinitionChanged,
    roundedProperties,
    appDefinition,
    currentLayout,
    currentPageId,
  }) =>
  () => {
    if (!isAllWidgetBindedToGrid) {
      let newAppDefinition = cloneDeep(appDefinition);
      selectedComponentDefinitions.forEach(([componentId]) => {
        newAppDefinition = mutateComponentLayoutProperties({
          roundedProperty: roundedProperties[componentId],
          newAppDefinition,
          currentLayout,
          currentPageId,
          componentId,
        });
      });
      appDefinitionChanged(newAppDefinition);
    }
  };
