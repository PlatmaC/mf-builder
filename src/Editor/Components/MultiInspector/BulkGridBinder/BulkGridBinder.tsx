import { useMemo } from 'react';
import cn from 'classnames';

import {
  CheckIsBindedToGridType,
  checkIsBindedToGrid,
} from '@/Editor/CodeBuilder/Elements/CustomElements/Positioner/gridBinderHelper';

import { roundAllComponentLayoutProperties } from './bulkGridBinderHelper';
import { MultiInspectorDrillingPropsType } from '../MultiInspector';
import { getAlignmentInfo } from '../MultiInspectorHelper';

export const BulkGridBinder = ({
  appDefinitionChanged,
  selectedComponents,
  appDefinition,
  currentPageId,
  currentLayout,
}: MultiInspectorDrillingPropsType) => {
  const { isAllWidgetBindedToGrid, selectedComponentDefinitions, roundedProperties } = useMemo(() => {
    const { selectedComponentDefinitions } = getAlignmentInfo({ appDefinition, currentPageId, selectedComponents });
    const roundedProperties = selectedComponentDefinitions.reduce<{
      [key: string]: ReturnType<CheckIsBindedToGridType>;
    }>((accum, [id, component]) => {
      return { ...accum, [id]: checkIsBindedToGrid({ layouts: component.layouts, currentLayout }) };
    }, {});
    return {
      isAllWidgetBindedToGrid: Object.values(roundedProperties).every((property) => property.isBindedToGrid),
      selectedComponentDefinitions,
      roundedProperties,
    };
  }, [appDefinition, currentLayout, currentPageId, selectedComponents]);

  return (
    <button
      className={cn('layout-changer__button layout-changer__button--margin', {
        ['layout-changer__button--selected']: !isAllWidgetBindedToGrid,
      })}
      onClick={roundAllComponentLayoutProperties({
        selectedComponentDefinitions,
        isAllWidgetBindedToGrid,
        appDefinitionChanged,
        roundedProperties,
        appDefinition,
        currentLayout,
        currentPageId,
      })}
    >
      Bind to grid
    </button>
  );
};
