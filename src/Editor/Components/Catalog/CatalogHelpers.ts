import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { isExpectedDataType, resolveReferences, resolveWidgetFieldValue } from '@/_helpers/utils';
import { AppModeEnum, RouterPagesTypes } from '@/types/EditorTypes/AppTypes';

import { CategoryType, GetRedirectPathType, UseCatalogPathType, UseCatalogVariablesType } from './CatalogTypes';

export const useCatalogVariables: UseCatalogVariablesType = ({ styles, currentState, properties }) => {
  return useMemo(() => {
    return {
      visibility:
        typeof styles.visibility !== 'boolean'
          ? Boolean(resolveWidgetFieldValue(styles?.visibility, currentState))
          : styles.visibility,
      disabledState:
        typeof styles.disabledState !== 'boolean'
          ? Boolean(resolveWidgetFieldValue(styles.disabledState, currentState))
          : styles.disabledState,
      defaultCategory:
        typeof properties.defaultCategory !== 'string'
          ? String(resolveWidgetFieldValue(properties.defaultCategory, currentState))
          : properties.defaultCategory,
      hideCategory:
        typeof properties.hideCategory !== 'boolean'
          ? Boolean(resolveWidgetFieldValue(properties.hideCategory, currentState))
          : properties.hideCategory,
      categories: resolveWidgetFieldValue(
        isExpectedDataType(resolveReferences(properties.categories, currentState), 'array'),
        currentState
      ).map((parsedCategory: CategoryType, index: number) => ({
        ...parsedCategory,
        id: parsedCategory.id ? parsedCategory.id : index,
      })),
      isRenderOnlyActiveCategory:
        typeof properties?.isRenderOnlyActiveCategory !== 'boolean'
          ? Boolean(resolveWidgetFieldValue(properties?.isRenderOnlyActiveCategory, currentState))
          : properties?.isRenderOnlyActiveCategory,
      highlightColor:
        typeof styles?.highlightColor !== 'string'
          ? String(resolveWidgetFieldValue(styles?.highlightColor, currentState))
          : styles?.highlightColor,
      isInnerPageShown:
        typeof properties.isInnerPageShown !== 'boolean'
          ? Boolean(resolveWidgetFieldValue(properties.isInnerPageShown, currentState))
          : properties.isInnerPageShown,
      isLoading:
        typeof properties.loadingState !== 'boolean'
          ? Boolean(resolveWidgetFieldValue(properties.loadingState, currentState))
          : properties.loadingState,
      isInnerPageLoading:
        typeof properties.innerPageLoadingState !== 'boolean'
          ? Boolean(resolveWidgetFieldValue(properties.innerPageLoadingState, currentState))
          : properties.innerPageLoadingState,
    };
  }, [properties, styles, currentState]);
};

export const useRouterPages: UseCatalogPathType = ({ mode, currentState }) => {
  const [searchParams] = useSearchParams();
  const { subPage, pageHandle, id: appId, versionId, innerPage } = useParams<RouterPagesTypes>();

  const getRedirectPath: GetRedirectPathType = (subPage, innerPage) => {
    const queryParams = searchParams.toString();
    const newQueryParams = queryParams ? `?${queryParams}` : '';
    const projectPage = mode === AppModeEnum.edit ? 'apps' : 'applications';
    const version = versionId ? `/versions/${versionId}` : '';
    const appPage = pageHandle ? pageHandle : currentState.page.handle;
    const innerPagePath = innerPage ? `/${innerPage}` : '';
    return `/${projectPage}/${appId}${version}/${appPage}/${subPage ?? ''}${innerPagePath}${newQueryParams}`;
  };

  return { getRedirectPath, subPage, pageHandle, appId, versionId, innerPage };
};
