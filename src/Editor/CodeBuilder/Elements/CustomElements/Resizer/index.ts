import upperFirst from 'lodash/upperFirst';

import { InspectorElementTypeEnum } from '@/types/EditorTypes/InspectorElementTypes';

import { Resizer } from './Resizer';

export const ResizerElements = { Resizer };

export const resizerTypeMaping = { [InspectorElementTypeEnum.resizer]: upperFirst(InspectorElementTypeEnum.resizer) };
