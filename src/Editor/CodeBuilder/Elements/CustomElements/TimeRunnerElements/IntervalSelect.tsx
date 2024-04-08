import { ElementsToRenderPropsType, InspectorElementTypeEnum } from '@/types/EditorTypes/InspectorElementTypes';

import { RepeatByEnum } from './TimeRunnerElementsTypes';
import { Select } from '../../Select';

export const IntervalSelect = ({ onChange, multyParamsUpdater, ...restProps }: ElementsToRenderPropsType) => {
  const handleOnChange = (repeatBy: RepeatByEnum) => {
    const type = InspectorElementTypeEnum.code;
    if (repeatBy === RepeatByEnum.interval) {
      multyParamsUpdater([
        { param: { name: 'interval', type }, attr: 'isActive', value: true, paramType: 'properties' },
        { param: { name: 'startTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'endTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'atTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'onDays', type }, attr: 'isActive', value: false, paramType: 'properties' },
      ]);
    } else if (repeatBy === RepeatByEnum.betweenTimes) {
      multyParamsUpdater([
        { param: { name: 'interval', type }, attr: 'isActive', value: true, paramType: 'properties' },
        { param: { name: 'startTime', type }, attr: 'isActive', value: true, paramType: 'properties' },
        { param: { name: 'endTime', type }, attr: 'isActive', value: true, paramType: 'properties' },
        { param: { name: 'atTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'onDays', type }, attr: 'isActive', value: true, paramType: 'properties' },
      ]);
    } else if (repeatBy === RepeatByEnum.specificTime) {
      multyParamsUpdater([
        { param: { name: 'interval', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'startTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'endTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'atTime', type }, attr: 'isActive', value: true, paramType: 'properties' },
        { param: { name: 'onDays', type }, attr: 'isActive', value: true, paramType: 'properties' },
      ]);
    } else {
      multyParamsUpdater([
        { param: { name: 'interval', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'startTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'endTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'atTime', type }, attr: 'isActive', value: false, paramType: 'properties' },
        { param: { name: 'onDays', type }, attr: 'isActive', value: false, paramType: 'properties' },
      ]);
    }
    onChange(repeatBy);
  };

  return <Select onChange={handleOnChange} {...restProps} withFxButton={false} />;
};
