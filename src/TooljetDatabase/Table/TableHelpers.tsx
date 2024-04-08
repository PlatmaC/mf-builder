import { useContext, useEffect, useMemo, useState } from 'react';
import { Cell, ColumnInstance } from 'react-table';
import Skeleton from 'react-loading-skeleton';
import { arrayMove } from '@dnd-kit/sortable';
import isBoolean from 'lodash/isBoolean';
import isArray from 'lodash/isArray';
import toast from 'react-hot-toast';
import sortBy from 'lodash/sortBy';

import { TooljetDatabaseContextType } from '@/types/DBTypes/ContextTypes';
import { tooljetDatabaseService } from '@/_services';
import { isValidJSON } from '@/_helpers/utils';

import { TooljetDatabaseContext } from '..';

const processedRelationValue = ({
  relationTable,
  dataType,
  value,
}: {
  value: string;
  relationTable: string;
  dataType: string;
}) => {
  const parsedValue = JSON.parse(value);
  if (isArray(parsedValue) && dataType === 'relations' && relationTable) {
    return (
      <div className="table-cell__sub-cell">
        {parsedValue.map((relationResult, index) => {
          // const labelSuffixes = Object.keys(relationResult).reduce(
          //   (accum, key) => {
          //     const originalKey = key.replace(`${relationTable}_`, '');
          //     if (!accum.mainKey && originalKey.toLowerCase() === 'name') {
          //       return { ...accum, mainKey: key };
          //     } else if (!accum.secondaryKey && originalKey.toLowerCase().includes('name')) {
          //       return { ...accum, secondaryKey: key };
          //     } else if (!accum.firstKey && originalKey !== 'id') {
          //       return { ...accum, firstKey: key };
          //     } else return accum;
          //   },
          //   { mainKey: '', secondaryKey: '', firstKey: '' }
          // );
          // const hasSuffix = Object.values(labelSuffixes).some((suffix) => suffix);
          // const cellValue = `id: ${relationResult[`${relationTable}_id`]}${
          //   hasSuffix
          //     ? ` (${
          //         relationResult[labelSuffixes.mainKey] ||
          //         relationResult[labelSuffixes.secondaryKey] ||
          //         relationResult[labelSuffixes.firstKey]
          //       })`
          //     : ''
          // }`;
          return (
            <span key={index + relationResult[`${relationTable}_id`]}>{relationResult[`${relationTable}_id`]}</span>
          );
        })}
      </div>
    );
  } else if (dataType === 'lookup') {
    if (isArray(parsedValue))
      return (
        <div className="table-cell__sub-cell">
          {parsedValue.map((value, index) => {
            if (value !== undefined) return <span key={index + value}>{`${value}`}</span>;
            else return null;
          })}
        </div>
      );
    else
      return (
        <div className="table-cell__sub-cell">
          <span>{`${value}`}</span>
        </div>
      );
  } else return 'wrong value type';
};

export const renderColumnValue = (
  cell: Cell & { column: ColumnInstance & { relation_table: string; isPrimaryKey: boolean; dataType: string } },
  isLoading: boolean,
  selectedTable: string,
  primaryFields: Record<string, string>
) => {
  if (isBoolean(cell?.value)) return cell?.value?.toString();
  else if (isValidJSON(cell?.value))
    return processedRelationValue({
      relationTable: cell?.column.relation_table,
      dataType: cell?.column.dataType,
      value: cell?.value,
    });
  else if (cell?.column.isPrimaryKey && !isLoading) {
    if (primaryFields[selectedTable] && primaryFields[selectedTable] !== 'id') {
      return (
        <span className="tj-database-column-row--cell">
          <span>{cell.render('Cell')}</span>
          <span>{cell?.row.original[primaryFields[selectedTable]]}</span>
        </span>
      );
    } else return cell.render('Cell');
  } else if (typeof cell?.value === 'object' && cell?.value !== null) return 'wrong value type ';
  else if (cell?.value === null && cell?.column.dataType === 'boolean') return 'null';
  else if ((cell?.column.dataType === 'lookup' || cell?.column.dataType === 'relations') && cell?.value)
    return (
      <div className="table-cell__sub-cell">
        <span>{cell.render('Cell')}</span>
      </div>
    );
  else return cell.render('Cell');
};

