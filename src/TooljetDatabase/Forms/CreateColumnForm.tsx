import { useState, useContext, useRef } from 'react';
import { toast } from 'react-hot-toast';

import { TooljetDatabaseContextType } from '@/types/DBTypes/ContextTypes';
import { tooljetDatabaseService } from '@/_services';
import DrawerFooter from '@/_ui/Drawer/DrawerFooter';

import { ColumnForm, ColumnFormApiType } from './ColumnForm';
import { TooljetDatabaseContext } from '../index';
import {
  generateCreateColumnExtraPayload,
  checkIsColumnDefaultTypeInvalid,
  isCreateColumnFormInvalid,
} from './TableFormHelpers';

const CreateColumnForm = ({ onCreate, onClose }) => {
  const { organizationId, selectedTable } = useContext(TooljetDatabaseContext) as TooljetDatabaseContextType;
  const columnFormAPI = useRef<ColumnFormApiType>(null);
  const [fetching, setFetching] = useState(false);

  const handleCreate = async () => {
    const isFormInvalid = isCreateColumnFormInvalid({
      selectedRelationTableName: columnFormAPI.current?.selectedRelationTable.name,
      selectedRelationFields: columnFormAPI.current?.selectedRelationFields,
      lookupSource: columnFormAPI.current?.lookupSource,
      columnName: columnFormAPI.current?.columnName,
      dataType: columnFormAPI.current?.dataType,
    });
    if (!isFormInvalid) {
      const isDefaultTypeInvalid = columnFormAPI.current?.defaultValue
        ? checkIsColumnDefaultTypeInvalid({
            defaultValue: columnFormAPI.current.defaultValue,
            columnName: columnFormAPI.current.columnName,
            dataType: columnFormAPI.current.dataType,
          })
        : false;
      if (isDefaultTypeInvalid) return;
      setFetching(true);
      const { error } = await tooljetDatabaseService.createColumn(
        organizationId,
        selectedTable,
        columnFormAPI.current?.columnName,
        columnFormAPI.current?.dataType,
        columnFormAPI.current?.defaultValue,
        generateCreateColumnExtraPayload({
          selectedRelationTableName: columnFormAPI.current?.selectedRelationTable.name,
          selectedRelationFields: columnFormAPI.current?.selectedRelationFields,
          lookupSource: columnFormAPI.current?.lookupSource,
          isSingleValue: columnFormAPI.current?.isSingleValue,
          dataType: columnFormAPI.current?.dataType,
        })
      );
      setFetching(false);
      if (error) return toast.error(error?.message ?? `Failed to create a new column in "${selectedTable}" table`);
      else {
        onCreate?.();
        return toast.success(`Column created successfully`);
      }
    }
  };

  return (
    <div className="drawer-card-wrapper ">
      <div className="drawer-card-title ">
        <h3 className="" data-cy="create-new-column-header">
          Create a new column
        </h3>
      </div>
      <ColumnForm ref={columnFormAPI} />
      <DrawerFooter fetching={fetching} onClose={onClose} onCreate={handleCreate} onEdit={undefined} />
    </div>
  );
};

export default CreateColumnForm;
