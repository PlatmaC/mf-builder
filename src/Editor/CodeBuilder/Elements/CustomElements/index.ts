import { TimeRunnerElements, timeRunnerTypeMaping } from './TimeRunnerElements';
import { PositionerElements, positionerTypeMaping } from './Positioner';
import { ResizerElements, resizerTypeMaping } from './Resizer';

export const CustomElements = {
  ...TimeRunnerElements,
  ...PositionerElements,
  ...ResizerElements,
};

export const customTypeMaping = {
  ...positionerTypeMaping,
  ...timeRunnerTypeMaping,
  ...resizerTypeMaping,
};
