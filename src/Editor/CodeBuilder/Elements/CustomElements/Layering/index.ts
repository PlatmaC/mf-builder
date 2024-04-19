import upperFirst from 'lodash/upperFirst';

import { InspectorElementTypeEnum } from '@/types/EditorTypes/InspectorElementTypes';

import { Layering } from './Layering';

export const LayeringElements = { Layering };

export const layeringTypeMaping = {
  [InspectorElementTypeEnum.layering]: upperFirst(InspectorElementTypeEnum.layering),
};
