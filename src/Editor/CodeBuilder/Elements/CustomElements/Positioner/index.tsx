import upperFirst from 'lodash/upperFirst';

import { InspectorElementTypeEnum } from '@/types/EditorTypes/InspectorElementTypes';

import { Positioner } from './Positioner';

export const PositionerElements = { Positioner };

export const positionerTypeMaping = {
  [InspectorElementTypeEnum.positioner]: upperFirst(InspectorElementTypeEnum.positioner),
};
