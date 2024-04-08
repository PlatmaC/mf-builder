import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { isArray } from 'lodash';

import DrawerFooter from '@/_ui/Drawer/DrawerFooter';
import { tooljetDatabaseService } from '@/_services';
import Select from '@/_ui/Select';

import { TooljetDatabaseContext } from '../index';
import { useAllTables } from './TableFormHelpers';

const RowForm = ({ onCreate, onClose }) => {
  const { organizationId, selectedTable, columns } = useContext(TooljetDatabaseContext);
  const { isTablesLoading, tables } = useAllTables();
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(() => {
    const data = {};
    columns.forEach(({ accessor, dataType }) => {
      if (dataType === 'boolean') {
        if (!accessor) data[accessor] = false;
      }
    });
    return data;
  });

  useEffect(() => {
    toast.dismiss();
  }, []);

  const handleInputChange = (columnName) => (e) => {
    setData({ ...data, [columnName]: e.target.value });
  };

  const handleToggleChange = (columnName) => (e) => {
    setData({ ...data, [columnName]: e.target.checked });
  };

  const handleRelationsChange = (columnName) => (newValue) => {
    setData((prevState) => ({ ...prevState, [columnName]: newValue }));
  };

  const handleSubmit = async () => {
    setFetching(true);
    const fieldsWithRelations = columns.reduce((accum, column) => {
      if (column.relation_table) return [...accum, column.accessor];
      return accum;
    }, []);

    const payload = Object.entries(data).reduce((accum, [key, value]) => {
      if (fieldsWithRelations.includes(key)) {
        return { ...accum, [key]: isArray(value) ? value.map(({ value }) => value) : [value] };
      } else return { ...accum, [key]: value };
    }, {});

    const { error } = await tooljetDatabaseService.createRow(organizationId, selectedTable, payload);
    setFetching(false);
    if (error) {
      toast.error(error?.message ?? `Failed to create a new column table "${selectedTable}"`);
      return;
    }
    toast.success(`Row created successfully`);
    onCreate && onCreate();
  };

  const removeQuotes = (str) => {
    return str?.replace(/['"]+/g, '');
  };

  const renderElement = (columnName, dataType, isPrimaryKey, defaultValue, relationTable, currentColumn) => {
    const generatePlaceholder = () => {
      if (dataType === 'lookup') {
        const lookupTable = columns.find(
          (column) => column.accessor === currentColumn.field_of_related_table
        ).relation_table;
        return `Data will be taken from ${lookupTable} table`;
      } else if (isPrimaryKey) return 'Auto-generated';
      else return 'Enter a value';
    };
    switch (dataType) {
      case 'character varying':
      case 'integer':
      case 'serial':
      case 'lookup':
      case 'double precision':
        return (
          <input
            defaultValue={
              !isPrimaryKey && dataType !== 'lookup' && defaultValue?.length > 0
                ? removeQuotes(defaultValue.split('::')[0])
                : ''
            }
            type="text"
            disabled={isPrimaryKey || dataType === 'lookup'}
            onChange={handleInputChange(columnName)}
            placeholder={generatePlaceholder()}
            className="form-control"
            data-cy={`${String(columnName).toLocaleLowerCase().replace(/\s+/g, '-')}-input-field`}
            autoComplete="off"
          />
        );

      case 'boolean':
        return (
          <label className={`form-switch`}>
            <input
              className="form-check-input"
              data-cy={`${String(columnName).toLocaleLowerCase().replace(/\s+/g, '-')}-check-input`}
              type="checkbox"
              defaultChecked={defaultValue === 'true'}
              onChange={handleToggleChange(columnName)}
            />
          </label>
        );

      case 'relations':
        return (
          <Select
            options={tables?.[relationTable.toLocaleLowerCase()] ?? []}
            placeholder={`References to ${relationTable} table`}
            onChange={handleRelationsChange(columnName)}
            isMulti={!currentColumn.relation_single}
            className="row-form__realtion-field"
            value={data[columnName] ?? []}
            isLoading={isTablesLoading}
            useMenuPortal={false}
            width="100%"
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="drawer-card-wrapper ">
      <div className="card-header">
        <h3 className="card-title" data-cy="create-new-row-header">
          Create a new row
        </h3>
      </div>
      <div className="card-body tj-app-input">
        {Array.isArray(columns) &&
          columns?.map(
            ({ Header, accessor, dataType, isPrimaryKey, column_default, relation_table, ...column }, index) => {
              return (
                <div className="mb-3" key={index}>
                  <div
                    className="form-label"
                    data-cy={`${String(Header).toLocaleLowerCase().replace(/\s+/g, '-')}-column-name-label`}
                  >
                    {Header}&nbsp;
                    <span
                      className="badge badge-outline text-blue"
                      data-cy={`${String(dataType).toLocaleLowerCase().replace(/\s+/g, '-')}-data-type-label`}
                    >
                      {isPrimaryKey ? 'SERIAL' : dataType}
                    </span>
                  </div>
                  {renderElement(accessor, dataType, isPrimaryKey, column_default, relation_table, column)}
                </div>
              );
            }
          )}
      </div>
      <DrawerFooter fetching={fetching} onClose={onClose} onCreate={handleSubmit} />
    </div>
  );
};

export default RowForm;
