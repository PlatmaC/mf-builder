import { Dispatch, SetStateAction } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { OnPropertyChangeType } from '@/Editor/CodeBuilder/Elements/CustomElements/Resizer/SizeManipulator';
import { PositionsEnum } from '@/types/EditorTypes/AppTypes';

import { MultiInspectorDrillingPropsType } from '../MultiInspector';

type ChangeSelectedComponentLayoutsType = (
  props: {
    properyState: [number | undefined, Dispatch<SetStateAction<number | undefined>>];
    propery: PositionsEnum;
  } & MultiInspectorDrillingPropsType
) => OnPropertyChangeType;

export const changeSelectedComponentLayouts: ChangeSelectedComponentLayoutsType =
  ({
    properyState: [prevValue, setNewValue],
    appDefinitionChanged,
    selectedComponents,
    currentLayout,
    currentPageId,
    appDefinition,
    propery,
  }) =>
  (newValue) => {
    if (newValue !== prevValue) {
      const newAppDefinition = cloneDeep(appDefinition);
      selectedComponents.forEach((selectedComponent) => {
        set(
          newAppDefinition,
          `pages.${currentPageId}.components.${selectedComponent.id}.layouts.${currentLayout}.${propery}`,
          newValue
        );
      });
      appDefinitionChanged(newAppDefinition);
      setNewValue(newValue);
    }
  };