export const useTableData = ({ refreshPointer, isOutsideLoading }) => {
  const {
    setSelectedTableData,
    selectedTableData,
    setQueryFilters,
    setTotalRecords,
    organizationId,
    setSortFilters,
    selectedTable,
    setColumns,
    resetAll,
    columns,
  } = useContext(TooljetDatabaseContext) as TooljetDatabaseContextType;
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const fetchTableMetadata = () => {
    setIsLoadingMeta(true);
    tooljetDatabaseService.viewTable(organizationId, selectedTable).then(({ data = [], error }) => {
      setIsLoadingMeta(false);
      if (error) return toast.error(error?.message ?? `Error fetching metadata for table "${selectedTable}"`);
      if (data?.result?.length > 0) {
        setColumns(
          data?.result.map(({ column_name, data_type, keytype, ...rest }) => ({
            Header: column_name,
            accessor: column_name,
            dataType: data_type,
            isPrimaryKey: keytype?.toLowerCase() === 'primary key',
            ...rest,
          }))
        );
      }
    });
  };

  const fetchTableData = (queryParams = '', pagesize = 50, pagecount = 1) => {
    const defaultQueryParams = `limit=${pagesize}&offset=${(pagecount - 1) * pagesize}`;
    const params = queryParams ? queryParams : defaultQueryParams;
    setIsLoadingData(true);

    tooljetDatabaseService.findOne(organizationId, selectedTable, params).then(({ headers, data = [], error }) => {
      setIsLoadingData(false);
      if (error) {
        toast.error(error?.message ?? `Error fetching table "${selectedTable}" data`);
        return;
      }
      const totalContentRangeRecords = headers['content-range'] ? headers['content-range'].split('/')[1] || 0 : 0;
      setTotalRecords(totalContentRangeRecords);
      setSelectedTableData(data);
    });
  };

  const currentColumnRemove = async (columnName: string) => {
    const { error } = await tooljetDatabaseService.deleteColumn(organizationId, selectedTable, columnName);
    if (error) toast.error(error?.message ?? `Error deleting column "${columnName}" from table "${selectedTable}"`);
    else {
      await fetchTableMetadata();
      toast.success(`Deleted ${columnName} from table "${selectedTable}"`);
    }
  };

  const handleDeleteColumn = async (columnName: string, isRelations = false) => {
    if (isRelations) {
      const relatedColumns = columns.filter((column) => column.field_of_related_table === columnName);
      if (relatedColumns.length > 0) {
        const relatedColumnNames = relatedColumns.map((relatedColumn) => relatedColumn.Header).join(', ');
        const shouldDelete = confirm(
          `You are going to delete a column that is referenced by other columns: "${relatedColumnNames}". To avoid errors, you need to delete all lookups related to "${columnName}". Are you sure you want to delete column "${columnName}" and remove: "${relatedColumnNames}"?`
        );
        if (shouldDelete) {
          try {
            await Promise.all(
              relatedColumns.map((relatedColumn) =>
                tooljetDatabaseService.deleteColumn(organizationId, selectedTable, relatedColumn.Header)
              )
            );
            currentColumnRemove(columnName);
          } catch (error) {
            toast.error(error?.message ?? `Problem with deleting some column from table "${selectedTable}"`);
          }
        }
      } else {
        const shouldDelete = confirm(`Are you sure you want to delete the column "${columnName}"?`);
        shouldDelete && currentColumnRemove(columnName);
      }
    } else {
      const shouldDelete = confirm(`Are you sure you want to delete the column "${columnName}"?`);
      shouldDelete && currentColumnRemove(columnName);
    }
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setIsLoadingMeta(true);
      const oldIndex = tableColumns.findIndex((column) => column.accessor === active.id);
      const newIndex = tableColumns.findIndex((column) => column.accessor === over.id);
      const columnInNewOrder = arrayMove(tableColumns, oldIndex, newIndex);
      setColumns(columnInNewOrder);
      const columnNamesInOrder = columnInNewOrder.map((column) => column.accessor);
      const { error } = await tooljetDatabaseService.reorderColumn(organizationId, selectedTable, columnNamesInOrder);
      if (error) {
        setIsLoadingMeta(false);
        return toast.error(error?.message ?? `Occurred some problem reordering the columns`);
      } else fetchTableMetadata();
    }
  };

  const tableData = useMemo(
    () =>
      isLoadingData || isLoadingMeta || isOutsideLoading
        ? Array(selectedTableData.length || 3).fill({})
        : selectedTableData.map((data) => {
            return Object.entries(data).reduce((accum, [key, value]) => ({ ...accum, [key]: value }), {});
          }),
    [isLoadingData, selectedTableData, isLoadingMeta, isOutsideLoading]
  );

  const tableColumns = useMemo(
    () =>
      sortBy(
        isLoadingData || isLoadingMeta || isOutsideLoading
          ? columns.map((column) => ({
              ...column,
              Cell: <Skeleton />,
              Header: <Skeleton />,
            }))
          : columns,
        ['order']
      ),
    [isLoadingData, columns, isLoadingMeta, isOutsideLoading]
  );

  const onSelectedTableChange = () => {
    resetAll();
    setSortFilters({});
    setQueryFilters({});
    fetchTableMetadata();
  };

  useEffect(() => {
    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPointer]);

  useEffect(() => {
    if (selectedTable) {
      onSelectedTableChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTable]);

  return {
    fetchTableMetadata,
    handleDeleteColumn,
    setIsLoadingData,
    setIsLoadingMeta,
    fetchTableData,
    isLoadingMeta,
    isLoadingData,
    tableColumns,
    onDragEnd,
    tableData,
  };
};

export const checkDataType = (type: string): string => {
  switch (type) {
    case 'integer':
      return 'int';
    case 'character varying':
      return 'varchar';
    case 'boolean':
      return 'bool';
    case 'double precision':
      return 'float';
    case 'lookup':
      return 'lookup';
    default:
      return type;
  }
};
