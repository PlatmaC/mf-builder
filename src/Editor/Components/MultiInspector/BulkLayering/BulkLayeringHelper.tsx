import { Dispatch, SetStateAction } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { OnPropertyChangeType } from '@/Editor/CodeBuilder/Elements/CustomElements/Resizer/SizeManipulator';

import { MultiInspectorDrillingPropsType } from '../MultiInspector';

type BubblingLayerPropsType = (
  props: {
    properyState: [number | undefined, Dispatch<SetStateAction<number | undefined>>];
  } & MultiInspectorDrillingPropsType
) => OnPropertyChangeType;

export const bubblingLayer: BubblingLayerPropsType =
  ({
    properyState: [prevValue, setNewValue],
    appDefinitionChanged,
    selectedComponents,
    currentPageId,
    appDefinition,
  }) =>
  (newValue) => {
    if (newValue !== prevValue) {
      const newAppDefinition = cloneDeep(appDefinition);
      selectedComponents.forEach((selectedComponent) => {
        set(
          newAppDefinition,
          `pages.${currentPageId}.components.${selectedComponent.id}.component.definition.general.zIndex.value`,
          newValue
        );
      });
      appDefinitionChanged(newAppDefinition);
      setNewValue(newValue);
    }
  };
