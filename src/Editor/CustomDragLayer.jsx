import React, { useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { BoxDragPreview } from './BoxDragPreview.jsx';
import { snapToGrid } from '@/_helpers/appUtils';
const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 99999,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(delta, item, initialOffset, currentOffset, currentLayout, initialClientOffset, canvasWidth) {
  if (!initialOffset || !currentOffset) return { display: 'none' };
  let x, y;
  let id = item.id;
  if (id) {
    // Dragging within the canvas
    x = Math.round((item.layouts[currentLayout].left * canvasWidth) / 100 + delta.x);
    y = Math.round(item.layouts[currentLayout].top + delta.y);
  } else {
    const zoomLevel = item.zoomLevel;
    x = Math.round(currentOffset.x + currentOffset.x * (1 - zoomLevel));
    y = Math.round(initialClientOffset.y - 10 + delta.y + currentOffset.y * (1 - zoomLevel));
  }
  [x, y] = snapToGrid(canvasWidth, x, y);
  const transform = `translate(${x + 2}px, ${y - 3}px)`;
  return { transform, WebkitTransform: transform, width: 'fit-content' };
}
export const CustomDragLayer = ({ canvasWidth, currentLayout, onDragging }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, delta, initialClientOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      initialClientOffset: monitor.getInitialClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      delta: monitor.getDifferenceFromInitialOffset(),
    })
  );

  useEffect(() => {
    onDragging(isDragging);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  if (itemType === ItemTypes.COMMENT) return null;
  function renderItem() {
    switch (itemType) {
      case ItemTypes.BOX:
        return <BoxDragPreview item={item} currentLayout={currentLayout} canvasWidth={canvasWidth} />;
      default:
        return null;
    }
  }

  if (!isDragging || !item || item.parent) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(
          delta,
          item,
          initialOffset,
          currentOffset,
          currentLayout,
          initialClientOffset,
          canvasWidth
        )}
      >
        {renderItem()}
      </div>
    </div>
  );
};
