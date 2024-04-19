import cloneDeep from 'lodash/cloneDeep';
import { useMemo } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';

import { resolveReferences } from '@/_helpers/utils';
import {
  AppDefinitionChangeType,
  AppDefinitionType,
  ComponentInfoType,
  CurrentStateType,
} from '@/types/EditorTypes/AppTypes';

export type LayeringPropsType = {
  appDefinitionChanged: AppDefinitionChangeType;
  appDefinition: AppDefinitionType;
  currentState: CurrentStateType;
  multiWidgetIds?: Array<string>;
  closeContextMenu?: () => void;
  currentPageId: string;
  widgetId?: string;
};

type LayeringPosibilityPropsType = {
  appDefinition: AppDefinitionType;
  currentState: CurrentStateType;
  currentPageId: string;
  widgetId?: string;
};

type LayeringValuesType = {
  restComponents: [string, ComponentInfoType][];
  clickedwidgetValue?: string | number;
  newAppDefinition: AppDefinitionType;
  clickedWidgetZIndex: number;
} & LayeringOptionalValuesType;

type LayeringOptionalValuesType =
  | {
      nearestHighestZIndexComponents: null | number;
      nearestLowestZIndexComponents: null | number;
      isSameZIndexExist: boolean;
      hasRestComponent: true;
      minZIndex: number;
      maxZIndex: number;
    }
  | {
      nearestHighestZIndexComponents?: never;
      nearestLowestZIndexComponents?: never;
      hasRestComponent: false;
      isSameZIndexExist?: never;
      minZIndex?: never;
      maxZIndex?: never;
    };

type PrepareLayeringValuesType = Required<Omit<LayeringPropsType, 'appDefinitionChanged' | 'closeContextMenu'>>;

export const toFront = (props: LayeringPropsType) => () => {
  const { widgetId: clickeWidgetId, appDefinitionChanged, closeContextMenu, currentPageId } = props;
  if (clickeWidgetId) {
    const { clickedWidgetZIndex, hasRestComponent, newAppDefinition, maxZIndex } = prepareLayeringValues(
      props as PrepareLayeringValuesType
    );
    if (hasRestComponent) {
      if (clickedWidgetZIndex <= maxZIndex) {
        set(
          newAppDefinition,
          `pages.${currentPageId}.components.${clickeWidgetId}.component.definition.general.zIndex.value`,
          maxZIndex + 1
        );
        appDefinitionChanged(newAppDefinition);
      }
    }
    closeContextMenu?.();
  }
};

export const toBack = (props: LayeringPropsType) => () => {
  const { widgetId: clickeWidgetId, appDefinitionChanged, closeContextMenu, currentPageId, currentState } = props;
  if (clickeWidgetId) {
    const { clickedWidgetZIndex, hasRestComponent, newAppDefinition, restComponents, minZIndex } =
      prepareLayeringValues(props as PrepareLayeringValuesType);
    if (hasRestComponent) {
      if (clickedWidgetZIndex >= minZIndex) {
        if (minZIndex === 1) {
          restComponents.forEach(([componentId, component]) => {
            const componentValue = component.component.definition.general.zIndex?.value;
            const componentZIndex = Number(resolveReferences(componentValue, currentState));
            set(
              newAppDefinition,
              `pages.${currentPageId}.components.${componentId}.component.definition.general.zIndex.value`,
              componentZIndex + 1
            );
          });
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${clickeWidgetId}.component.definition.general.zIndex.value`,
            1
          );
        } else {
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${clickeWidgetId}.component.definition.general.zIndex.value`,
            minZIndex - 1
          );
        }
        appDefinitionChanged(newAppDefinition);
      }
    }
    closeContextMenu?.();
  }
};

