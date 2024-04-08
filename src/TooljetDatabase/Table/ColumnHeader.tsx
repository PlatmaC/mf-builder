import { useSortable } from '@dnd-kit/sortable';
import { HeaderGroup } from 'react-table';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';

import SolidIcon from '@/_ui/Icon/SolidIcons';

import { TablePopover } from './ActionsPopover';

type ColumnHeader = HeaderGroup & { isPrimaryKey: boolean; dataType: string; primaryField: string };

type ColumnHeaderPropsType = {
  handleDeleteColumn: (columnName: string, isRelations: boolean) => void;
  setSelectedColumn: (column: HeaderGroup) => void;
  checkDataType: (dataType?: string) => string;
  column: ColumnHeader;
  isLoading: boolean;
  darkMode: boolean;
};

export const ColumnHeader = ({
  handleDeleteColumn,
  setSelectedColumn,
  checkDataType,
  isLoading,
  column,
  darkMode,
}: ColumnHeaderPropsType) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: column.id, transition: null });

  const renderPrimaryField = (column: ColumnHeader) => {
    if (column.primaryField !== 'id')
      return (
        <span className="tj-database-column-header-draggable-element--primary">
          <span>serial</span>
          <span>Name</span>
        </span>
      );
    else return 'serial';
  };

  return (
    <th
      data-cy={`${String(column.Header).toLocaleLowerCase().replace(/\s+/g, '-')}-column-header`}
      className={cn('table-header tj-database-column-header tj-text-xsm', {
        'tj-database-primary-column': column.isPrimaryKey && !isLoading,
      })}
      title={column.render('Header') as string}
      {...column.getHeaderProps()}
      style={{ width: '230px' }}
    >
      <div className="tj-database-column-header-container">
        <div
          style={{ transform: CSS.Transform.toString(transform), transition }}
          className="tj-database-column-header-draggable-element"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          {column.render('Header')}
          {!isLoading && (
            <span className="tj-text-xsm tj-db-dataype text-lowercase">
              {column.render('Header') === 'id' ? renderPrimaryField(column) : checkDataType(column?.dataType)}
            </span>
          )}
        </div>
        <TablePopover
          onDelete={
            column.isPrimaryKey
              ? undefined
              : () => handleDeleteColumn(column.Header as string, column.dataType === 'relations')
          }
          onRename={() => setSelectedColumn(column)}
          disabled={isLoading}
          key={column.id}
        >
          <span className="tj-database-column-header-action-icon">
            <SolidIcon name="morevertical" width="14" fill={darkMode ? '#FDFDFE' : '#11181C'} />
          </span>
        </TablePopover>
      </div>
    </th>
  );
};
