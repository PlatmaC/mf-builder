import { MultiInspectorDrillingPropsType } from '../MultiInspector';
import { HorizontalLeveler } from './HorizontalLeveler';
import { VerticalLeveler } from './VerticalLeveler';

import '@/_styles/editor/multi-inspector.scss';

export const Leveler = (props: MultiInspectorDrillingPropsType) => {
  return (
    <div className="multi-inspector__container">
      <h5 className="multi-inspector__headline">Align</h5>
      <HorizontalLeveler {...props} />
      <VerticalLeveler {...props} />
    </div>
  );
};
