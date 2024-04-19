import { ErrorBoundary } from 'react-error-boundary';
import { IconX } from '@tabler/icons-react';
import { memo } from 'react';
import cn from 'classnames';

import { WidgetType } from '@/types/EditorTypes/ComponentTypes';
import { shallow } from 'zustand/shallow';
import {
  AppDefinitionChangeType,
  SwitchSidebarTabType,
  AppDefinitionType,
  LayoutsEnum,
} from '@/types/EditorTypes/AppTypes';

import { BulkGridBinder } from './BulkGridBinder/BulkGridBinder';
import { BulkPositioner } from './BulkPositioner/BulkPositioner';
import { useAppVersionStore } from '@/_stores/appVersionStore';
import { BulkLayering } from './BulkLayering/BulkLayering';
import { BulkResizer } from './BulkResizer/BulkResizer';
import { Leveler } from './Leveler/Leveler';

import '@/_styles/editor/multi-inspector.scss';

export type MultiInspectorDrillingPropsType = {
  appDefinitionChanged: AppDefinitionChangeType;
  switchSidebarTab: SwitchSidebarTabType;
  selectedComponents: Array<WidgetType>;
  appDefinition: AppDefinitionType;
  currentLayout: LayoutsEnum;
  currentPageId: string;
};

export const MultiInspector = memo((props: MultiInspectorDrillingPropsType) => {
  const isVersionReleased = useAppVersionStore((state) => state.isVersionReleased, shallow);
  const closeMultiInspector = () => props.switchSidebarTab(2);

  return (
    <ErrorBoundary
      fallbackRender={(err) => (
        <p className="m-3 d-flex flex-column">
          <span>Something went wrong:</span>
          {err?.error?.message && <span>{err.error.message}</span>}
        </p>
      )}
    >
      <section className={cn('multi-inspector__wrapper', { ['disabled']: isVersionReleased })}>
        <IconX className="multi-inspector__cross" size={20} onClick={closeMultiInspector} />
        <h4 className="multi-inspector__header">Arrange</h4>
        <Leveler {...props} />
        <BulkPositioner {...props} />
        <BulkGridBinder {...props} />
        <BulkResizer {...props} />
        <BulkLayering {...props} />
      </section>
    </ErrorBoundary>
  );
});
