// types are not fully described and could have mistakes

import { IsNullableEnum } from '../GeneralTypes/Global';
import { Any, AnyObject } from '../GeneralTypes/Any';
import { DataDenominationType } from './TableTypes';

export type TooljetDatabaseContextType = {
  organizationId: null | string;
  setOrganizationId: () => void;
  selectedTable: string;
  setSelectedTable: () => void;
  searchParam: string;
  setSearchParam: () => void;
  selectedTableData: Array<Any>;
  setSelectedTableData: (data: Array<Any>) => void;
  tables: Array<Any>;
  setTables: () => void;
  columns: Array<ColumnType>;
  setColumns: (columns: Array<ColumnType>) => void;
  totalRecords: number | string;
  setTotalRecords: (recordQuantity: number) => void;
  handleBuildFilterQuery: () => void;
  handleBuildSortQuery: () => void;
  buildPaginationQuery: () => void;
  resetSortQuery: () => void;
  resetFilterQuery: () => void;
  queryFilters: AnyObject;
  setQueryFilters: (filters: AnyObject) => void;
  sortFilters: AnyObject;
  setSortFilters: (filters: AnyObject) => void;
  resetAll: () => void;
};

export type ColumnType = {
  Header: string | JSX.Element;
  accessor: string;
  character_maximum_length: null | number;
  column_default?: string;
  dataType: DataDenominationType;
  isPrimaryKey: boolean;
  is_nullable: IsNullableEnum;
  numeric_precision: number;
  order?: number;
  relation_table?: string;
  primaryField: string;
  relation_field?: string;
  relation_locked_field?: string;
  field_of_related_table?: string;
  field_to_lookup?: string;
  relation_single?: boolean;
};
