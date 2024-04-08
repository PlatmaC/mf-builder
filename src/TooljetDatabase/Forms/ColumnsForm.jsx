// import {
//  useContext,
// useState,
//   useMemo,
// } from 'react';
// import toast from 'react-hot-toast';
import cx from 'classnames';

// import { tooljetDatabaseService } from '@/_services';
import Select from '@/_ui/Select';

import { dataTypes, primaryKeydataTypes } from '../constants';
import AddColumnIcon from '../Icons/AddColumnIcon.svg';
import DeleteIcon from '../Icons/DeleteIcon.svg';
// import { TooljetDatabaseContext } from '..';

const ColumnsForm = ({
  columns,
  setColumns,
  // handleChangePrimaryField,
  // primaryField,
}) => {
  // const [selectedRelationTablesColumns, setSelectedRelationTablesColumns] = useState({});
  // const { organizationId, tables } = useContext(TooljetDatabaseContext);
  const darkMode = localStorage.getItem('darkMode') === 'true';
  // const [isColumnLoading, setIsColumnLoading] = useState({});

  // const tableOptions = useMemo(() => {
  //   return tables.map((table) => ({ value: table.table_name, label: table.table_name }));
  // }, [tables]);

  const handleDelete = (index) => {
    const newColumns = { ...columns };
    delete newColumns[index];
    setColumns(newColumns);
  };

  // const columnOptions = useMemo(() => {
  //   return Object.values(columns).reduce((accum, { column_name }) => {
  //     if (column_name) return [...accum, { value: column_name, label: column_name }];
  //     else return accum;
  //   }, []);
  // }, [columns]);

  const handleChangeColumnType = (index) => (value) => {
    const prevColumns = { ...columns };
    prevColumns[index].data_type = value;
    if (value !== 'relations') {
      delete prevColumns[index].relation_table;
      delete prevColumns[index].relation_field;
    }
    setColumns(prevColumns);
  };

  // const handleChangeRelationTables = (outsideIndex) => async (newValue) => {
  //   setColumns((prevColumns) => ({
  //     ...prevColumns,
  //     [outsideIndex]: { ...prevColumns[outsideIndex], relation_table: newValue, relation_field: ['id'] },
  //   }));
  //   if (!selectedRelationTablesColumns[newValue]) {
  //     setIsColumnLoading({ ...isColumnLoading, [newValue]: true });
  //     const { error, data } = await tooljetDatabaseService.viewTable(organizationId, newValue);
  //     if (error) toast.error(error?.message ?? `Problem with getting "${newValue}" table info`);
  //     else
  //       setSelectedRelationTablesColumns({
  //         ...selectedRelationTablesColumns,
  //         [newValue]: data.result.map((column) => ({ value: column.column_name, label: column.column_name })),
  //       });
  //     setIsColumnLoading({ ...isColumnLoading, [newValue]: false });
  //   }
  // };

  // const handleChangeRelationFields = (outsideIndex) => (newValue) => {
  //   setColumns((prevColumns) => ({
  //     ...prevColumns,
  //     [outsideIndex]: { ...prevColumns[outsideIndex], relation_field: newValue },
  //   }));
  // };

  return (
    <div className="">
      <div className="card-header">
        <h3 className="card-title" data-cy="add-columns-header">
          Add columns
        </h3>
      </div>
      <div className="card-body columns-form__row-wrapper">
        <div
          className={cx('list-group-item columns-form__row-container', {
            'text-white': darkMode,
          })}
        >
          <div className="row align-items-center columns-form__row columns-form__row--small">
            <div className="col-3 m-0">
              <span data-cy="name-input-field-label">Name</span>
            </div>
            <div className="col-3 m-0">
              <span data-cy="type-input-field-label">Type</span>
            </div>
            <div className="col-3 m-0">
              <span data-cy="default-input-field-label">Default</span>
            </div>
          </div>
        </div>
        {Object.keys(columns).map((index) => (
          <div
            key={index}
            className={cx('list-group-item columns-form__row-container', {
              'bg-gray': !darkMode,
            })}
          >
            <div className="row align-items-center columns-form__row">
              {/* <div className="col-1">
                  <DragIcon />
                </div> */}
              <div className="col-3 m-0" data-cy="column-name-input-field">
                <input
                  onChange={(e) => {
                    e.persist();
                    const prevColumns = { ...columns };
                    prevColumns[index].column_name = e.target.value;
                    setColumns(prevColumns);
                  }}
                  value={columns[index].column_name}
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  data-cy={`name-input-field-${columns[index].column_name}`}
                  disabled={columns[index].constraint === 'PRIMARY KEY'}
                />
              </div>
              <div className="col-3" data-cy="type-dropdown-field">
                <Select
                  width="100%"
                  isDisabled={columns[index].constraint === 'PRIMARY KEY'}
                  useMenuPortal={false}
                  options={
                    columns[index].constraint === 'PRIMARY KEY'
                      ? primaryKeydataTypes
                      : dataTypes.filter((type) => type.value !== 'lookup' && type.value !== 'relations')
                  }
                  value={columns[index].data_type}
                  onChange={handleChangeColumnType(index)}
                  className="columns-form__select"
                />
              </div>
              {/* {columns[index].data_type === 'relations' ? (
                <>
                  <div className="col-3 m-0" data-cy="column-default-input-field">
                    <Select
                      onChange={handleChangeRelationTables(index)}
                      className="columns-form__select"
                      value={columns[index].relation_table}
                      placeholder="Table"
                      options={tableOptions}
                      useMenuPortal={false}
                      customWrap={true}
                      width="100%"
                    />
                  </div>
                  {columns[index].relation_table && (
                    <div className="columns-form__relation-fields" data-cy="column-default-input-field">
                      <Select
                        options={selectedRelationTablesColumns[columns[index].relation_table] ?? []}
                        isLoading={isColumnLoading[columns[index].relation_table]}
                        onChange={handleChangeRelationFields(index)}
                        value={columns[index].relation_field}
                        placeholder="Fields"
                        useMenuPortal={false}
                        customWrap={true}
                        isMulti={true}
                        width="447px"
                      />
                    </div>
                  )}
                </>
              ) : ( */}
              <div className="col-3 m-0" data-cy="column-default-input-field">
                <input
                  onChange={(e) => {
                    e.persist();
                    const prevColumns = { ...columns };
                    prevColumns[index].default = e.target.value;
                    setColumns(prevColumns);
                  }}
                  value={columns[index].default}
                  type="text"
                  className="form-control"
                  data-cy="default-input-field"
                  placeholder="NULL"
                  disabled={columns[index].constraint === 'PRIMARY KEY' || columns[index].data_type === 'serial'}
                />
              </div>
              {/* )} */}
              {columns[index].constraint === 'PRIMARY KEY' ? (
                <div className="columns-form__action-column">
                  <span
                    className={`badge badge-outline ${darkMode ? 'text-white' : 'text-indigo'}`}
                    data-cy="primary-key-text"
                  >
                    Primary Key
                  </span>
                </div>
              ) : (
                <div
                  className="cursor-pointer columns-form__action-column"
                  data-cy="column-delete-icon"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </div>
              )}
            </div>
          </div>
        ))}
        <div
          onClick={() =>
            setColumns((prevColumns) => ({ ...prevColumns, [+Object.keys(prevColumns).pop() + 1 || 0]: {} }))
          }
          className="mt-2 btn border-0 card-footer add-more-columns-btn"
          data-cy="add-more-columns-button"
        >
          <AddColumnIcon />
          &nbsp;&nbsp; Add more columns
        </div>
      </div>
      {/* <div className="card-body mb-3 data-type-dropdown-section" data-cy="data-type-dropdown-section">
        <div className="form-label" data-cy="data-type-input-field-label">
          Select primary field
        </div>
        <Select
          onChange={handleChangePrimaryField}
          placeholder="Choose field"
          options={columnOptions}
          useMenuPortal={false}
          value={primaryField}
          customWrap={true}
        />
      </div> */}
    </div>
  );
};

export default ColumnsForm;
