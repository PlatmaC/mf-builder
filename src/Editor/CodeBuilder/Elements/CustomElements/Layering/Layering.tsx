import cn from 'classnames';

import { ElementsToRenderPropsType } from '@/types/EditorTypes/InspectorElementTypes';
import { Number } from '../../Number';

import {
  useLayeringPosibility,
  LayeringPropsType,
  bringForward,
  sendBackward,
  toBack,
  toFront,
} from './layeringHelper';

import '@/_styles/widgets/layer-changer.scss';

export const Layering = (props: ElementsToRenderPropsType) => {
  return (
    <section className="layout-changer__wrapper">
      <Number {...props} withFxButton={false} />
      <Layerer {...{ ...props, widgetId: props.component.id }} />
    </section>
  );
};

export const Layerer = (props: LayeringPropsType) => {
  const { isPosibleMoveHigher, isPosibleMoveDown } = useLayeringPosibility(props);

  return (
    <div className="layer-changer__wrapper">
      <button
        className={cn('layout-changer__button layout-changer__button--margin', {
          ['layout-changer__button--selected']: isPosibleMoveHigher,
        })}
        onClick={toFront(props)}
      >
        To Front
      </button>
      <button
        className={cn('layout-changer__button layout-changer__button--margin', {
          ['layout-changer__button--selected']: isPosibleMoveDown,
        })}
        onClick={toBack(props)}
      >
        To Back
      </button>
      <button
        className={cn('layout-changer__button layout-changer__button--margin', {
          ['layout-changer__button--selected']: isPosibleMoveHigher,
        })}
        onClick={bringForward(props)}
      >
        Bring Forward
      </button>
      <button
        className={cn('layout-changer__button layout-changer__button--margin', {
          ['layout-changer__button--selected']: isPosibleMoveDown,
        })}
        onClick={sendBackward(props)}
      >
        Send Backward
      </button>
    </div>
  );
};
