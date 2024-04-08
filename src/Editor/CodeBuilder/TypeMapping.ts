import { ElementMapingType } from '@/types/EditorTypes/InspectorElementTypes';

import { customTypeMaping } from './Elements/CustomElements';

export const TypeMapping: Record<ElementMapingType, string> = {
  text: 'Text',
  string: 'Text',
  color: 'Color',
  json: 'Json',
  code: 'Code',
  toggle: 'Toggle',
  select: 'Select',
  alignButtons: 'AlignButtons',
  number: 'Number',
  boxShadow: 'BoxShadow',
  ...customTypeMaping,
};
