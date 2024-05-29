export const dataTypes = [
  { value: 'character varying', label: 'varchar' },
  { value: 'integer', label: 'int' },
  { value: 'double precision', label: 'float' },
  { value: 'boolean', label: 'boolean' },
  { value: 'relations', label: 'link to table' },
  { value: 'lookup', label: 'lookup' },
] as const;

export const primaryKeydataTypes = [{ value: 'serial', label: 'serial' }];

export const operators = [
  { value: 'eq', label: 'equals' },
  { value: 'gt', label: 'greater than' },
  { value: 'gte', label: 'greater than or equal' },
  { value: 'lt', label: 'less than' },
  { value: 'lte', label: 'less than or equal' },
  { value: 'neq', label: 'not equal' },
  { value: 'like', label: 'like' },
  { value: 'ilike', label: 'ilike' },
  { value: 'match', label: 'match' },
  { value: 'imatch', label: 'imatch' },
  { value: 'in', label: 'in' },
  { value: 'is', label: 'is' },
];

export const tableNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
