import HttpClient from '@/_helpers/http-client';

const tooljetAdapter = new HttpClient();

const getAppId = () => location.pathname.split('/')[2];

function findOne(organizationId, tableName, query = '') {
  return tooljetAdapter.get(
    `/tooljet_db/organizations/${organizationId}/proxy/\${${tableName}}?uiAppId=${getAppId()}&${query}`
  );
}

function findAll(organizationId) {
  return tooljetAdapter.get(`/tooljet_db/organizations/${organizationId}/tables?uiAppId=${getAppId()}`);
}

function createTable(organizationId, tableName, columns) {
  return tooljetAdapter.post(`/tooljet_db/organizations/${organizationId}/table?uiAppId=${getAppId()}`, {
    table_name: tableName,
    columns,
  });
}

function cloneTable(organizationId, tableName) {
  return tooljetAdapter.post(`/tooljet_db/organizations/${organizationId}/clone-table`, {
    table_name: tableName,
  });
}

function viewTable(organizationId, tableName) {
  return tooljetAdapter.get(`/tooljet_db/organizations/${organizationId}/table/${tableName}?uiAppId=${getAppId()}`);
}

function createRow(organizationId, tableName, data) {
  return tooljetAdapter.post(
    `/tooljet_db/organizations/${organizationId}/proxy/\${${tableName}}?uiAppId=${getAppId()}`,
    data
  );
}

function createColumn(organizationId, tableName, columnName, dataType, defaultValue, extraPayload) {
  return tooljetAdapter.post(
    `/tooljet_db/organizations/${organizationId}/table/${tableName}/column?uiAppId=${getAppId()}`,
    {
      column: {
        column_name: columnName,
        data_type: dataType,
        ...(extraPayload ? extraPayload : { default: defaultValue }),
      },
    }
  );
}

function updateTable(organizationId, tableName, columns) {
  return tooljetAdapter.patch(`/tooljet_db/${organizationId}/perform?uiAppId=${getAppId()}`, {
    action: 'update_table',
    table_name: tableName,
    columns,
  });
}

function renameTable(organizationId, tableName, newTableName) {
  return tooljetAdapter.patch(`/tooljet_db/organizations/${organizationId}/table/${tableName}?uiAppId=${getAppId()}`, {
    action: 'rename_table',
    table_name: tableName,
    new_table_name: newTableName,
  });
}

function reorderColumn(organizationId, tableName, columnNamesInOrder) {
  return tooljetAdapter.patch(`/tooljet_db/organizations/${organizationId}/table/${tableName}/reorder-column`, {
    table_name: tableName,
    columnNamesInOrder,
  });
}

function renameColumn(organizationId, tableName, columnName, newColumnName) {
  return tooljetAdapter.patch(`/tooljet_db/organizations/${organizationId}/table/${tableName}/rename-column`, {
    table_name: tableName,
    column_name: columnName,
    new_column_name: newColumnName,
  });
}

function alterColumn(organizationId, tableName, column) {
  return tooljetAdapter.patch(`/tooljet_db/organizations/${organizationId}/table/${tableName}/alter-column`, column);
}

function updateRows(organizationId, tableName, data, query = '') {
  return tooljetAdapter.patch(
    `/tooljet_db/organizations/${organizationId}/proxy/\${${tableName}}?uiAppId=${getAppId()}&${query}`,
    data
  );
}

function deleteRow(organizationId, tableName, query = '') {
  return tooljetAdapter.delete(
    `/tooljet_db/organizations/${organizationId}/proxy/\${${tableName}}?uiAppId=${getAppId()}&${query}`
  );
}

function deleteColumn(organizationId, tableName, columnName) {
  return tooljetAdapter.delete(
    `/tooljet_db/organizations/${organizationId}/table/${tableName}/column/${columnName}?uiAppId=${getAppId()}`
  );
}

function deleteTable(organizationId, tableName) {
  return tooljetAdapter.delete(`/tooljet_db/organizations/${organizationId}/table/${tableName}?uiAppId=${getAppId()}`);
}

function bulkUpload(organizationId, tableName, file) {
  return tooljetAdapter.post(`/tooljet_db/organizations/${organizationId}/table/${tableName}/bulk-upload`, file);
}

function joinTables(organizationId, data) {
  return tooljetAdapter.post(`/tooljet_db/organizations/${organizationId}/join/?uiAppId=${getAppId()}`, data);
}

function changePrimaryField(organizationId, tableName, primaryField) {
  return tooljetAdapter.patch(
    `/tooljet_db/organizations/${organizationId}/table/${tableName}/primary_field?field=${primaryField}`
  );
}

export const tooljetDatabaseService = {
  findOne,
  findAll,
  viewTable,
  createRow,
  cloneTable,
  createTable,
  createColumn,
  reorderColumn,
  changePrimaryField,
  deleteColumn,
  renameColumn,
  updateTable,
  deleteTable,
  renameTable,
  alterColumn,
  updateRows,
  bulkUpload,
  joinTables,
  deleteRow,
};
