import { ComponentToRenderProps } from '@/types/EditorTypes/ComponentTypes';

import { Any } from '@/types/GeneralTypes/Any';

export type BreadCrumbsPropertyValuesType = {
  maxLength: number;
  subPageComputedName?: Any;
  innerPageComputedName?: Any;
  loadingState?: Any;
};

export type BreadCrumbsStylesyValuesType = {
  backgroundColor: Any;
  textColor: Any;
  textSize: Any;
  textAlign: Any;
  fontWeight: Any;
  decoration: Any;
  transformation: Any;
  fontStyle: Any;
  lineHeight: Any;
  textIndent: Any;
  letterSpacing: Any;
  wordSpacing: Any;
  fontVariant: Any;
  visibility: Any;
  disabledState: Any;
  boxShadow: Any;
};

export type BreadCrumbsPropsType = ComponentToRenderProps<BreadCrumbsPropertyValuesType, BreadCrumbsStylesyValuesType>;
