import { AppModeEnum, CurrentStateType, RouterPagesTypes } from '@/types/EditorTypes/AppTypes';
import { ComponentToRenderProps } from '@/types/EditorTypes/ComponentTypes';
import { Any } from '@/types/GeneralTypes/Any';

export type CategoryType = { name?: string; urlpath?: string; id?: number | string };

export type CatalogPropertyValuesType = {
  defaultInnerPageSpinerTime: number;
  isRenderOnlyActiveCategory: Any;
  categories: Array<CategoryType>;
  innerPageLoadingState: Any;
  isInnerPageShown: boolean;
  isSpinerShown: boolean;
  defaultCategory: Any;
  hideCategory: Any;
  loadingState: Any;
};

export type CatalogStylesyValuesType = {
  boxShadow: Any;
  disabledState: Any;
  highlightColor: Any;
  visibility: Any;
};

export type CatalogEvents = 'onCategorySwitch' | 'onRedirectToInnerPage' | 'onWidgetInit';

export type CatalogPropsType = ComponentToRenderProps<
  CatalogPropertyValuesType,
  CatalogStylesyValuesType,
  CatalogEvents
>;

export type UseCatalogVariablesPropsType = {
  properties: CatalogPropertyValuesType;
  styles: CatalogStylesyValuesType;
  currentState: CurrentStateType;
};

export type CatalogVariablesType = {
  isRenderOnlyActiveCategory: boolean;
  categories: Array<CategoryType>;
  isInnerPageLoading: boolean;
  isInnerPageShown: boolean;
  defaultCategory: string;
  disabledState: boolean;
  highlightColor: string;
  hideCategory: boolean;
  visibility: boolean;
  isLoading: boolean;
};

export type UseCatalogVariablesType = (props: UseCatalogVariablesPropsType) => CatalogVariablesType;

export type UseCatalogPathPropsType = { mode: AppModeEnum; currentState: CurrentStateType };

export type GetRedirectPathType = (subPage?: string, innerPage?: string) => string;

export type UseCatalogPathReturnType = { getRedirectPath: GetRedirectPathType } & Omit<RouterPagesTypes, 'id'> & {
    appId?: string;
  };

export type UseCatalogPathType = (props: UseCatalogPathPropsType) => UseCatalogPathReturnType;
