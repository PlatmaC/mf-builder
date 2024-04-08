import { HeaderGroup } from 'react-table';
import toast from 'react-hot-toast';
import cx from 'classnames';
import {
  useImperativeHandle,
  SetStateAction,
  ChangeEvent,
  forwardRef,
  useContext,
  Dispatch,
  useState,
  useMemo,
  useEffect,
} from 'react';

import { ColumnType, TooljetDatabaseContextType } from '@/types/DBTypes/ContextTypes';
import { DataDenominationType } from '@/types/DBTypes/TableTypes';
import { tooljetDatabaseService } from '@/_services';
import Toggle from '@/_ui/Toggle';
import Select from '@/_ui/Select';

import { SelectOptions } from '@/types/GeneralTypes/Global';

import { clearDefaultValue } from './TableFormHelpers';
import { TooljetDatabaseContext } from '..';
import { dataTypes } from '../constants';

export type ColumnFormApiType = {
  setIsSetSelectedRelationsTouched: Dispatch<SetStateAction<boolean>>;
  selectedRelationTable: { name: string; columns: SelectOptions };
  setIsColumnNameTouched: Dispatch<SetStateAction<boolean>>;
  setIsDataTypeTouched: Dispatch<SetStateAction<boolean>>;
  setIsDefaultTouched: Dispatch<SetStateAction<boolean>>;
  selectedRelationFields: SelectOptions | string | null;
  setColumnName: Dispatch<SetStateAction<string>>;
  dataType: DataDenominationType | null;
  isPrimaryFieldTouched: boolean;
  isColumnNameTouched: boolean;
  lookupSource: string | null;
  isDataTypeTouched: boolean;
  isDefaultTouched: boolean;
  isSingleValue: boolean;
  isFormTouched: boolean;
  resetForm: () => void;
  primaryField: string;
  defaultValue: string;
  columnName: string;
};

type ColumnFormPropsType = {
  selectedColumn?: HeaderGroup & ColumnType;
};