export const bringForward = (props: LayeringPropsType) => () => {
  const { widgetId: clickeWidgetId, appDefinitionChanged, closeContextMenu, currentPageId, currentState } = props;
  if (clickeWidgetId) {
    const {
      nearestHighestZIndexComponents,
      clickedWidgetZIndex,
      isSameZIndexExist,
      hasRestComponent,
      newAppDefinition,
      restComponents,
    } = prepareLayeringValues(props as PrepareLayeringValuesType);
    if (hasRestComponent) {
      if (isSameZIndexExist) {
        restComponents.forEach(([id, currentComponent]) => {
          const currentValue = Number(
            resolveReferences(currentComponent.component.definition.general.zIndex?.value, currentState)
          );
          if (clickedWidgetZIndex < currentValue) {
            set(
              newAppDefinition,
              `pages.${currentPageId}.components.${id}.component.definition.general.zIndex.value`,
              currentValue + 1
            );
          }
        });
        set(
          newAppDefinition,
          `pages.${currentPageId}.components.${clickeWidgetId}.component.definition.general.zIndex.value`,
          clickedWidgetZIndex + 1
        );
      } else {
        restComponents.forEach(([id, currentComponent]) => {
          const currentValue = Number(
            resolveReferences(currentComponent.component.definition.general.zIndex?.value, currentState)
          );
          if (nearestHighestZIndexComponents !== null && nearestHighestZIndexComponents < currentValue) {
            set(
              newAppDefinition,
              `pages.${currentPageId}.components.${id}.component.definition.general.zIndex.value`,
              currentValue + 1
            );
          }
        });
        if (nearestHighestZIndexComponents !== null)
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${clickeWidgetId}.component.definition.general.zIndex.value`,
            nearestHighestZIndexComponents + 1
          );
      }
      appDefinitionChanged(newAppDefinition);
    }
    closeContextMenu?.();
  }
};

export const sendBackward = (props: LayeringPropsType) => () => {
  const { widgetId: clickeWidgetId, appDefinitionChanged, closeContextMenu, currentPageId, currentState } = props;
  if (clickeWidgetId) {
    const {
      nearestLowestZIndexComponents,
      clickedWidgetZIndex,
      isSameZIndexExist,
      hasRestComponent,
      newAppDefinition,
      restComponents,
    } = prepareLayeringValues(props as PrepareLayeringValuesType);
    if (hasRestComponent) {
      if (isSameZIndexExist) {
        restComponents.forEach(([id, currentComponent]) => {
          const currentValue = Number(
            resolveReferences(currentComponent.component.definition.general.zIndex?.value, currentState)
          );
          if (clickedWidgetZIndex <= currentValue) {
            set(
              newAppDefinition,
              `pages.${currentPageId}.components.${id}.component.definition.general.zIndex.value`,
              currentValue + 1
            );
          }
        });
      } else {
        if (nearestLowestZIndexComponents !== null) {
          restComponents.forEach(([id, currentComponent]) => {
            const currentValue = Number(
              resolveReferences(currentComponent.component.definition.general.zIndex?.value, currentState)
            );
            if (nearestLowestZIndexComponents === currentValue) {
              set(
                newAppDefinition,
                `pages.${currentPageId}.components.${id}.component.definition.general.zIndex.value`,
                clickedWidgetZIndex
              );
            }
          });
          set(
            newAppDefinition,
            `pages.${currentPageId}.components.${clickeWidgetId}.component.definition.general.zIndex.value`,
            nearestLowestZIndexComponents
          );
        }
      }
      appDefinitionChanged(newAppDefinition);
    }
    closeContextMenu?.();
  }
};

export const canMoveHigher = (props: Omit<LayeringPropsType, 'appDefinitionChanged'>): boolean => {
  if (props.widgetId) {
    const { clickedWidgetZIndex, hasRestComponent, maxZIndex, isSameZIndexExist } = prepareLayeringValues(
      props as PrepareLayeringValuesType
    );
    if (hasRestComponent) {
      if (clickedWidgetZIndex < maxZIndex || isSameZIndexExist) return true;
      else return false;
    } else return false;
  } else return false;
};

export const canMoveDown = (props: Omit<LayeringPropsType, 'appDefinitionChanged'>): boolean => {
  if (props.widgetId) {
    const { clickedWidgetZIndex, hasRestComponent, minZIndex, isSameZIndexExist } = prepareLayeringValues(
      props as PrepareLayeringValuesType
    );
    if (hasRestComponent) {
      if (clickedWidgetZIndex > minZIndex || isSameZIndexExist) return true;
      else return false;
    } else return false;
  } else return false;
};

const prepareLayeringValues = ({
  widgetId: clickeWidgetId,
  appDefinition,
  currentPageId,
  currentState,
}: PrepareLayeringValuesType): LayeringValuesType => {
  const newAppDefinition = cloneDeep(appDefinition);
  const clickedwidgetValue =
    newAppDefinition.pages[currentPageId].components[clickeWidgetId].component.definition.general.zIndex?.value;
  const clickedWidgetZIndex = Number(resolveReferences(clickedwidgetValue, currentState));
  const restComponents = Object.entries(
    omit(newAppDefinition.pages[currentPageId].components, clickeWidgetId)
  ) as Array<[string, ComponentInfoType]>;
  const requiredValues = { clickedWidgetZIndex, clickedwidgetValue, newAppDefinition, restComponents };
  if (restComponents.length > 0) {
    const { maxZIndex, minZIndex } = restComponents.reduce(
      (accum, [_id, currentComponent]) => {
        const currentZIndex = Number(
          resolveReferences(currentComponent.component.definition.general.zIndex?.value, currentState)
        );
        return {
          minZIndex: accum.minZIndex > currentZIndex ? currentZIndex : accum.minZIndex,
          maxZIndex: accum.maxZIndex < currentZIndex ? currentZIndex : accum.maxZIndex,
        };
      },
      {
        minZIndex: Number(
          resolveReferences(restComponents[0][1].component.definition.general.zIndex?.value, currentState)
        ),
        maxZIndex: Number(
          resolveReferences(restComponents[0][1].component.definition.general.zIndex?.value, currentState)
        ),
      }
    );
    const isSameZIndexExist = restComponents.some(([_id, currentComponent]) => {
      const currentValue = Number(
        resolveReferences(currentComponent.component.definition.general.zIndex?.value, currentState)
      );
      return currentValue === clickedWidgetZIndex;
    });
    const getLowest = (nearestLowestValue: number | null, currentValue: number) => {
      if (nearestLowestValue === null && currentValue < clickedWidgetZIndex) return currentValue;
      else if (nearestLowestValue !== null && clickedWidgetZIndex > currentValue && currentValue > nearestLowestValue)
        return currentValue;
      else return nearestLowestValue;
    };
    const getHighest = (nearestHighestValue: number | null, currentValue: number) => {
      if (nearestHighestValue === null && currentValue > clickedWidgetZIndex) return currentValue;
      else if (nearestHighestValue !== null && clickedWidgetZIndex < currentValue && currentValue < nearestHighestValue)
        return currentValue;
      else return nearestHighestValue;
    };
    const { nearestHighestZIndexComponents, nearestLowestZIndexComponents } = restComponents.reduce(
      ({ nearestHighestZIndexComponents, nearestLowestZIndexComponents }, [_id, currentComponent]) => {
        const currentValue = Number(
          resolveReferences(currentComponent.component.definition.general.zIndex?.value, currentState)
        );
        return {
          nearestHighestZIndexComponents: getHighest(nearestHighestZIndexComponents, currentValue),
          nearestLowestZIndexComponents: getLowest(nearestLowestZIndexComponents, currentValue),
        };
      },
      { nearestHighestZIndexComponents: null, nearestLowestZIndexComponents: null }
    );

    return {
      nearestHighestZIndexComponents,
      nearestLowestZIndexComponents,
      hasRestComponent: true,
      ...requiredValues,
      isSameZIndexExist,
      maxZIndex,
      minZIndex,
    };
  } else return { hasRestComponent: false, ...requiredValues };
};

export const useLayeringPosibility = (props: LayeringPosibilityPropsType) =>
  useMemo(() => ({ isPosibleMoveHigher: canMoveHigher(props), isPosibleMoveDown: canMoveDown(props) }), [props]);
