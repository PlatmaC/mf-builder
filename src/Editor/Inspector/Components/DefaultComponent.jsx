import React from 'react';
import Accordion from '@/_ui/Accordion';
import { EventManager } from '../EventManager';
import { renderElement } from '../Utils';
// eslint-disable-next-line import/no-unresolved
import i18next from 'i18next';
import { resolveReferences } from '@/_helpers/utils';

const DefaultComponent = ({ componentMeta, darkMode, ...restProps }) => {
  const {
    layoutPropertyChanged,
    appDefinitionChanged,
    appDefinition,
    component,
    paramUpdated,
    multyParamsUpdater,
    dataQueries,
    currentState,
    eventsChanged,
    apps,
    components,
    pages,
    currentLayout,
    currentPageId,
    componentDefinitionChanged,
  } = restProps;

  const properties = Object.keys(componentMeta.properties);
  const events = Object.keys(componentMeta.events);
  const validations = Object.keys(componentMeta.validation || {});

  const accordionItems = baseComponentProperties(
    properties,
    events,
    component,
    componentMeta,
    layoutPropertyChanged,
    paramUpdated,
    dataQueries,
    currentState,
    eventsChanged,
    apps,
    components,
    validations,
    darkMode,
    pages,
    multyParamsUpdater,
    appDefinitionChanged,
    currentLayout,
    appDefinition,
    currentPageId,
    componentDefinitionChanged
  );

  return <Accordion items={accordionItems} />;
};

export const baseComponentProperties = (
  properties,
  events,
  component,
  componentMeta,
  layoutPropertyChanged,
  paramUpdated,
  dataQueries,
  currentState,
  eventsChanged,
  apps,
  allComponents,
  validations,
  darkMode,
  pages,
  multyParamsUpdater,
  appDefinitionChanged,
  currentLayout,
  appDefinition,
  currentPageId,
  componentDefinitionChanged
) => {
  // Add widget title to section key to filter that property section from specified widgets' settings
  const accordionFilters = {
    Properties: [],
    Events: [],
    Validation: [],
    General: ['Modal'],
    Layout: [],
  };
  if (component.component.component === 'Listview') {
    if (!resolveReferences(component.component.definition.properties?.enablePagination?.value, currentState)) {
      properties = properties.filter((property) => property !== 'rowsPerPage');
    }
  }
  let items = [];
  if (properties.length > 0) {
    items.push({
      title: `${i18next.t('widget.common.properties', 'Properties')}`,
      children: properties.map((property) =>
        renderElement(
          component,
          componentMeta,
          paramUpdated,
          dataQueries,
          property,
          'properties',
          currentState,
          allComponents,
          darkMode,
          multyParamsUpdater,
          appDefinitionChanged,
          currentLayout,
          appDefinition,
          currentPageId,
          componentDefinitionChanged
        )
      ),
    });
  }

  if (events.length > 0) {
    items.push({
      title: `${i18next.t('widget.common.events', 'Events')}`,
      isOpen: true,
      children: (
        <EventManager
          component={component}
          componentMeta={componentMeta}
          currentState={currentState}
          dataQueries={dataQueries}
          components={allComponents}
          eventsChanged={eventsChanged}
          apps={apps}
          darkMode={darkMode}
          pages={pages}
        />
      ),
    });
  }

  if (validations.length > 0) {
    items.push({
      title: `${i18next.t('widget.common.validation', 'Validation')}`,
      children: validations.map((property) =>
        renderElement(
          component,
          componentMeta,
          paramUpdated,
          dataQueries,
          property,
          'validation',
          currentState,
          allComponents,
          darkMode
        )
      ),
    });
  }

  items.push({
    title: `${i18next.t('widget.common.general', 'General')}`,
    isOpen: true,
    children: (
      <>
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          'tooltip',
          'general',
          currentState,
          allComponents
        )}
      </>
    ),
  });

  items.push({
    title: `${i18next.t('widget.common.layout', 'Layout')}`,
    isOpen: true,
    children: (
      <>
        {componentMeta.others.positioner &&
          renderElement(
            component,
            componentMeta,
            layoutPropertyChanged,
            dataQueries,
            'positioner',
            'others',
            currentState,
            allComponents,
            darkMode,
            multyParamsUpdater,
            appDefinitionChanged,
            currentLayout,
            appDefinition,
            currentPageId,
            componentDefinitionChanged
          )}
        {componentMeta.others.resizer &&
          renderElement(
            component,
            componentMeta,
            layoutPropertyChanged,
            dataQueries,
            'resizer',
            'others',
            currentState,
            allComponents,
            darkMode,
            multyParamsUpdater,
            appDefinitionChanged,
            currentLayout,
            appDefinition,
            currentPageId,
            componentDefinitionChanged
          )}
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          'showOnDesktop',
          'others',
          currentState,
          allComponents
        )}
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          'showOnMobile',
          'others',
          currentState,
          allComponents
        )}
      </>
    ),
  });

  return items
    .filter(
      (item) => !(item.title in accordionFilters && accordionFilters[item.title].includes(componentMeta.component))
    )
    .map((item, itemIndex) => {
      item.children = React.Children.map(item.children, (child, childIndex) => {
        return <React.Fragment key={(itemIndex + 1) * (childIndex + 1)}>{child}</React.Fragment>;
      });
      return item;
    });
};

DefaultComponent.displayName = 'DefaultComponent';
export { DefaultComponent };
