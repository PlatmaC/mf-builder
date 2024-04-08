import React, { useRef, useEffect, useMemo, memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { AppModeEnum } from '@/types/EditorTypes/AppTypes';

import { useRouterPages, useCatalogVariables } from './CatalogHelpers';
import { CatalogPropsType, CategoryType } from './CatalogTypes';
import { SubCustomDragLayer } from '../../SubCustomDragLayer';
import { SubContainer } from '../../SubContainer';

import '@/_styles/widgets/catalog.scss';

export const Catalog = memo(
  ({
    componentDefinitionChanged,
    setExposedVariables,
    setExposedVariable,
    customResolvables,
    exposedVariables,
    removeComponent,
    registerAction,
    containerProps,
    currentState,
    properties,
    component,
    fireEvent,
    darkMode,
    height,
    styles,
    dataCy,
    mode,
    width,
    id,
  }: CatalogPropsType) => {
    const { innerPage, subPage, getRedirectPath } = useRouterPages({ mode, currentState });
    const [isInnerPageLoaded, setIsInnerPageLoaded] = useState(false);
    const parentRef = useRef<HTMLLIElement | null>(null);
    const navigate = useNavigate();
    const {
      isRenderOnlyActiveCategory,
      isInnerPageLoading,
      isInnerPageShown,
      defaultCategory,
      highlightColor,
      disabledState,
      hideCategory,
      visibility,
      categories,
      isLoading,
    } = useCatalogVariables({ styles, properties, currentState });
    const isRenderInnerPageContent = innerPage || (containerProps.mode === AppModeEnum.edit && isInnerPageShown);

    const currentCategory = useMemo(() => {
      if (subPage) {
        const currentCategoryId = categories.find((categories) => categories.urlpath === subPage)?.id;
        return currentCategoryId ? String(currentCategoryId) : currentCategoryId;
      } else return String(defaultCategory ?? 1);
    }, [categories, defaultCategory, subPage]);

    const checkIsInnerPageHidden: boolean = useMemo(() => {
      if (isInnerPageLoading) return true;
      if (containerProps.mode === AppModeEnum.edit && isInnerPageShown) return false;
      else if (!isInnerPageLoaded) return true;
      else if (innerPage) return false;
      else return true;
    }, [containerProps.mode, innerPage, isInnerPageLoading, isInnerPageShown, isInnerPageLoaded]);

    const isCurrentCategoryAvailable: boolean = useMemo(() => {
      const isExist = categories.some((category) => String(category.id) === currentCategory);
      return isExist ? isExist : Boolean(innerPage || isInnerPageShown);
    }, [categories, currentCategory, innerPage, isInnerPageShown]);

    useEffect(() => {
      if (properties.defaultInnerPageSpinerTime) {
        if (innerPage) setTimeout(() => setIsInnerPageLoaded(true), properties.defaultInnerPageSpinerTime);
        else setIsInnerPageLoaded(false);
      } else setIsInnerPageLoaded(true);
    }, [innerPage, properties.defaultInnerPageSpinerTime]);

    useEffect(() => {
      setExposedVariables({
        currentCategoryId: currentCategory ? String(currentCategory) : currentCategory,
        currentCategoryInfo: categories.find((category) => String(category.id) === String(currentCategory)),
      }).then(() => fireEvent('onCategorySwitch'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategory]);

    useEffect(() => {
      setExposedVariable('currentInnerPageId', innerPage ? String(innerPage) : innerPage).then(
        () => innerPage && fireEvent('onRedirectToInnerPage')
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [innerPage]);

    useEffect(() => {
      // this setTimeout is a dirty hack according to tooljet logic that doesn't set exposed variables on init without delay
      setTimeout(() => {
        setExposedVariables({
          currentCategoryId: currentCategory ? String(currentCategory) : currentCategory,
          currentCategoryInfo: categories.find((category) => String(category.id) === String(currentCategory)),
        }).then(() => fireEvent('onCategorySwitch'));
      }, 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fireEvent('onWidgetInit'), []);

    useEffect(() => {
      registerAction(
        'setCurrentCategory',
        (categoryId: string) => {
          if (categoryId) {
            const categoryUrlPath = categories.find((category) => String(category.id) === String(categoryId))?.urlpath;
            categoryUrlPath && navigate(getRedirectPath(categoryUrlPath));
          }
        },
        [categories]
      );
      registerAction(
        'redirectToInnerPage',
        (categoryId: string | number, productId: string | number) => {
          if (categoryId && productId) {
            const categoryUrlPath = categories.find((category) => String(category.id) === String(categoryId))?.urlpath;
            categoryUrlPath && navigate(getRedirectPath(categoryUrlPath, String(productId)));
          }
        },
        [categories]
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    const setParrentRef = (category: CategoryType) => (htmlNode: HTMLLIElement | null) => {
      if (currentCategory === String(category.id) && !innerPage) {
        if (containerProps.mode === AppModeEnum.edit && !isInnerPageShown) parentRef.current = htmlNode;
        else if (containerProps.mode === AppModeEnum.view) parentRef.current = htmlNode;
      }
    };

    const setInnerPageParrentRef = (htmlNode: HTMLLIElement | null) => {
      if (containerProps.mode === AppModeEnum.edit && isInnerPageShown) parentRef.current = htmlNode;
      else if (innerPage) parentRef.current = htmlNode;
    };

    const checkIsCategoryHidden = (category: CategoryType): boolean => {
      if (currentCategory !== String(category.id) || innerPage) return true;
      else if (containerProps.mode === AppModeEnum.edit && isInnerPageShown) return true;
      else return false;
    };

    const renderCategoryContent = (componentId: string, subId?: number | string) => {
      return (
        <SubContainer
          componentDefinitionChanged={componentDefinitionChanged}
          customResolvables={customResolvables}
          exposedVariables={exposedVariables}
          parent={`${componentId}-${subId}`}
          containerCanvasWidth={width - 4}
          selectedComponent={undefined}
          onOptionChange={undefined}
          parentComponent={component}
          parentRef={parentRef}
          readOnly={undefined}
          {...containerProps}
          removeComponent={removeComponent}
        />
      );
    };

    return (
      <section
        className={cn('catalog__wrapper', {
          ['catalog__wrapper--dark']: darkMode,
          ['catalog__wrapper--hidden']: !visibility,
          ['catalog__wrapper--disabled']: disabledState,
        })}
        style={{ boxShadow: styles.boxShadow, height }}
        data-cy={dataCy}
      >
        {isLoading || (properties.isSpinerShown && categories.length === 0) ? (
          <div className={cn('catalog__preloader', { ['catalog__preloader--dark']: darkMode })}>
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          <>
            {!isRenderInnerPageContent && (
              <ul
                className={cn('catalog__container', {
                  ['catalog__container--hidden']: hideCategory,
                  ['catalog__container--dark']: darkMode,
                })}
              >
                {categories.map((category) => (
                  <Link
                    className={cn('catalog__nav-link', {
                      ['catalog__nav-link--active']: currentCategory === String(category.id),
                    })}
                    style={{
                      borderBottom: currentCategory === String(category.id) ? `1px solid ${highlightColor}` : 'unset',
                      color: currentCategory === String(category.id) ? highlightColor : 'unset',
                    }}
                    to={getRedirectPath(category.urlpath)}
                    key={category.id}
                  >
                    {category.name}
                  </Link>
                ))}
              </ul>
            )}
            <ul className={cn('catalog__receptacle')}>
              {categories.map((category) => {
                return (
                  <li
                    className={cn('catalog__box', { ['catalog__box--hidden']: checkIsCategoryHidden(category) })}
                    ref={setParrentRef(category)}
                    id={`${id}-${category.id}`}
                    key={category.id}
                  >
                    {isRenderOnlyActiveCategory
                      ? currentCategory === String(category.id) && renderCategoryContent(id, category.id)
                      : renderCategoryContent(id, category.id)}
                    {currentCategory === String(category.id) && (
                      <SubCustomDragLayer
                        currentLayout={containerProps.currentLayout}
                        parent={`${id}-${category.id}`}
                        parentRef={parentRef}
                      />
                    )}
                  </li>
                );
              })}
              <li
                className={cn('catalog__box', { ['catalog__box--hidden']: checkIsInnerPageHidden })}
                ref={setInnerPageParrentRef}
                id={`${id}-inner`}
              >
                {isRenderInnerPageContent && renderCategoryContent(id, `inner`)}
                {isRenderInnerPageContent && (
                  <SubCustomDragLayer
                    currentLayout={containerProps.currentLayout}
                    parent={`${id}-inner`}
                    parentRef={parentRef}
                  />
                )}
              </li>
              {(isInnerPageLoading || (innerPage && !isInnerPageLoaded)) && (
                <div className={cn('catalog__preloader', { ['catalog__preloader--dark']: darkMode })}>
                  <div className="spinner-border" role="status" />
                </div>
              )}
              {!isCurrentCategoryAvailable && (
                <li className={cn('catalog__box')}>
                  <p className="catalog__message">
                    <span>{`Category does not exist`}</span>
                    {categories.length > 0 && <Link to={getRedirectPath()}>Back to main</Link>}
                  </p>
                </li>
              )}
            </ul>
          </>
        )}
      </section>
    );
  }
);