export const ColumnForm = forwardRef<ColumnFormApiType, ColumnFormPropsType>(({ selectedColumn }, ref) => {
  const [columnName, setColumnName] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [primaryField, setPrimaryField] = useState('id');
  const [isSingleValue, setIsSingleValue] = useState(true);
  const [isColumnLoading, setIsColumnLoading] = useState(false);
  const [isDefaultTouched, setIsDefaultTouched] = useState(false);
  const [isDataTypeTouched, setIsDataTypeTouched] = useState(false);
  const [lookupSource, setLookupSource] = useState<string | null>(null);
  const [isColumnNameTouched, setIsColumnNameTouched] = useState(false);
  const [isPrimaryFieldTouched, setPrimaryFieldTouched] = useState(false);
  const [dataType, setDataType] = useState<DataDenominationType | null>(null);
  const [isSelectedRelationsTouched, setIsSetSelectedRelationsTouched] = useState(false);
  const [selectedRelationFields, setSelectedRelationFields] = useState<SelectOptions | string | null>(null);
  const [selectedRelationTable, setSelectedRelations] = useState<{ name: string; columns: SelectOptions }>({
    columns: [],
    name: '',
  });
  const { organizationId, selectedTable, tables, columns } = useContext(
    TooljetDatabaseContext
  ) as TooljetDatabaseContextType;

  const tableOptions = useMemo(() => {
    return tables
      .filter((table) => table.table_name !== selectedTable)
      .map((table) => ({ value: table.table_name, label: table.table_name }));
  }, [selectedTable, tables]);

  const lookupOptions = useMemo(() => {
    return columns
      .filter((column) => column.dataType === 'relations')
      .map((column) => ({ value: column.accessor, label: column.Header }));
  }, [columns]);

  const columnOptions = useMemo(() => {
    return columns.map((column) => ({ value: column.accessor, label: column.Header }));
  }, [columns]);

  const handleChangeRelationTable = async (newTableName: string, preventResetFields = false) => {
    setIsSetSelectedRelationsTouched(true);
    setIsColumnLoading(true);
    const { error, data } = await tooljetDatabaseService.viewTable(organizationId, newTableName);
    if (error) toast.error(error?.message ?? `Problem with getting "${selectedTable}" table info`);
    else {
      setSelectedRelations({
        name: newTableName,
        columns: data.result.map((column) => ({ value: column.column_name, label: column.column_name })),
      });
      !preventResetFields && setSelectedRelationFields(dataType === 'relations' ? 'id' : null);
    }
    setIsColumnLoading(false);
  };

  const handleTypeChange = (newType: DataDenominationType) => {
    if (dataType === 'relations' || dataType === 'lookup') {
      setSelectedRelations({ name: '', columns: [] });
      setSelectedRelationFields(dataType === 'relations' ? 'id' : null);
    }
    if (dataType === 'lookup') setLookupSource(null);
    setDataType(newType);
    !isDataTypeTouched && setIsDataTypeTouched(true);
  };

  const resetForm = () => {
    setSelectedRelations({ columns: [], name: '' });
    setIsSetSelectedRelationsTouched(false);
    setSelectedRelationFields(null);
    setIsColumnNameTouched(false);
    setIsDataTypeTouched(false);
    setIsDefaultTouched(false);
    setIsColumnLoading(false);
    setIsSingleValue(false);
    setLookupSource(null);
    setDefaultValue('');
    setDataType(null);
    setColumnName('');
  };

  useImperativeHandle(
    ref,
    () => ({
      isFormTouched: isColumnNameTouched || isDataTypeTouched || isDefaultTouched || isSelectedRelationsTouched,
      setIsSetSelectedRelationsTouched,
      setIsColumnNameTouched,
      selectedRelationFields,
      selectedRelationTable,
      isPrimaryFieldTouched,
      setIsDataTypeTouched,
      setIsDefaultTouched,
      isColumnNameTouched,
      isDataTypeTouched,
      isDefaultTouched,
      setLookupSource,
      isSingleValue,
      setColumnName,
      lookupSource,
      primaryField,
      defaultValue,
      columnName,
      resetForm,
      dataType,
    }),
    [
      setIsSetSelectedRelationsTouched,
      isSelectedRelationsTouched,
      selectedRelationFields,
      selectedRelationTable,
      isPrimaryFieldTouched,
      isColumnNameTouched,
      isDataTypeTouched,
      isDefaultTouched,
      setLookupSource,
      isSingleValue,
      lookupSource,
      defaultValue,
      primaryField,
      columnName,
      dataType,
    ]
  );

  useEffect(() => {
    if (selectedColumn) {
      setDataType(selectedColumn.dataType);
      setColumnName(selectedColumn.Header as string);
      setPrimaryField(selectedColumn.primaryField);
      if (selectedColumn.dataType === 'relations' && selectedColumn.relation_table && selectedColumn.relation_field) {
        selectedColumn.relation_locked_field && setIsSingleValue(true);
        handleChangeRelationTable(selectedColumn.relation_table, true);
        setIsSingleValue(Boolean(selectedColumn.relation_single));
        setSelectedRelationFields('id');
      } else if (
        selectedColumn.dataType === 'lookup' &&
        selectedColumn.field_of_related_table &&
        selectedColumn.field_to_lookup
      ) {
        handleChangeLookupSource(selectedColumn.field_of_related_table, true);
        handleChangeRelationFields(selectedColumn.field_to_lookup);
      } else {
        selectedColumn.column_default && setDefaultValue(clearDefaultValue(selectedColumn.column_default));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColumn]);

  const handleColumnNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    !isColumnNameTouched && setIsColumnNameTouched(true);
    setColumnName(e.target.value);
  };

  const handleDefaultOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    !isDataTypeTouched && setIsDefaultTouched(true);
    setDefaultValue(e.target.value);
  };

  const handleChangePrimaryField = (newValue: string) => {
    !isPrimaryFieldTouched && setPrimaryFieldTouched(true);
    setPrimaryField(newValue);
  };

  const handleChangeRelationFields = (newValue: SelectOptions | string) => setSelectedRelationFields(newValue);
  const handleChangeSingleValue = (e: ChangeEvent<HTMLInputElement>) => setIsSingleValue(!e.target.checked);
  const handleChangeLookupSource = (newValue: string, preventResetFields: boolean) => {
    setLookupSource(newValue);
    const tableForLookup = columns.find((column) => column.accessor === newValue)?.relation_table;
    tableForLookup && handleChangeRelationTable(tableForLookup, preventResetFields);
  };

  const renderPrimaryField = () => {
    return (
      <div className="mb-3 data-type-dropdown-section" data-cy="data-type-dropdown-section">
        <div className="form-label" data-cy="data-type-input-field-label">
          Select primary field
        </div>
        <Select
          onChange={handleChangePrimaryField}
          isLoading={isColumnLoading}
          placeholder="Choose field"
          options={columnOptions}
          useMenuPortal={false}
          value={primaryField}
          customWrap={true}
        />
      </div>
    );
  };

  const renderInputTypes = () => {
    switch (dataType) {
      case 'relations':
        return (
          <>
            <div className="mb-3 data-type-dropdown-section" data-cy="data-type-dropdown-section">
              <div className="form-label" data-cy="data-type-input-field-label">
                Select a table to link to
              </div>
              <Select
                onChange={handleChangeRelationTable}
                value={selectedRelationTable.name}
                isLoading={isColumnLoading}
                placeholder="Select table"
                options={tableOptions}
                useMenuPortal={false}
                customWrap={true}
              />
            </div>
            <div
              className="mb-3 data-type-dropdown-section column-form__realtion-field"
              data-cy="data-type-dropdown-section"
            >
              <div className="form-label" data-cy="data-type-input-field-label">
                Allow linking to multiple records
              </div>
              <Toggle onChange={handleChangeSingleValue} checked={!isSingleValue} />
            </div>
          </>
        );
      case 'lookup':
        return (
          <>
            <div className="mb-3 data-type-dropdown-section" data-cy="data-type-dropdown-section">
              <div className="form-label" data-cy="data-type-input-field-label">
                Select lookup source
              </div>
              <Select
                onChange={handleChangeLookupSource}
                isLoading={isColumnLoading}
                placeholder="Make a choise"
                options={lookupOptions}
                useMenuPortal={false}
                value={lookupSource}
                customWrap={true}
              />
            </div>
            {/* <div
              className="mb-3 data-type-dropdown-section column-form__realtion-field"
              data-cy="data-type-dropdown-section"
            >
              <div className="form-label" data-cy="data-type-input-field-label">
                Foreign key
              </div>
              <Select
                onChange={handleChangeLookupColumn}
                value={selectedLookupColumn}
                placeholder="Select column"
                options={foreignOptions}
                useMenuPortal={false}
                customWrap={true}
                isMulti={false}
              />
            </div> */}
            {selectedRelationTable.name && (
              <div
                className="mb-3 data-type-dropdown-section column-form__realtion-field"
                data-cy="data-type-dropdown-section"
              >
                <div className="form-label" data-cy="data-type-input-field-label">
                  Choose field you want to look up
                </div>
                <Select
                  options={selectedRelationTable.columns}
                  onChange={handleChangeRelationFields}
                  value={selectedRelationFields}
                  isLoading={isColumnLoading}
                  placeholder="Select fields"
                  useMenuPortal={false}
                  customWrap={true}
                />
              </div>
            )}
          </>
        );
      default:
        return (
          <div className="mb-3 tj-app-input">
            <div className="form-label" data-cy="default-value-input-field-label">
              Default value
            </div>
            <input
              placeholder="Enter default value"
              data-cy="default-value-input-field"
              onChange={handleDefaultOnChange}
              className="form-control"
              value={defaultValue}
              autoComplete="off"
              type="text"
            />
          </div>
        );
    }
  };

  return (
    <div className="card-body">
      <div className="mb-3 tj-app-input">
        <div className="form-label" data-cy="column-name-input-field-label">
          Column name
        </div>
        <input
          className={cx('form-control', { 'react-select__control--is-disabled': selectedColumn?.isPrimaryKey })}
          disabled={selectedColumn?.isPrimaryKey}
          onChange={handleColumnNameChange}
          data-cy="column-name-input-field"
          placeholder="Enter column name"
          value={columnName}
          autoComplete="off"
          type="text"
          autoFocus
        />
      </div>
      <div className="mb-3 data-type-dropdown-section" data-cy="data-type-dropdown-section">
        <div className="form-label" data-cy="data-type-input-field-label">
          Data type
        </div>
        <Select
          isDisabled={selectedColumn?.isPrimaryKey}
          placeholder="Select data type"
          onChange={handleTypeChange}
          options={[...dataTypes]}
          useMenuPortal={false}
          customWrap={true}
          value={dataType}
        />
      </div>
      {selectedColumn?.isPrimaryKey ? renderPrimaryField() : renderInputTypes()}
    </div>
  );
});
