// types are not fully described and could have mistakes

import { Any, AnyObject } from './Any';

export type SelectOptions = Array<SelectOption>;

export type SelectOption = { value: string; label: string };

export enum IsNullableEnum {
  'NO' = 'NO',
  'YES' = 'YES',
}

export type ReponseType = {
  status: number;
  statusText: string;
  headers: AnyObject;
  data: Any;
};
