import React, { useRef } from 'react';
import { SubCustomDragLayer } from '../SubCustomDragLayer';
import { SubContainer } from '../SubContainer';
import Spinner from '@/_ui/Spinner';

export const Container = function Container({
  id,
  component,
  width,
  height,
  containerProps,
  removeComponent,
  styles,
  darkMode,
  dataCy,
  properties,
  componentDefinitionChanged,
}) {
  const { visibility, disabledState, borderRadius, borderColor, boxShadow } = styles;
  const backgroundColor =
    ['#fff', '#ffffffff'].includes(styles.backgroundColor) && darkMode ? '#232E3C' : styles.backgroundColor;
  const computedStyles = {
    backgroundColor,
    borderRadius: borderRadius ? parseFloat(borderRadius) : 0,
    border: `1px solid ${borderColor}`,
    height,
    display: visibility ? 'flex' : 'none',
    overflow: 'hidden auto',
    position: 'relative',
    boxShadow,
  };

  const parentRef = useRef(null);

  return (
    <div
      data-disabled={disabledState}
      className={`jet-container ${properties.loadingState && 'jet-container-loading'}`}
      id={id}
      data-cy={dataCy}
      ref={parentRef}
      style={computedStyles}
    >
      {properties.loadingState ? (
        <Spinner />
      ) : (
        <>
          <SubContainer
            componentDefinitionChanged={componentDefinitionChanged}
            parentComponent={component}
            containerCanvasWidth={width}
            parent={id}
            {...containerProps}
            parentRef={parentRef}
            removeComponent={removeComponent}
          />
          <SubCustomDragLayer
            containerCanvasWidth={width}
            parent={id}
            parentRef={parentRef}
            currentLayout={containerProps.currentLayout}
          />
        </>
      )}
    </div>
  );
};
