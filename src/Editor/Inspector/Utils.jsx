import React from 'react';
import { Code } from './Elements/Code';
import { QuerySelector } from './QuerySelector';
import { resolveReferences } from '@/_helpers/utils';

export function renderQuerySelector(component, dataQueries, eventOptionUpdated, eventName, eventMeta) {
  let definition = component.component.definition.events[eventName];
  definition = definition || {};

  return (
    <QuerySelector
      param={{ name: eventName }}
      definition={definition}
      eventMeta={eventMeta}
      dataQueries={dataQueries}
      eventOptionUpdated={eventOptionUpdated}
    />
  );
}

export function renderElement(
  component,
  componentMeta,
  paramUpdated,
  dataQueries,
  param,
  paramType,
  currentState,
  components = {},
  darkMode = false,
  multyParamsUpdater,
  appDefinitionChanged,
  currentLayout,
  appDefinition,
  currentPageId,
  componentDefinitionChanged
) {
  const componentConfig = component.component;
  const componentDefinition = componentConfig.definition;
  const paramTypeDefinition = componentDefinition[paramType] || {};
  const definition = paramTypeDefinition[param] || {};
  const meta = componentMeta[paramType][param];
  const isPropertyVisible = definition.isActive ?? true;

  if (
    componentConfig.component == 'DropDown' ||
    componentConfig.component == 'Form' ||
    componentConfig.component == 'Listview'
  ) {
    const paramTypeConfig = componentMeta[paramType] || {};
    const paramConfig = paramTypeConfig[param] || {};
    const { conditionallyRender = null } = paramConfig;

    if (conditionallyRender) {
      const { key, value } = conditionallyRender;
      if (paramTypeDefinition?.[key] ?? value) {
        const resolvedValue = paramTypeDefinition?.[key] && resolveReferences(paramTypeDefinition?.[key], currentState);
        if (resolvedValue?.value !== value) return;
      }
    }
  }

  return (
    isPropertyVisible && (
      <Code
        param={{ name: param, ...component.component.properties[param] }}
        definition={definition}
        dataQueries={dataQueries}
        onChange={paramUpdated}
        multyParamsUpdater={multyParamsUpdater}
        appDefinitionChanged={appDefinitionChanged}
        appDefinition={appDefinition}
        paramType={paramType}
        components={components}
        componentMeta={componentMeta}
        componentDefinitionChanged={componentDefinitionChanged}
        currentState={currentState}
        darkMode={darkMode}
        componentName={component.component.name || null}
        type={meta.type}
        fxActive={definition.fxActive ?? false}
        onFxPress={(active) => {
          paramUpdated({ name: param, ...component.component.properties[param] }, 'fxActive', active, paramType);
        }}
        component={component}
        currentLayout={currentLayout}
        currentPageId={currentPageId}
      />
    )
  );
}
