import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useState, useContext, Fragment, useEffect } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { toast } from 'react-hot-toast';
import cx from 'classnames';

import EmptyFoldersIllustration from '@assets/images/icons/no-queries-added.svg';
import IndeterminateCheckbox from '@/_ui/IndeterminateCheckbox';
import { tooljetDatabaseService } from '@/_services';
import Drawer from '@/_ui/Drawer';

import { useTableData, checkDataType, renderColumnValue } from './TableHelpers';
import { EditColumnForm } from '../Forms/EditColumnForm';
import { TooljetDatabaseContext } from '../index';
import { ColumnHeader } from './ColumnHeader';
import TableFooter from './Footer';

const Table = ({ openCreateRowDrawer, openCreateColumnDrawer, refreshPointer }) => {
  const { organizationId, columns, selectedTable } = useContext(TooljetDatabaseContext);
  const [isRelationsLoading, setIsRelationsLoading] = useState(true);
  const darkMode = localStorage.getItem('darkMode') === 'true';
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [primaryFields, setPrimaryFields] = useState();
  const {
    handleDeleteColumn,
    fetchTableMetadata,
    fetchTableData,
    isLoadingData,
    isLoadingMeta,
    tableColumns,
    tableData,
    onDragEnd,
  } = useTableData({ refreshPointer, isOutsideLoading: isRelationsLoading });

  const isLoading = isRelationsLoading || isLoadingData || isLoadingMeta;

  const {
    state: { selectedRowIds },
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns: tableColumns, data: tableData }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  });

  useEffect(() => {
    (async () => {
      const relationsTableNames = columns.filter((column) => {
        return column.dataType === 'relations' && !primaryFields[column.relation_table];
      });
      Promise.all(
        relationsTableNames.map(({ relation_table }) =>
          tooljetDatabaseService.viewTable(organizationId, relation_table)
        )
      )
        .then((data) => {
          setPrimaryFields((prevFields) => ({
            ...prevFields,
            ...data.reduce((accum, current, index) => {
              const primaryColumn = current.data.result?.find((column) => column.keytype === 'PRIMARY KEY');
              return { ...accum, [relationsTableNames[index].relation_table]: primaryColumn?.primaryField };
            }, {}),
          }));
        })
        .finally(() => setIsRelationsLoading(false));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  useEffect(() => {
    setIsRelationsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTable]);

  useEffect(() => {
    setPrimaryFields((prevState) => {
      return { ...prevState, [selectedTable]: columns.find((column) => column.isPrimaryKey)?.primaryField };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  if (!selectedTable) return null;

  const handleDeleteRow = async () => {
    const shouldDelete = confirm('Are you sure you want to delete the selected rows?');
    if (shouldDelete) {
      const selectedRows = Object.keys(selectedRowIds).map((key) => rows[key]);
      const primaryKey = columns.find((column) => column.isPrimaryKey);
      const deletionKeys = selectedRows.map((row) => row.values[primaryKey.accessor]);
      const query = `?${primaryKey.accessor}=in.(${deletionKeys.toString()})`;
      const { error } = await tooljetDatabaseService.deleteRow(organizationId, selectedTable, query);
      if (error) return toast.error(error?.message ?? `Error deleting rows from table "${selectedTable}"`);
      else {
        toast.success(`Deleted ${selectedRows.length} rows from table "${selectedTable}"`);
        fetchTableData();
      }
    }
  };

  return (
    <div>
      {Object.keys(selectedRowIds).length > 0 && (
        <div className="w-100 bg-white">
          <button
            onClick={handleDeleteRow}
            type="button"
            className="btn border-0 d-flex align-items-center delete-row-btn"
            data-cy="delete-row-records-button"
          >
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-cy="delete-row-records-icon"
            >
              <path
                d="M2.97721 13.4306C2.62166 13.4306 2.31332 13.3 2.05221 13.0389C1.7911 12.7778 1.66055 12.4695 1.66055 12.1139V2.78059H1.47721C1.28832 2.78059 1.12999 2.71671 1.00221 2.58893C0.874436 2.46115 0.810547 2.30282 0.810547 2.11393C0.810547 1.92504 0.874436 1.7667 1.00221 1.63893C1.12999 1.51115 1.28832 1.44726 1.47721 1.44726H4.36055C4.36055 1.25837 4.42444 1.10004 4.55221 0.97226C4.67999 0.844483 4.83832 0.780594 5.02721 0.780594H8.39388C8.58277 0.780594 8.74388 0.847261 8.87721 0.980594C9.01055 1.11393 9.07721 1.26948 9.07721 1.44726H11.9439C12.1328 1.44726 12.2911 1.51115 12.4189 1.63893C12.5467 1.7667 12.6105 1.92504 12.6105 2.11393C12.6105 2.30282 12.5467 2.46115 12.4189 2.58893C12.2911 2.71671 12.1328 2.78059 11.9439 2.78059H11.7605V12.1139C11.7605 12.4695 11.63 12.7778 11.3689 13.0389C11.1078 13.3 10.7994 13.4306 10.4439 13.4306H2.97721ZM2.97721 2.78059V12.1139H10.4439V2.78059H2.97721ZM4.71055 10.1806C4.71055 10.3362 4.7661 10.4695 4.87721 10.5806C4.98832 10.6917 5.12166 10.7473 5.27721 10.7473C5.44388 10.7473 5.58277 10.6917 5.69388 10.5806C5.80499 10.4695 5.86055 10.3362 5.86055 10.1806V4.69726C5.86055 4.53059 5.80221 4.38893 5.68555 4.27226C5.56888 4.15559 5.43277 4.09726 5.27721 4.09726C5.11055 4.09726 4.97444 4.15559 4.86888 4.27226C4.76332 4.38893 4.71055 4.53059 4.71055 4.69726V10.1806ZM7.56055 10.1806C7.56055 10.3362 7.61888 10.4695 7.73555 10.5806C7.85221 10.6917 7.98832 10.7473 8.14388 10.7473C8.31055 10.7473 8.44944 10.6917 8.56055 10.5806C8.67166 10.4695 8.72721 10.3362 8.72721 10.1806V4.69726C8.72721 4.53059 8.66888 4.38893 8.55221 4.27226C8.43555 4.15559 8.29944 4.09726 8.14388 4.09726C7.97721 4.09726 7.83832 4.15559 7.72721 4.27226C7.6161 4.38893 7.56055 4.53059 7.56055 4.69726V10.1806ZM2.97721 2.78059V12.1139V2.78059Z"
                fill="#FF6972"
              />
            </svg>
            &nbsp; Delete records
          </button>
        </div>
      )}
      <div
        className={cx('table-responsive border-0 tj-db-table animation-fade')}
        style={{ height: 'calc(100vh - 237px)' }}
      >
        <div className="database-table__wrapper position-relative">
          <table
            {...getTableProps()}
            className="table w-auto card-table table-bordered table-vcenter text-nowrap datatable"
          >
            <thead>
              {headerGroups.map((headerGroup, index) => {
                const selectHeader = headerGroup.headers.find((header) => header.id === 'selection');
                const innerTableHeader = headerGroup.headers.filter((header) => header.id !== 'selection');
                return (
                  <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} key={index}>
                    <SortableContext strategy={horizontalListSortingStrategy} items={innerTableHeader}>
                      <tr className="tj-database-column-row" {...headerGroup.getHeaderGroupProps()}>
                        <>
                          <th
                            className={cx(
                              'table-header tj-database-column-header tj-text-xsm tj-database-column-header--selection'
                            )}
                            title={selectHeader.render('Header')}
                            {...selectHeader.getHeaderProps()}
                            width={49}
                          >
                            {selectHeader.render('Header')}
                          </th>
                          {innerTableHeader.map((column, index) => (
                            <ColumnHeader
                              {...{ column, handleDeleteColumn, setSelectedColumn, checkDataType, isLoading, darkMode }}
                              key={index}
                            />
                          ))}
                        </>
                      </tr>
                    </SortableContext>
                  </DndContext>
                );
              })}
            </thead>
            <tbody className={cx({ 'bg-white': rows.length > 0 && !darkMode })} {...getTableBodyProps()}>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                      <div className="mb-3">
                        <EmptyFoldersIllustration />
                      </div>
                      <div className="text-center">
                        <div className="text-h3" data-cy="do-not-have-records-text">
                          You don&apos;t have any records yet.
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <Fragment key={index}>
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell, index) => {
                          const dataCy =
                            cell.column.id === 'selection'
                              ? `${cell.row.values?.id}-checkbox`
                              : `id-${cell.row.values?.id}-column-${cell.column.id}`;
                          return (
                            <td
                              key={`cell.value-${index}`}
                              title={cell.value || ''}
                              className={cx('table-cell', {
                                ['table-cell__align-right']:
                                  (cell.column.dataType === 'integer' || cell.column.dataType === 'double precision') &&
                                  !cell.column.isPrimaryKey,
                                ['tj-database-primary-column']: cell.column.isPrimaryKey && !isLoading,
                              })}
                              data-cy={`${dataCy.toLocaleLowerCase().replace(/\s+/g, '-')}-table-cell`}
                              {...cell.getCellProps()}
                            >
                              {renderColumnValue(cell, isLoading, selectedTable, primaryFields)}
                            </td>
                          );
                        })}
                      </tr>
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
          <button onClick={() => openCreateColumnDrawer()} className="add-row-btn-database">
            +
          </button>
          <button onClick={() => openCreateRowDrawer()} className="add-col-btn-database">
            +
          </button>
        </div>

        <TableFooter
          darkMode={darkMode}
          openCreateRowDrawer={openCreateRowDrawer}
          dataLoading={isLoading}
          tableDataLength={tableData.length}
        />
      </div>
      <Drawer isOpen={Boolean(selectedColumn)} onClose={() => setSelectedColumn(null)} position="right" zIndex={9999}>
        <EditColumnForm
          onClose={() => setSelectedColumn(null)}
          fetchTableMetadata={fetchTableMetadata}
          fetchTableData={fetchTableData}
          selectedColumn={selectedColumn}
        />
      </Drawer>
    </div>
  );
};

export default Table;
