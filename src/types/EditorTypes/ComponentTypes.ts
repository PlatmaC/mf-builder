// types are not fully described and could have mistakes

import { allEventNames } from '@/_helpers/constants';

import { Any, AnyFunction, AnyObject } from '../GeneralTypes/Any';
import {
  AppModeEnum,
  ComponentDefinitionChangedType,
  ContainerPropsType,
  CurrentStateType,
  OnComponentOptionChangedType,
  OnComponentOptionsChangedType,
  OnEventType,
  RemoveComponentType,
} from './AppTypes';

export type WidgetType = {
  component: ComponentType;
  id: string;
};

export type ComponentType = {
  actions: ActionsType;
  component: string;
  defaultSize: DefaultSizeType;
  definition: DefinitionType;
  description: string;
  displayName: string;
  events: ComponentEventsType;
  exposedVariables: ExposedVariablesType;
  general: GeneralType;
  generalStyles: GeneralStylesType;
  name: string;
  others: OthersType;
  properties: PropertiesType;
  styles: StylesType;
  validate: boolean;
};

export type ActionsType = Array<Any>;

export type DefaultSizeType = {
  height: number;
  width: number;
};

export type DefinitionType = {
  events: DefinitionEventsType;
  exposedVariables: ExposedVariablesType;
  general: GeneralType;
  generalStyles: GeneralStylesType;
  others: OthersType;
  properties: PropertiesType;
  styles: StylesType;
  validate: boolean;
  validation: ComponentValidationType;
  withoutDocumentationLink?: boolean;
};

export type DefinitionEventsType = Array<Any>;

export type ExposedVariablesType = Record<string, Any>;

export type GeneralType = Record<string, Any>;

export type GeneralStylesType = Record<string, Record<string, Any>>;

export type OthersType = {
  showOnDesktop?: { value: boolean };
  showOnMobile?: { value: boolean };
};

export type PropertiesType = Record<string, SinglePropertyType>;
export type StylesType = Record<string, SinglePropertyType>;

export type SinglePropertyType = {
  value?: Any;
  displayName: string;
  type: string;
  validation: PropertyValidationType;
};

export type PropertyValidationType = {
  schema: Record<string, Any>;
  withErrorMessage?: string;
};

export type ComponentValidationType = Record<string, Any>;

export type ComponentEventsType = Record<string, Any>;

export type ComponentToRenderProps<
  P extends ComponentToRenderPropertiesType = ComponentToRenderPropertiesType,
  S extends ComponentToRenderStylesType = ComponentToRenderStylesType,
  E extends EventNamesType = EventNamesType
> = {
  canvasWidth: number;
  changeCanDrag: ChangeCanDragType;
  childComponents: ChildComponentsType;
  component: ComponentType;
  componentDefinitionChanged?: ComponentDefinitionChangedType;
  containerProps: ContainerPropsType;
  currentState: CurrentStateType;
  customResolvables: CustomResolvablesType;
  darkMode: boolean;
  dataCy: string;
  exposeToCodeHinter: ExposeToCodeHinterType;
  exposedVariables: ExposedVariablesType;
  onComponentOptionChanged: OnComponentOptionChangedType;
  onComponentOptionsChanged: OnComponentOptionsChangedType;
  paramUpdated: ComponentToRenderParamUpdatedType;
  parentId?: string;
  onEvent: OnEventType;
  properties: P;
  fireEvent: FireEventType<E>;
  registerAction: RegisterActionType;
  removeComponent: RemoveComponentType;
  setExposedVariable: SetExposedVariableType;
  setExposedVariables: SetExposedVariablesType;
  setProperty: ComponentToRenderSetPropertyType;
  variablesExposedForPreview: VariablesExposedForPreviewType;
  styles: S;
  validate: ComponentToRenderValidateType;
  mode: AppModeEnum;
  height: number;
  id: string;
  width: number;
};

export type ComponentToRenderPropertiesType = Record<string, Any>;

export type CustomResolvablesType = Any;

export type ChildComponentsType = Any;

export type ChangeCanDragType = AnyFunction;

export type ExposeToCodeHinterType = AnyFunction;

export type EventNamesType = (typeof allEventNames)[number];

export type FireEventType<T extends EventNamesType = EventNamesType> = (eventName: T, options?: AnyObject) => void;

export type ComponentToRenderParamUpdatedType = (id: string, param: string, value: Any) => void;

export type RegisterActionType = AnyFunction;

export type SetExposedVariablesType = (variables: Record<string, Any>) => Promise<Any>;

export type SetExposedVariableType = (variableName: string, value: Any) => Promise<Any>;

export type ComponentToRenderSetPropertyType = (property: string, value: Any) => void;

export type ComponentToRenderValidateType = AnyFunction;

export type VariablesExposedForPreviewType = Any;

export type ComponentToRenderStylesType = Record<string, Any>;

export enum TabWidthEnum {
  'split' = 'split',
  'auto' = 'auto',
}

export type ParentType = undefined | string;

export enum RelationshipEnum {
  'parent' = 'parent',
  'self' = 'self',
}
