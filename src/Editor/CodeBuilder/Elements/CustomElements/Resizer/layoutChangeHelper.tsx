import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { OnPropertyChangeType } from '@/Editor/CodeBuilder/Elements/CustomElements/Resizer/SizeManipulator';
import { ElementsToRenderPropsType } from '@/types/EditorTypes/InspectorElementTypes';
import { PositionsEnum } from '@/types/EditorTypes/AppTypes';

type ChangeComponentLayoutPropertyType = (
  props: { propery: PositionsEnum } & ElementsToRenderPropsType
) => OnPropertyChangeType;

export const changeComponentLayoutProperty: ChangeComponentLayoutPropertyType =
  ({ appDefinitionChanged, currentLayout, currentPageId, appDefinition, propery, component }) =>
  (newValue) => {
    const prevValue = appDefinition.pages[currentPageId].components[component.id].layouts[currentLayout][propery];
    if (prevValue !== newValue) {
      const newAppDefinition = cloneDeep(appDefinition);
      set(
        newAppDefinition,
        `pages.${currentPageId}.components.${component.id}.layouts.${currentLayout}.${propery}`,
        newValue
      );
      appDefinitionChanged(newAppDefinition);
    }
  };
