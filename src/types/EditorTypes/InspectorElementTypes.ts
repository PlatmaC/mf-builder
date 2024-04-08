// types are not fully described and could have mistakes

import { DefaultSizeType, DefinitionType, EventNamesType, WidgetType } from './ComponentTypes';
import { Any, AnyFunction } from '../GeneralTypes/Any';
import {
  ComponentDefinitionChangedType,
  AppDefinitionChangeType,
  AppDefinitionType,
  LayoutsEnum,
  LayoutsType,
} from './AppTypes';

export type ElementsToRenderPropsType = {
  componentDefinitionChanged: ComponentDefinitionChangedType;
  appDefinitionChanged: AppDefinitionChangeType;
  multyParamsUpdater: MultyParamsUpdaterType;
  paramName: InspectorElementTypeEnum;
  appDefinition: AppDefinitionType;
  component: WidgetComponentsType;
  paramUpdated: ParamUpdatedType;
  onChange: (value: Any) => void;
  meta: InspectorElementMetaType;
  currentLayout: LayoutsEnum;
  forceCodeBox: AnyFunction;
  currentPageId: string;
  withFxButton: boolean;
  paramLabel: string;
  cyLabel: string;
  value: Any;
};

export type WidgetComponentsType = WidgetType & { layouts: LayoutsType; parent: Any };

export type ParamUpdatedType = (
  param: ParamObjectType,
  attr: string,
  value: Any,
  paramType: keyof DefinitionType
) => void;

export type MultyParamsUpdaterType = (
  multyParams: Array<{
    param: ParamObjectType;
    attr: string;
    value: Any;
    paramType: keyof DefinitionType;
  }>
) => void;

export type ParamObjectType = {
  name: string;
  type: InspectorElementTypeEnum;
};

export type InspectorElementMetaType = {
  displayName: string;
  type: InspectorElementTypeEnum;
};

export enum SizeUnitMeasurementEnum {
  'percent' = 'percent',
  'column' = 'column',
  'pixel' = 'pixel',
  'row' = 'row',
}

export type WidgetConfigType = Array<{
  name?: string;
  displayName?: string;
  description?: string;
  withoutDocumentationLink?: boolean;
  defaultSize?: DefaultSizeType;
  component?: string;
  others?: WidgetCongifOthersType;
  properties?: WidgetCongifPropertiesType;
  events?: WidgetCongifEventsType;
  styles?: WidgetCongifStylesType;
  exposedVariables?: Any;
  actions?: Any;
  definition: WidgetCongifDefinitionType;
  validation?: WidgetCongifValidationType;
  defaultChildren?: Any;
}>;

export type WidgetCongifDefinitionType = Record<string, Any> & {
  events: Array<Any>;
};

export type WidgetCongifPropertyType =
  | SimpleWidgetPropertyType
  | SelectWidgetPropertyType
  | RundomNumberGeneratorWidgetPropertyType
  | CodeWidgetPropertyType;

export type SimpleInspectorElementTypeEnum = Exclude<
  InspectorElementTypeEnum,
  'select' | 'intervalSelect' | 'rundomNumberGenerator' | 'code'
>;

export type SimpleWidgetPropertyType = {
  type: SimpleInspectorElementTypeEnum;
  displayName: string;
  buttonText?: never;
  validation?: Any;
  options?: never;
  tip?: never;
};

export type SelectWidgetPropertyType = {
  type: InspectorElementTypeEnum.select | InspectorElementTypeEnum.intervalSelect;
  options: Array<{ name: string; value: string }>;
  displayName: string;
  buttonText?: never;
  validation?: Any;
};

export type RundomNumberGeneratorWidgetPropertyType = {
  type: InspectorElementTypeEnum.rundomNumberGenerator;
  displayName: string;
  buttonText: string;
  validation?: Any;
  options?: never;
};

export type CodeWidgetPropertyType = {
  type: InspectorElementTypeEnum.code;
  displayName: string;
  buttonText?: never;
  validation?: Any;
  options?: {
    mode: string;
    theme: string;
    className: string;
  };
  tip?: string;
};

export type WidgetCongifEventsType = Partial<
  Record<EventNamesType, Omit<WidgetCongifPropertyType, 'validation' | 'type'>>
>;

export type WidgetCongifOthersType = Record<string, Omit<WidgetCongifPropertyType, 'validation'>>;

export type WidgetCongifStylesType = WidgetCongifPropertiesType;

export type WidgetCongifPropertiesType = Record<
  string,
  WidgetCongifPropertyType & ConditionWidgetRenderType & { withFxButton?: boolean }
>;

export type WidgetCongifValidationType = Record<string, WidgetCongifPropertyType>;

export type ConditionWidgetRenderType = {
  conditionallyRender?: {
    key: string;
    value: Any;
  };
};

export type ElementMapingType = Exclude<InspectorElementTypeEnum, 'array' | 'iconPicker'>;

export enum InspectorElementTypeEnum {
  'code' = 'code',
  'toggle' = 'toggle',
  'text' = 'text',
  'string' = 'string',
  'color' = 'color',
  'json' = 'json',
  'array' = 'array',
  'positioner' = 'positioner',
  'select' = 'select',
  'iconPicker' = 'iconPicker',
  'alignButtons' = 'alignButtons',
  'number' = 'number',
  'boxShadow' = 'boxShadow',
  'resizer' = 'resizer',
  'rundomNumberGenerator' = 'rundomNumberGenerator',
  'toggleAfterTime' = 'toggleAfterTime',
  'intervalSelect' = 'intervalSelect',
  'daySelector' = 'daySelector',
}
