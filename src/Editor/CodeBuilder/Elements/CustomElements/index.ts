import { TimeRunnerElements, timeRunnerTypeMaping } from './TimeRunnerElements';
import { PositionerElements, positionerTypeMaping } from './Positioner';
import { layeringTypeMaping, LayeringElements } from './Layering';
import { ResizerElements, resizerTypeMaping } from './Resizer';

export const CustomElements = {
  ...TimeRunnerElements,
  ...PositionerElements,
  ...LayeringElements,
  ...ResizerElements,
};

export const customTypeMaping = {
  ...positionerTypeMaping,
  ...timeRunnerTypeMaping,
  ...layeringTypeMaping,
  ...resizerTypeMaping,
};
