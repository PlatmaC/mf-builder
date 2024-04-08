// types are not fully described and could have mistakes

import { ComponentType, ParentType, WidgetType } from './ComponentTypes';
import { Any, AnyFunction } from '../GeneralTypes/Any';

export type AppDefinitionChangeType = (
  newDefinition: AppDefinitionType,
  options?: AppDefinitionChangeOptionType
) => void;

export type ComponentDefinitionChangedType = (newComponent: WidgetType & { layouts: LayoutsType; parent: Any }) => void;

export type AppDefinitionChangeOptionType = {
  versionChanged?: boolean;
  skipAutoSave?: boolean;
};

export type AppDefinitionType = {
  globalSettings: {
    appInMaintenance: boolean;
    backgroundFxQuery: string;
    canvasBackgroundColor: string;
    canvasMaxHeight: string;
    canvasMaxWidth: string;
    canvasMaxWidthType: string;

    hideHeader: boolean;
  };
  homePageId: string;
  showViewerNavigation: boolean;
  pages: Record<string, { components: AppDefinitionComponentsType; handle: string; name: string }>;
};

export type ContainerPropsType = {
  addDefaultChildren: boolean;
  appDefinitionChanged: AppDefinitionChangeType;
  appDefinition: AppDefinitionType;
  appLoading: boolean;
  childComponents: Any;
  currentLayout: LayoutsEnum;
  currentPageId: string;
  currentState: CurrentStateType;
  darkMode: boolean;
  deviceWindowWidth: number;
  hoveredComponent: boolean;
  mode: AppModeEnum;
  onComponentHover: OnComponentHoverType;
  onComponentOptionChanged: OnComponentOptionChangedType;
  onComponentOptionsChanged: OnComponentOptionsChangedType;
  onEvent: OnEventType;
  removeComponent: RemoveComponentType;
  selectedComponents: SelectedComponentsType;
  setSelectedComponent: SetSetSelectedComponentType;
  sideBarDebugger: SideBarDebuggerType;
  snapToGrid: boolean;
  zoomLevel: number;
};

export type OnComponentHoverType = AnyFunction;

export type OnComponentOptionChangedType = AnyFunction;

export type OnComponentOptionsChangedType = AnyFunction;

export type CurrentStateType = {
  client: Record<string, Any>;
  components: Record<string, Any>;
  errors: Record<string, Any>;
  globals: GlobalsStateType;
  page: PageStateTypes;
  queries: QueriesTypeState;
  server: ServerTypeState;
  variables: Record<string, Any>;
};

export type GlobalsStateType = {
  theme: { name: string };
  urlparams: Record<string, Any>;
};

export type PageStateTypes = {
  handle: string;
  id: string;
  name: string;
  variables: Record<string, Any>;
};

export type CustomResolvablesType = Any;

export type ServerTypeState = Record<string, Any>;

export type QueriesTypeState = Record<string, Any>;

export type OnEventType = AnyFunction;

export type RemoveComponentType = AnyFunction;

export type SelectedComponentsType = Array<{ id: string; component: ComponentType }>;

export type SetSetSelectedComponentType = (id: string, component: ComponentType, multiSelect: boolean) => void;

export type SideBarDebuggerType = {
  generateErrorLogs: AnyFunction;
  error: AnyFunction;
  flush: AnyFunction;
};

export type AppDefinitionComponentsType = Record<
  string,
  { component: ComponentType; layouts: LayoutsType; withDefaultChildren: boolean; parent: ParentType }
>;

export type LayoutsType = {
  [LayoutsEnum.desktop]: PositionsType;
  [LayoutsEnum.mobile]: PositionsType;
};

export type PositionsType = {
  [PositionsEnum.height]: number;
  [PositionsEnum.left]: number;
  [PositionsEnum.top]: number;
  [PositionsEnum.width]: number;
};

export enum AppModeEnum {
  'edit' = 'edit',
  'view' = 'view',
}

export enum PositionsEnum {
  'height' = 'height',
  'left' = 'left',
  'top' = 'top',
  'width' = 'width',
}

export enum LayoutsEnum {
  'mobile' = 'mobile',
  'desktop' = 'desktop',
}

export type SwitchSidebarTabType = (sideBarTabNumber: 1 | 2 | 3) => void;

export type RouterPagesTypes = {
  innerPage?: string;
  pageHandle?: string;
  versionId?: string;
  subPage?: string;
  id: string;
};
