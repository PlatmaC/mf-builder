import upperFirst from 'lodash/upperFirst';

import { InspectorElementTypeEnum } from '@/types/EditorTypes/InspectorElementTypes';

import { RundomNumberGenerator } from './RundomNumberGenerator';
import { IntervalSelect } from './IntervalSelect';
import { ToggleAfterTime } from './ToggleAfterTime';
import { DaySelector } from './DaySelector';

export const TimeRunnerElements = { RundomNumberGenerator, ToggleAfterTime, IntervalSelect, DaySelector };

export const timeRunnerTypeMaping = {
  [InspectorElementTypeEnum.rundomNumberGenerator]: upperFirst(InspectorElementTypeEnum.rundomNumberGenerator),
  [InspectorElementTypeEnum.toggleAfterTime]: upperFirst(InspectorElementTypeEnum.toggleAfterTime),
  [InspectorElementTypeEnum.intervalSelect]: upperFirst(InspectorElementTypeEnum.intervalSelect),
  [InspectorElementTypeEnum.daySelector]: upperFirst(InspectorElementTypeEnum.daySelector),
};
