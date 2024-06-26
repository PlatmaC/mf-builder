import React from 'react';
import { renderElement } from '../Utils';
import { CodeHinter } from '../../CodeBuilder/CodeHinter';
import Accordion from '@/_ui/Accordion';

export const CustomComponent = function CustomComponent({
  dataQueries,
  component,
  paramUpdated,
  componentMeta,
  components,
  currentState,
  layoutPropertyChanged,
  allComponents,
  darkMode,
  multyParamsUpdater,
  appDefinitionChanged,
  currentLayout,
  appDefinition,
  currentPageId,
  componentDefinitionChanged,
}) {
  const code = component.component.definition.properties.code;
  const args = component.component.definition.properties.data;

  let items = [];

  items.push({
    title: 'Data',
    children: (
      <CodeHinter
        currentState={currentState}
        initialValue={args.value ?? {}}
        theme={darkMode ? 'monokai' : 'base16-light'}
        onChange={(value) => paramUpdated({ name: 'data' }, 'value', value, 'properties')}
        componentName={`component/${component.component.name}/data`}
      />
    ),
  });

  items.push({
    title: 'Code',
    children: (
      <CodeHinter
        currentState={currentState}
        initialValue={code.value ?? {}}
        theme={darkMode ? 'monokai' : 'base16-light'}
        mode="jsx"
        lineNumbers
        className="custom-component"
        onChange={(value) => paramUpdated({ name: 'code' }, 'value', value, 'properties')}
        componentName={`component/${component.component.name}/code`}
        enablePreview={false}
        height={400}
        hideSuggestion
      />
    ),
  });

  items.push({
    title: 'General',
    isOpen: true,
    children: (
      <>
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          'zIndex',
          'general',
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
      </>
    ),
  });

  items.push({
    title: 'Layout',
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
          components
        )}
        {renderElement(
          component,
          componentMeta,
          layoutPropertyChanged,
          dataQueries,
          'showOnMobile',
          'others',
          currentState,
          components
        )}
      </>
    ),
  });
  return <Accordion items={items} />;
};
