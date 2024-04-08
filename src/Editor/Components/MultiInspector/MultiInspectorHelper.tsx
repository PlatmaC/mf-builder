import { ComponentType, WidgetType } from '@/types/EditorTypes/ComponentTypes';
import { AppDefinitionType, LayoutsType } from '@/types/EditorTypes/AppTypes';
import { useAppGlobalStore } from '@/_stores/appGlobalStore';

export type GetAlignmentInfoType = (props: {
  selectedComponents: Array<WidgetType>;
  appDefinition: AppDefinitionType;
  currentPageId: string;
}) => {
  selectedComponentDefinitions: SelectedComponentDefinitionsType;
  canvasAreaWidth: number | undefined;
};

export type SelectedComponentDefinitionsType = [
  string,
  { component: ComponentType; layouts: LayoutsType; withDefaultChildren: boolean }
][];

export const getAlignmentInfo: GetAlignmentInfoType = ({ selectedComponents, appDefinition, currentPageId }) => {
  const selectedComponentIds = selectedComponents.map((component) => component.id);
  const selectedComponentDefinitions = Object.entries(appDefinition.pages[currentPageId].components).filter(([key]) =>
    selectedComponentIds.includes(key)
  );
  const canvasAreaWidth = useAppGlobalStore.getState().canvasAreaElement?.getBoundingClientRect().width;
  return { selectedComponentDefinitions, canvasAreaWidth };
};
