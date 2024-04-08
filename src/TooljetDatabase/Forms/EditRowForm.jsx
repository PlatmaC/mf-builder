import { useState, useContext, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import _, { isEmpty } from 'lodash';

import DrawerFooter from '@/_ui/Drawer/DrawerFooter';
import { tooljetDatabaseService } from '@/_services';
import { useMounted } from '@/_hooks/use-mount';
import { isValidJSON } from '@/_helpers/utils';
import Select from '@/_ui/Select';

import { useAllTables } from './TableFormHelpers';
import { TooljetDatabaseContext } from '../index';

const EditRowForm = ({ onEdit, onClose }) => {
  const { organizationId, selectedTable, columns, selectedTableData } = useContext(TooljetDatabaseContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const { tables, isTablesLoading } = useAllTables();
  const [fetching, setFetching] = useState(false);
  const [rowData, setRowData] = useState(() => {
    const data = {};
    columns.forEach(({ accessor, dataType }) => {
      if (dataType === 'boolean') {
        if (!accessor) data[accessor] = false;
      }
    });
    return data;
  });

  const handleOnSelect = (selectedOption) => {
    setSelectedRow(selectedOption);
  };

  const handleChange = (columnName, value) => {
    const _rowData = _.cloneDeep(rowData);
    _rowData[columnName] = value;
    const shouldUpdate = _.get(_rowData, columnName) !== _.get(rowData, columnName);
    if (shouldUpdate) setRowData(_rowData);
  };

  const debouncedHandleChange = _.debounce(handleChange, 500);

  const handleSubmit = async () => {
    setFetching(true);
    const query = `id=eq.${selectedRow}&order=id`;
    if (isEmpty(rowData)) return toast.error(`There ware no changes`);
    const { error } = await tooljetDatabaseService.updateRows(organizationId, selectedTable, rowData, query);
    if (error) {
      return toast.error(error?.message ?? `Failed to create a new column table "${selectedTable}"`);
    }
    setFetching(false);
    toast.success(`Row edited successfully`);
    onEdit?.();
  };

  const primaryColumn = columns.find((column) => column.isPrimaryKey)?.accessor || null;
  const options = selectedTableData.map((row) => ({ value: row[primaryColumn], label: row[primaryColumn] }));

  const handleRelationsChange = (columnName) => (newValue) => {
    setRowData((prevState) => ({
      ...prevState,
      [columnName]: typeof newValue === 'string' ? [newValue] : newValue.map(({ value }) => value),
    }));
  };

  useEffect(() => {
    setRowData({});
  }, [selectedRow]);

  useEffect(() => {
    toast.dismiss();
  }, []);

  const getValue = (dataType, currentValue, relationTable, isSingleValue, tables) => {
    if (dataType === 'relations') {
      if (isSingleValue && currentValue !== null) {
        return tables?.[relationTable.toLocaleLowerCase()].filter(
          (row) => row.value.toString() === currentValue.toString()
        );
      } else {
        if (isValidJSON(currentValue)) {
          return tables?.[relationTable.toLocaleLowerCase()].filter((row) =>
            JSON.parse(currentValue).some(
              (currentValue) => Object.values(currentValue)[0].toString() === row.value.toString()
            )
          );
        } else return currentValue;
      }
    } else return currentValue;
  };

  return (
    <div className="">
      <div className="drawer-card-title">
        <h3 className="card-title" data-cy="edit-row-header">
          Edit a row
        </h3>
      </div>
      <div className="card-body">
        <div>
          <div className="mb-3 row g-2 align-items-center">
            <div className="col-2" data-cy={`${primaryColumn}-column-name-label`}>
              {primaryColumn}&nbsp;
              <span className="badge badge-outline text-blue"> SERIAL</span>
            </div>
            <div className="col-auto row-edit-select-container" data-cy="select-row-dropdown">
              <Select
                useMenuPortal={false}
                placeholder="Select a row to edit"
                value={selectedRow}
                options={options}
                onChange={handleOnSelect}
                customWrap={true}
              />
            </div>
          </div>

          {selectedRow &&
            Array.isArray(columns) &&
            columns?.map((column, index) => {
              const { Header, accessor, dataType, isPrimaryKey, column_default, relation_table } = column;
              const currentValue = selectedTableData.find((row) => row.id === selectedRow)?.[accessor];

              if (isPrimaryKey) return null;

              return (
                <div className="mb-3" key={`${index} + ${selectedRow}`}>
                  <div
                    className="form-label"
                    data-cy={`${String(Header).toLocaleLowerCase().replace(/\s+/g, '-')}-column-name-label`}
                  >
                    {Header}&nbsp;
                    <span
                      className="badge badge-outline text-blue"
                      data-cy={`${String(dataType).toLocaleLowerCase().replace(/\s+/g, '-')}-data-type-label`}
                    >
                      {isPrimaryKey ? 'SERIAL' : dataType === 'lookup' ? 'Lookup' : dataType}
                    </span>
                  </div>
                  <RenderElement
                    columns={columns}
                    dataType={dataType}
                    columnName={accessor}
                    currentColumn={column}
                    selectedRow={selectedRow}
                    isPrimaryKey={isPrimaryKey}
                    defaultValue={column_default}
                    relationTable={relation_table}
                    callback={debouncedHandleChange}
                    isTablesLoading={isTablesLoading}
                    onFocused={() => setFetching(false)}
                    handleRelationsChange={handleRelationsChange(accessor)}
                    selectOptions={relation_table ? tables?.[relation_table.toLocaleLowerCase()] ?? [] : []}
                    value={getValue(dataType, currentValue, relation_table, Boolean(column.relation_single), tables)}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {selectedRow && <DrawerFooter isEditMode={true} fetching={fetching} onClose={onClose} onEdit={handleSubmit} />}
    </div>
  );
};

const removeQuotes = (str) => {
  return str?.replace(/['"]+/g, '');
};
const RenderElement = ({
  handleRelationsChange,
  isTablesLoading,
  relationTable,
  currentColumn,
  selectOptions,
  defaultValue,
  isPrimaryKey,
  columnName,
  onFocused,
  callback,
  dataType,
  columns,
  value,
}) => {
  const placeholder = useMemo(() => {
    if (dataType === 'lookup') {
      const lookupTable = columns.find(
        (tableColumn) => tableColumn.accessor === currentColumn.field_of_related_table
      ).relation_table;
      return `Data will be taken from ${lookupTable} table`;
    } else if (defaultValue?.length > 0) return removeQuotes(defaultValue.split('::')[0]);
    else return '';
  }, [columns, currentColumn, dataType, defaultValue]);

  const [inputValue, setInputValue] = useState(value ? value : '');

  const isMounted = useMounted();

  useEffect(() => {
    if (isMounted && inputValue !== undefined && inputValue !== null) {
      callback(columnName, inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const getPlaceholderForRelations = (value) => {
    if (value !== null)
      return `Current value is ${value.map(({ value }) => value).join(', ')}. References to ${relationTable} table`;
    else return `References to ${relationTable} table`;
  };

  const getLookupValue = () => {
    if (isValidJSON(value))
      return JSON.parse(value)
        .map((element) => String(element))
        .join(', ');
    else if (typeof value === 'boolean') {
      return value.toString();
    } else return value;
  };

  switch (dataType) {
    case 'character varying':
    case 'integer':
    case 'lookup':
    case 'serial':
    case 'double precision':
      return (
        <input
          data-cy={`${String(columnName).toLocaleLowerCase().replace(/\s+/g, '-')}-input-field`}
          disabled={isPrimaryKey || dataType === 'lookup'}
          onChange={(e) => setInputValue(e.target.value)}
          defaultValue={getLookupValue(value)}
          placeholder={placeholder}
          className="form-control"
          autoComplete="off"
          onFocus={onFocused}
          type="text"
        />
      );

    case 'boolean':
      return (
        <label className={`form-switch`}>
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={Boolean(value)}
            onChange={(e) => setInputValue(e.target.checked)}
          />
        </label>
      );

    case 'relations':
      return (
        <Select
          placeholder={getPlaceholderForRelations(value)}
          isMulti={!currentColumn.relation_single}
          className="row-form__realtion-field"
          onChange={handleRelationsChange}
          isLoading={isTablesLoading}
          options={selectOptions}
          useMenuPortal={false}
          defaultValue={value}
          width="100%"
        />
      );
    default:
      break;
  }
};

export default EditRowForm;
