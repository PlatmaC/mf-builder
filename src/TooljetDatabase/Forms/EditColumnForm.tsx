import { useContext, useRef, useState } from 'react';
import { HeaderGroup } from 'react-table';
import toast from 'react-hot-toast';

import { ColumnType, TooljetDatabaseContextType } from '@/types/DBTypes/ContextTypes';
import DrawerFooter from '@/_ui/Drawer/DrawerFooter';
import { tooljetDatabaseService } from '@/_services';

import { checkIsColumnDefaultTypeInvalid } from './TableFormHelpers';
import { ColumnForm, ColumnFormApiType } from './ColumnForm';
import { TooljetDatabaseContext } from '..';

type EditColumnFormPropsType = {
  selectedColumn?: HeaderGroup & ColumnType;
  fetchTableMetadata: () => void;
  fetchTableData: () => void;
  onClose: () => void;
};

export const EditColumnForm = ({
  fetchTableMetadata,
  fetchTableData,
  selectedColumn,
  onClose,
}: EditColumnFormPropsType) => {
  const { organizationId, selectedTable, columns } = useContext(TooljetDatabaseContext) as TooljetDatabaseContextType;
  const columnFormAPI = useRef<ColumnFormApiType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const renameColumn = async () => {
    if (columnFormAPI.current?.isColumnNameTouched) {
      if (!columnFormAPI.current?.columnName && columnFormAPI.current?.isColumnNameTouched)
        return toast.error(`Column name must contain at least 1 letter`, { className: 'edit-column-error' });
      setIsLoading(true);
      const oldColumnName = String(selectedColumn?.Header);
      if (columnFormAPI.current?.columnName !== oldColumnName) {
        const { error } = await tooljetDatabaseService.renameColumn(
          organizationId,
          selectedTable,
          oldColumnName,
          columnFormAPI.current?.columnName
        );
        if (error) toast.error(error?.message ?? `Failed to rename "${oldColumnName}" column`);
      }
    }
  };

  const alterColumn = async () => {
    setIsLoading(true);
    const isDefaultTypeInvalid = columnFormAPI.current?.defaultValue
      ? checkIsColumnDefaultTypeInvalid({
          defaultValue: columnFormAPI.current.defaultValue,
          columnName: columnFormAPI.current.columnName,
          dataType: columnFormAPI.current.dataType,
        })
      : false;
    if (!isDefaultTypeInvalid) {
      if (selectedColumn?.dataType === 'relations' && columnFormAPI.current?.dataType !== 'relations') {
        const relatedColumns = columns.filter((column) => column.field_of_related_table === selectedColumn.Header);
        if (relatedColumns.length > 0) {
          const relatedColumnNames = relatedColumns.map((relatedColumn) => relatedColumn.Header).join(', ');
          const shouldDelete = confirm(
            `You are going to change the type of a column that is referenced by other columns: "${relatedColumnNames}". To avoid errors, you need to delete all lookups related to "${columnFormAPI.current?.columnName}". Are you sure you want to change the type of the column "${columnFormAPI.current?.columnName}" and remove "${relatedColumnNames}"?`
          );
          if (shouldDelete) {
            await Promise.all(
              relatedColumns.map((relatedColumn) =>
                tooljetDatabaseService.deleteColumn(organizationId, selectedTable, relatedColumn.Header)
              )
            );
          }
        }
      }
      const { error } = await tooljetDatabaseService.alterColumn(organizationId, selectedTable, {
        ...(columnFormAPI.current?.dataType === 'relations' && {
          relation_table: columnFormAPI.current?.selectedRelationTable.name,
          relation_field: columnFormAPI.current?.selectedRelationFields,
          relation_single: columnFormAPI.current?.isSingleValue,
        }),
        ...(columnFormAPI.current?.dataType === 'lookup' && {
          field_to_lookup: columnFormAPI.current?.selectedRelationFields,
          field_of_related_table: columnFormAPI.current?.lookupSource,
        }),
        new_data_type: columnFormAPI.current?.dataType,
        column_name: columnFormAPI.current?.columnName,
        default: columnFormAPI.current?.defaultValue,
        data_type: selectedColumn?.dataType,
        table_name: selectedTable,
      });
      if (error) toast.error(error?.message ?? `Failed to alter "${selectedColumn?.Header}" column type`);
    }
  };

  const setPrimaryField = async () => {
    if (!columnFormAPI.current?.isPrimaryFieldTouched)
      return toast.error(`There were no changes`, { className: 'edit-column-error' });
    setIsLoading(true);
    await tooljetDatabaseService.changePrimaryField(organizationId, selectedTable, columnFormAPI.current?.primaryField);
    successClose();
  };

  const successClose = () => {
    columnFormAPI.current?.resetForm();
    fetchTableMetadata();
    setIsLoading(false);
    fetchTableData();
    onClose();
  };

  const submit = async () => {
    if (selectedColumn?.isPrimaryKey) await setPrimaryField();
    else {
      if (!columnFormAPI.current?.isFormTouched)
        return toast.error(`There were no changes`, { className: 'edit-column-error' });
      await renameColumn();
      await alterColumn();
      successClose();
    }
  };

  return (
    <div className="drawer-card-wrapper">
      <div className="drawer-card-title">
        <h3 className="" data-cy="create-new-column-header">
          Edit column
        </h3>
      </div>
      <ColumnForm ref={columnFormAPI} selectedColumn={selectedColumn} />
      <DrawerFooter
        submitButtonProps={{ isLoading, loadingWithChildren: true }}
        onCreate={undefined}
        fetching={isLoading}
        onClose={onClose}
        onEdit={submit}
        isEditMode
      />
    </div>
  );
};
