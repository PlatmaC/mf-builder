import { Dropdown } from 'react-bootstrap';

import {
  useLayeringPosibility,
  LayeringPropsType,
  bringForward,
  sendBackward,
  toFront,
  toBack,
} from './CodeBuilder/Elements/CustomElements/Layering/layeringHelper';

type ContextMenuPropsType = LayeringPropsType & {
  removeComponent: (component: { id: string }) => void;
  removeComponents: () => void;
};

export const ContextMenu = (props: ContextMenuPropsType) => {
  const { isPosibleMoveHigher, isPosibleMoveDown } = useLayeringPosibility(props);

  const remove = (props: ContextMenuPropsType) => () => {
    if (props.multiWidgetIds && props.multiWidgetIds.length > 1) props.removeComponents();
    else if (props.widgetId) props.removeComponent({ id: props.widgetId });
    props.closeContextMenu?.();
  };

  const renderTextWithAmount = (text: string, multiWidgetIds?: Array<string>) => {
    if (multiWidgetIds && multiWidgetIds.length > 1) return `${text}(${multiWidgetIds.length})`;
    else return text;
  };

  return (
    <Dropdown.Menu show>
      <Dropdown.Item disabled={!isPosibleMoveHigher} onClick={toFront(props)}>
        To Front
      </Dropdown.Item>
      <Dropdown.Item disabled={!isPosibleMoveDown} onClick={toBack(props)}>
        To Back
      </Dropdown.Item>
      <Dropdown.Item disabled={!isPosibleMoveHigher} onClick={bringForward(props)}>
        Bring Forward
      </Dropdown.Item>
      <Dropdown.Item disabled={!isPosibleMoveDown} onClick={sendBackward(props)}>
        Send Backward
      </Dropdown.Item>
      <Dropdown.Item className="editor__context-menu--danger" onClick={remove(props)}>
        {renderTextWithAmount('Delete', props.multiWidgetIds)}
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};
