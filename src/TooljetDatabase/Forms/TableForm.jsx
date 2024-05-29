import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { isEmpty } from 'lodash';

import DrawerFooter from '@/_ui/Drawer/DrawerFooter';
import { tooljetDatabaseService } from '@/_services';
import { BreadCrumbContext } from '@/App/App';

import { checkIsColumnDefaultTypeInvalid } from './TableFormHelpers';
import { TooljetDatabaseContext } from '../index';
import CreateColumnsForm from './ColumnsForm';
import { tableNameRegex } from '../constants';

const TableForm = ({
  selectedTable = '',
  selectedColumns = { 0: { column_name: 'id', data_type: 'serial', constraint: 'PRIMARY KEY' } },
  onCreate,
  onEdit,
  onClose,
  updateSelectedTable,
}) => {
  const [primaryField, setPrimaryField] = useState('id');
  const [fetching, setFetching] = useState(false);
  const [tableName, setTableName] = useState(selectedTable);
  const [columns, setColumns] = useState(selectedColumns);
  const { organizationId } = useContext(TooljetDatabaseContext);
  const isEditMode = !isEmpty(selectedTable);
  const { updateSidebarNAV } = useContext(BreadCrumbContext);

  useEffect(() => {
    toast.dismiss();
  }, []);

  const validateTableName = () => {
    if (isEmpty(tableName)) {
      toast.error('Table name cannot be empty');
      return false;
    }

    if (tableName.length > 255) {
      toast.error('Table name cannot be more than 255 characters');
      return false;
    }

    if (!tableNameRegex.test(tableName)) {
      toast.error(`Table name can only contain alphabets, numbers and underscore and shouldn't start with number.`);
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateTableName()) return;

    const columnsInfo = Object.values(columns);

    const columnNames = columnsInfo.map((column) => column.column_name);
    if (columnNames.some((columnName) => isEmpty(columnName))) {
      toast.error('Column names cannot be empty');
      return;
    }

    if (columnNames.some((columnName) => !tableNameRegex.test(columnName))) {
      toast.error(`Column names can only contain alphabets, numbers and underscore and shouldn't start with number.`);
      return;
    }

    const hasEmptyDataType = columnsInfo.some(({ data_type, column_name }) => {
      if (isEmpty(data_type)) {
        toast.error(`Data type of "${column_name}" column cannot be empty`);
        return true;
      }
    });
    if (hasEmptyDataType) return;

    const isRelationsTablesEmpty = columnsInfo.some(({ data_type, relation_table, column_name }) => {
      if (data_type === 'relations') {
        if (relation_table) return false;
        else {
          toast.error(`Please select at least one relation in "${column_name}" column`);
          return true;
        }
      }
    });
    if (isRelationsTablesEmpty) return;

    const isRelationsFieldsEmpty = columnsInfo.some(({ data_type, column_name, relation_field }) => {
      if (data_type === 'relations') {
        if (isEmpty(relation_field)) {
          toast.error(`Please select at least one relation field in "${column_name}" column`);
          return true;
        } else return false;
      }
    });
    if (isRelationsFieldsEmpty) return;

    const hasInvalidDefaultValue = columnsInfo.some((column) => {
      if (column.default)
        return checkIsColumnDefaultTypeInvalid({
          columnName: column.column_name,
          defaultValue: column.default,
          dataType: column.data_type,
        });
      else return false;
    });
    if (hasInvalidDefaultValue) return;

    const payload = columnsInfo.map((column) => {
      if (column.relation_field)
        return { ...column, relation_field: column.relation_field.map((field) => field.value).join(', ') };
      else return column;
    });

    setFetching(true);
    const { error } = await tooljetDatabaseService.createTable(organizationId, tableName, payload);
    if (error) return toast.error(error?.message ?? `Failed to create a new table "${tableName}"`);
    else await tooljetDatabaseService.changePrimaryField(organizationId, tableName, primaryField);
    setFetching(false);
    toast.success(`${tableName} created successfully`);
    onCreate && onCreate(tableName);
  };

  const handleEdit = async () => {
    if (!validateTableName()) return;

    setFetching(true);
    const { error } = await tooljetDatabaseService.renameTable(organizationId, selectedTable, tableName);
    setFetching(false);

    if (error) {
      toast.error(error?.message ?? `Failed to edit table "${tableName}"`);
      return;
    }

    toast.success(`${tableName} edited successfully`);
    updateSidebarNAV(tableName);
    updateSelectedTable(tableName);

    onEdit && onEdit();
  };

  const handleChangePrimaryField = (newValue) => setPrimaryField(newValue);

  useEffect(() => {
    const isPrimaryFieldNotExistInColumns = Object.values(columns).every(
      (columns) => columns.column_name !== primaryField
    );
    if (isPrimaryFieldNotExistInColumns) setPrimaryField('id');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  return (
    <div className="drawer-card-wrapper">
      <div className="card-header">
        {!isEditMode && (
          <h3 className="card-title" data-cy="create-new-table-header">
            Create a new table
          </h3>
        )}
        {isEditMode && (
          <h3 className="card-title" data-cy="edit-table-header">
            Edit table
          </h3>
        )}
      </div>
      <div>
        <div className="card-body">
          <div className="mb-3">
            <div className="form-label" data-cy="table-name-label">
              Table name
            </div>
            <div className="tj-app-input">
              <input
                type="text"
                placeholder="Enter table name"
                name="table-name"
                className="form-control"
                data-cy="table-name-input-field"
                autoComplete="off"
                value={tableName}
                onChange={(e) => {
                  setTableName(e.target.value);
                }}
                autoFocus
              />
            </div>
          </div>
        </div>
        {!isEditMode && <CreateColumnsForm {...{ handleChangePrimaryField, primaryField, setColumns, columns }} />}
      </div>
      <DrawerFooter
        fetching={fetching}
        isEditMode={isEditMode}
        onClose={onClose}
        onEdit={handleEdit}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default TableForm;
