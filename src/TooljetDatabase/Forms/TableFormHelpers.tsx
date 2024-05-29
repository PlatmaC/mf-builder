import { useContext, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import toast from 'react-hot-toast';

import { TooljetDatabaseContextType } from '@/types/DBTypes/ContextTypes';
import { DataDenominationType } from '@/types/DBTypes/TableTypes';
import { ReponseType, SelectOptions } from '@/types/GeneralTypes/Global';
import { tooljetDatabaseService } from '@/_services';
import { Any } from '@/types/GeneralTypes/Any';

import { TooljetDatabaseContext } from '..';
import { tableNameRegex } from '../constants';

type CheckIsColumnDefaultTypeInvalidType = (props: {
  dataType: DataDenominationType | null;
  defaultValue: string;
  columnName: string;
}) => boolean;

export const checkIsColumnDefaultTypeInvalid: CheckIsColumnDefaultTypeInvalidType = ({
  defaultValue,
  columnName,
  dataType,
}) => {
  switch (dataType) {
    case 'character varying':
      if (/^[a-zA-Z0-9_]+$/.test(defaultValue)) return false;
      else {
        toast.error(`Default value of "${columnName}" column can only contain alphabets, numbers and underscore`);
        return true;
      }
    case 'integer':
      if (/^-?\d+$/.test(defaultValue)) return false;
      else {
        toast.error(`Default value of "${columnName}" column can only contain digits and hyphen for negative values`);
        return true;
      }
    case 'double precision':
      if (/^-?\d+(\.\d+)?$/.test(defaultValue)) return false;
      else {
        toast.error(
          `Default value of "${columnName}" column can only contain digits, decimal separator and hyphen for negative values`
        );
        return true;
      }
    case 'boolean':
      if (/^(true|false)$/i.test(defaultValue)) return false;
      else {
        toast.error(`Default value of "${columnName}" column can only contain true, false`);
        return true;
      }
    default:
      return false;
  }
};

export const isCreateColumnFormInvalid = ({
  selectedRelationTableName,
  selectedRelationFields,
  lookupSource,
  columnName,
  dataType,
}) => {
  if (isEmpty(columnName)) return Boolean(toast.error('Column name cannot be empty'));
  if (!tableNameRegex.test(columnName))
    return Boolean(
      toast.error(`Column name can only contain alphabets, numbers and underscore and shouldn't start with number.`)
    );
  else if (isEmpty(dataType)) return Boolean(toast.error('Data type cannot be empty'));
  else if ((dataType === 'relations' || dataType === 'lookup') && !selectedRelationTableName)
    return Boolean(toast.error(`Please select a table to link to`));
  else if (dataType === 'lookup' && !lookupSource) return Boolean(toast.error(`Please select source for lookup`));
  else if (selectedRelationTableName && isEmpty(selectedRelationFields))
    return Boolean(toast.error(`Please select at least one relation field`));
  else return false;
};

type GenerateCreateColumnExtraPayloadPropsType = {
  selectedRelationFields?: string | SelectOptions | null;
  dataType?: DataDenominationType | null;
  selectedRelationTableName?: string;
  lookupSource?: string | null;
  isSingleValue?: boolean;
};
export const generateCreateColumnExtraPayload = ({
  selectedRelationTableName,
  selectedRelationFields,
  isSingleValue,
  lookupSource,
  dataType,
}: GenerateCreateColumnExtraPayloadPropsType) => {
  return dataType === 'lookup' || dataType === 'relations'
    ? {
        ...(dataType === 'lookup' && { field_to_lookup: selectedRelationFields, field_of_related_table: lookupSource }),
        ...(dataType === 'relations' && {
          relation_table: selectedRelationTableName,
          ...(isSingleValue && { relation_single: true }),
          relation_field:
            typeof selectedRelationFields === 'string'
              ? selectedRelationFields
              : selectedRelationFields?.map((field) => field.value).join(', '),
        }),
      }
    : null;
};

export const parseRelationValue = (relationValue: string, relationTable: string) => {
  const parsedValue = JSON.parse(relationValue) as Array<Any>;
  return parsedValue.reduce((accum, row) => {
    if (row[`${relationTable}_id`]) {
      const labelSuffixes = Object.keys(row).reduce(
        (accum, key) => {
          if (!accum.mainKey && key.toLowerCase() === 'name') return { ...accum, mainKey: key };
          else if (!accum.secondaryKey && key.toLowerCase().includes('name')) {
            return { ...accum, secondaryKey: key };
          } else if (!accum.firstKey && key !== 'id' && key !== `${relationTable}_id`)
            return { ...accum, firstKey: key };
          else return accum;
        },
        { mainKey: '', secondaryKey: '', firstKey: '' }
      );
      const hasSuffix = Object.values(labelSuffixes).some((suffix) => suffix);
      const label = `id: ${row[`${relationTable}_id`].toString()}${
        hasSuffix
          ? ` (${row[labelSuffixes.mainKey] || row[labelSuffixes.secondaryKey] || row[labelSuffixes.firstKey]})`
          : ''
      }`;
      return [...accum, { value: row[`${relationTable}_id`].toString(), label }];
    } else return accum;
  }, []);
};

export const useAllTables = () => {
  const [tables, setTables] = useState<{ [name: string]: { value: string; label: string } } | undefined>();
  const { organizationId, columns } = useContext(TooljetDatabaseContext) as TooljetDatabaseContextType;
  const [isTablesLoading, setIsTablesLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const hasRelations = columns.some((column) => column.relation_table);
      if (hasRelations) {
        setIsTablesLoading(true);
        const tablePromises = columns.reduce((accum, column) => {
          const isAlredyInAccum = accum.some((table) => table[0] === column.relation_table);
          if (column.relation_table && !isAlredyInAccum) {
            const tablePromise = tooljetDatabaseService.findOne(organizationId, column.relation_table);
            const viewsPromises = tooljetDatabaseService.viewTable(organizationId, column.relation_table);
            return [...accum, [column.relation_table, [tablePromise, viewsPromises]]];
          } else return accum;
        }, []);
        Promise.all(tablePromises.map(([, [, viewsPromises]]) => viewsPromises)).then((views: Array<ReponseType>) => {
          Promise.all(tablePromises.map(([, [tablePromise]]) => tablePromise)).then((data: Array<ReponseType>) => {
            setIsTablesLoading(false);
            const fetchedTables = data.reduce(
              (accum, tableInfo, index) => ({
                ...accum,
                [(tablePromises[index][0] as string).toLocaleLowerCase()]: tableInfo.data.map((row) => {
                  const primaryColumn = views[index].data.result.find((column) => column.keytype === 'PRIMARY KEY');

                  const primaryField =
                    primaryColumn['primaryField'] && primaryColumn['primaryField'] !== 'id'
                      ? row[primaryColumn['primaryField']]
                      : undefined;
                  const labelSuffixes = Object.keys(row).reduce(
                    (accum, key) => {
                      if (!accum.mainKey && key.toLowerCase() === 'name') return { ...accum, mainKey: key };
                      else if (!accum.secondaryKey && key.toLowerCase().includes('name')) {
                        return { ...accum, secondaryKey: key };
                      } else if (!accum.firstKey && key !== 'id') return { ...accum, firstKey: key };
                      else return accum;
                    },
                    { mainKey: '', secondaryKey: '', firstKey: '' }
                  );
                  const hasSuffix = Object.values(labelSuffixes).some((suffix) => suffix);
                  const label = `id: ${row.id.toString()}${
                    hasSuffix
                      ? ` (${
                          primaryField ||
                          row[labelSuffixes.mainKey] ||
                          row[labelSuffixes.secondaryKey] ||
                          row[labelSuffixes.firstKey]
                        })`
                      : ''
                  }`;
                  return { value: row.id.toString(), label };
                }),
              }),
              {}
            );
            setTables(fetchedTables);
          });
        });
      }
    })();
  }, [columns, organizationId]);

  return { tables, isTablesLoading };
};

export const clearDefaultValue = (defaultValue: string) => {
  const value = defaultValue.split('::')[0];
  return value.replace(/['"]+/g, '');
};
