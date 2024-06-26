import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default function autogenerateColumns(
  tableData,
  existingColumns,
  columnDeletionHistory,
  useDynamicColumn,
  dynamicColumn = [],
  setProperty
) {
  if (useDynamicColumn) {
    if (dynamicColumn.length > 0 && dynamicColumn[0].name) {
      const generatedColumns = dynamicColumn.map((item) => {
        return {
          ...item,
          id: uuidv4(),
          name: item?.name,
          key: item?.key || item?.name,
          autogenerated: true,
        };
      });
      return generatedColumns;
    }
    return [];
  }

  const firstRow = tableData?.[0] ?? {};

  const firstRowWithoutNestedElements = Object.fromEntries(
    Object.entries(firstRow).filter(([_key, value]) => typeof value != 'object')
  );

  const keysOfTableData = Object.keys(firstRowWithoutNestedElements);

  const keysOfExistingColumns = existingColumns.map((column) => column.key || column.name);

  const keysFromWhichNewColumnsShouldBeGenerated = _.difference(keysOfTableData, [
    ...keysOfExistingColumns,
    ...columnDeletionHistory,
  ]);

  const keysAndDataTypesToGenerateNewColumns = keysFromWhichNewColumnsShouldBeGenerated?.map((key) => [
    key,
    typeof firstRow[key],
  ]);

  const keysOfExistingColumnsThatNeedToPersist = existingColumns
    .filter((column) => !column.autogenerated || keysOfTableData.includes(column.key || column.name))
    .map((column) => column.key || column.name);

  const generatedColumns = keysAndDataTypesToGenerateNewColumns.map(([key, dataType]) => ({
    id: uuidv4(),
    name: key,
    key: key,
    columnType: convertDataTypeToColumnType(dataType),
    autogenerated: true,
  }));

  const finalKeys = [...keysFromWhichNewColumnsShouldBeGenerated, ...keysOfExistingColumnsThatNeedToPersist];
  const finalColumns = [...existingColumns, ...generatedColumns].filter((column) =>
    finalKeys.includes(column.key || column.name)
  );

  setTimeout(() => setProperty('columns', finalColumns), 10);
}

const dataTypeToColumnTypeMapping = {
  string: 'string',
  number: 'number',
};

export const convertDataTypeToColumnType = (dataType) => {
  if (Object.keys(dataTypeToColumnTypeMapping).includes(dataType)) return dataTypeToColumnTypeMapping[dataType];
  else return 'default';
};
