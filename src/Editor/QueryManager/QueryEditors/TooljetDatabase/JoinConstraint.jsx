import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TooljetDatabaseContext } from '@/TooljetDatabase/index';
import DropDownSelect from './DropDownSelect';
import { ButtonSolid } from '@/_ui/AppButton/AppButton';
import AddRectangle from '@/_ui/Icon/bulkIcons/AddRectangle';
import Trash from '@/_ui/Icon/solidIcons/Trash';
import Remove from '@/_ui/Icon/solidIcons/Remove';
import Information from '@/_ui/Icon/solidIcons/Information';
import Icon from '@/_ui/Icon/solidIcons/index';
import set from 'lodash/set';
import { cloneDeep, isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import useConfirm from './Confirm';

const JoinConstraint = ({ darkMode, index, onRemove, onChange, data }) => {
  const { selectedTable, tables, joinOptions } = useContext(TooljetDatabaseContext);
  const joinType = data?.joinType;
  const baseTableDetails = (selectedTable && selectedTable) || '';
  const conditionsList = isEmpty(data?.conditions?.conditionsList) ? [{}] : data?.conditions?.conditionsList;

  const operator = data?.conditions?.operator;
  const leftFieldTable = conditionsList?.[0]?.leftField?.table || selectedTable;
  const rightFieldTable = conditionsList?.[0]?.rightField?.table;

  const navigate = useNavigate();
  const { confirm, ConfirmDialog } = useConfirm();

  const tableSet = new Set();
  (joinOptions || [])
    .filter((_join, i) => i < index)
    .forEach((join) => {
      const { table, conditions } = join;
      tableSet.add(table);
      conditions?.conditionsList?.forEach((condition) => {
        const { leftField, rightField } = condition;
        if (leftField?.table) {
          tableSet.add(leftField?.table);
        }
        if (rightField?.table) {
          tableSet.add(rightField?.table);
        }
      });
    });
  tableSet.add(selectedTable);

  const leftTableList = [...tableSet]
    .filter((table) => table !== rightFieldTable)
    .map((t) => {
      return { label: t ?? '', value: t };
    });

  const tableList = tables
    .filter((table) => ![...tableSet, leftFieldTable].includes(table))
    .map((t) => {
      return { label: t ?? '', value: t };
    });

  return (
    <Container fluid className="p-0">
      <Row className={`mx-0 ${index === 0 && 'pb-2'}`}>
        <Col sm="2"></Col>
        <Col sm="4" className="text-left">
          Selected Table
        </Col>
        <Col sm="1"></Col>
        <Col sm="4" className="text-left">
          Joining Table
        </Col>
        {index !== 0 && (
          <Col sm="1" className="justify-content-end d-flex pe-0">
            <ButtonSolid
              variant="ghostBlack"
              size="sm"
              className="p-0"
              onClick={async () => {
                const result = await confirm(
                  'Deleting a join will also delete its associated conditions. Are you sure you want to continue ?',
                  'Delete'
                );
                if (result) onRemove();
              }}
            >
              <Remove style={{ height: '16px' }} />
            </ButtonSolid>
          </Col>
        )}
      </Row>
      <Row className="mb-2 mx-0">
        <Col sm="2" className="p-0">
          <div
            style={{
              borderRadius: 0,
              height: '30px',
            }}
            className="tj-small-btn px-2 border border-end-0 rounded-start"
          >
            Join
          </div>
        </Col>
        <Col sm="4" className="p-0">
          {index ? (
            <DropDownSelect
              buttonClasses="border border-end-0"
              showPlaceHolder
              options={leftTableList}
              darkMode={darkMode}
              onChange={async (value) => {
                let result = false;
                if (leftFieldTable.length) {
                  result = await confirm(
                    'Changing the table will also delete its associated conditions. Are you sure you want to continue?',
                    'Change table?'
                  );
                } else {
                  result = true;
                }

                if (result) {
                  const newData = cloneDeep({ ...data });
                  const { conditionsList = [{}] } = newData?.conditions || {};
                  const newConditionsList = conditionsList.map((condition) => {
                    const newCondition = { ...condition };
                    set(newCondition, 'leftField.table', value?.value);
                    set(newCondition, 'operator', '='); //should we removed when we have more options
                    return newCondition;
                  });
                  set(newData, 'conditions.conditionsList', newConditionsList);
                  // set(newData, 'table', value?.value);
                  onChange(newData);
                }
              }}
              onAdd={() => navigate('#data')}
              addBtnLabel={'Add new table'}
              value={leftTableList.find((val) => val?.value === leftFieldTable)}
            />
          ) : (
            <div
              style={{
                borderRadius: 0,
                height: '30px',
              }}
              className="tj-small-btn px-2 border border-end-0"
            >
              {baseTableDetails ?? ''}
            </div>
          )}
        </Col>
        <Col sm="1" className="p-0">
          <DropDownSelect
            buttonClasses="border border-end-0"
            shouldCenterAlignText
            options={staticJoinOperationsList}
            darkMode={darkMode}
            onChange={(value) => onChange({ ...data, joinType: value?.value })}
            value={staticJoinOperationsList.find((val) => val.value === joinType)}
            renderSelected={(selected) =>
              selected ? (
                <div className="w-100">
                  <Icon name={selected?.icon} height={20} width={20} viewBox="" />
                </div>
              ) : (
                ''
              )
            }
          />
        </Col>
        <Col sm="5" className="p-0">
          <DropDownSelect
            buttonClasses="border rounded-end"
            showPlaceHolder
            options={tableList}
            darkMode={darkMode}
            onChange={async (value) => {
              let result = true;
              if (rightFieldTable?.length) {
                result = await confirm(
                  'Changing the table will also delete its associated conditions. Are you sure you want to continue?',
                  'Change table?'
                );
              }

              if (result) {
                const newData = cloneDeep({ ...data });
                const { conditionsList = [] } = newData?.conditions || {};
                const newConditionsList = conditionsList.map((condition) => {
                  const newCondition = { ...condition };
                  set(newCondition, 'rightField.table', value?.value);
                  set(newCondition, 'operator', '='); //should we removed when we have more options
                  return newCondition;
                });
                set(newData, 'conditions.conditionsList', newConditionsList);
                set(newData, 'table', value?.value);
                onChange(newData);
              }
            }}
            onAdd={() => navigate('#data')}
            addBtnLabel={'Add new table'}
            value={tableList.find((val) => val?.value === rightFieldTable)}
          />
        </Col>
      </Row>
      {conditionsList.map((condition, index) => (
        <JoinOn
          condition={condition}
          leftFieldTable={leftFieldTable}
          rightFieldTable={rightFieldTable}
          darkMode={darkMode}
          key={index}
          index={index}
          groupOperator={operator}
          onOperatorChange={(value) => {
            const newData = cloneDeep(data);
            set(newData, 'conditions.operator', value);
            onChange(newData);
          }}
          onChange={(value) => {
            const newConditionsList = conditionsList.map((con, i) => {
              if (i === index) {
                return value;
              }
              return con;
            });
            const newData = cloneDeep(data);
            set(newData, 'conditions.conditionsList', newConditionsList);
            onChange(newData);
          }}
          onRemove={() => {
            const newConditionsList = conditionsList.filter((_cond, i) => i !== index);
            const newData = cloneDeep(data);
            set(newData, 'conditions.conditionsList', newConditionsList);
            onChange(newData);
          }}
        />
      ))}
      <Row className="mb-2 mx-1">
        <Col className="p-0">
          <ButtonSolid
            variant="ghostBlue"
            size="sm"
            onClick={() => {
              const newData = { ...data };
              set(newData, 'conditions.conditionsList', [...conditionsList, { operator: '=' }]);
              onChange(newData);
            }}
          >
            <AddRectangle width="15" fill="#3E63DD" opacity="1" secondaryFill="#ffffff" />
            &nbsp;&nbsp; Add more
          </ButtonSolid>
        </Col>
      </Row>
      <ConfirmDialog confirmButtonText="Continue" darkMode={darkMode} />
    </Container>
  );
};

const JoinOn = ({
  condition,
  leftFieldTable,
  rightFieldTable,
  darkMode,
  index,
  onChange,
  groupOperator,
  onOperatorChange,
  onRemove,
}) => {
  const { tableInfo } = useContext(TooljetDatabaseContext);
  const { operator, leftField, rightField } = condition;
  const leftFieldColumn = leftField?.columnName;
  const rightFieldColumn = rightField?.columnName;

  const leftFieldOptions = leftFieldTable
    ? tableInfo[leftFieldTable]?.map((col) => ({ label: col.Header, value: col.Header })) ?? []
    : [];
  const selectedLeftField = leftFieldTable
    ? tableInfo[leftFieldTable]?.find((col) => col.Header === leftFieldColumn) ?? []
    : {};

  const rightFieldOptions = rightFieldTable
    ? tableInfo[rightFieldTable]
        ?.filter((col) => {
          if (selectedLeftField?.dataType) {
            return col.dataType === selectedLeftField.dataType;
          }
          return true;
        })
        .map((col) => ({ label: col.Header, value: col.Header })) || []
    : [];

  const _operators = [{ label: '=', value: '=' }];

  const groupOperators = [
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' },
  ];

  return (
    <Row className="mb-2 mx-0">
      <Col
        sm="2"
        className="p-0"
        // data-tooltip-id={`tdb-join-operator-tooltip-${index}`}
        // data-tooltip-content={
        //   index > 1
        //     ? 'The operation is defined by the first condition'
        //     : 'This operation will define all the following conditions'
        // }
      >
        {index == 1 && (
          <DropDownSelect
            buttonClasses="border border-end-0 rounded-start"
            showPlaceHolder
            options={groupOperators}
            darkMode={darkMode}
            value={groupOperators.find((op) => op.value === groupOperator)}
            onChange={(value) => {
              onOperatorChange && onOperatorChange(value?.value);
            }}
          />
        )}
        {index == 0 && (
          <div
            style={{
              height: '30px',
              borderRadius: 0,
            }}
            className="tj-small-btn px-2 border border-end-0 rounded-start"
          >
            On
          </div>
        )}
        {index > 1 && (
          <div
            style={{
              height: '30px',
              borderRadius: 0,
              color: 'var(--slate9)',
            }}
            className="tj-small-btn px-2 border border-end-0 rounded-start"
          >
            {groupOperator}
          </div>
        )}
      </Col>
      <Col sm="4" className="p-0">
        <DropDownSelect
          buttonClasses="border border-end-0"
          showPlaceHolder
          options={leftFieldOptions}
          darkMode={darkMode}
          emptyError={
            <div className="dd-select-alert-error m-2 d-flex align-items-center">
              <Information />
              No table selected
            </div>
          }
          value={leftFieldOptions.find((opt) => opt.value === leftFieldColumn)}
          onChange={(value) => {
            onChange &&
              onChange({
                ...condition,
                leftField: {
                  ...condition.leftField,
                  columnName: value?.value,
                  type: 'Column',
                  table: leftFieldTable,
                },
              });
          }}
        />
      </Col>
      <Col sm="1" className="p-0">
        {/* <DropDownSelect
          options={operators}
          darkMode={darkMode}
          value={operators.find((op) => op.value === operator)}
          onChange={(value) => {
            onChange && onChange({ ...condition, operator: value?.value });
          }}
        /> */}

        {/* Above line is commented and value is hardcoded as below */}

        <div style={{ height: '30px', borderRadius: 0 }} className="tj-small-btn px-2 text-center border border-end-0">
          {operator}
        </div>
      </Col>
      <Col sm="5" className="p-0 d-flex">
        <div className="flex-grow-1">
          <DropDownSelect
            buttonClasses={`border ${index === 0 && 'rounded-end'}`}
            showPlaceHolder
            options={rightFieldOptions}
            emptyError={
              <div className="dd-select-alert-error m-2 d-flex align-items-center">
                <Information />
                {rightFieldTable ? 'No columns of the same data type' : 'No table selected'}
              </div>
            }
            darkMode={darkMode}
            value={rightFieldOptions.find((opt) => opt.value === rightFieldColumn)}
            onChange={(value) => {
              onChange &&
                onChange({
                  ...condition,
                  rightField: {
                    ...condition.rightField,
                    columnName: value?.value,
                    type: 'Column',
                    table: rightFieldTable,
                  },
                });
            }}
          />
        </div>
        {index > 0 && (
          <ButtonSolid
            customStyles={{ height: '30px' }}
            size="sm"
            variant="ghostBlack"
            className="px-1 rounded-0 border border-start-0 rounded-end"
            onClick={onRemove}
          >
            <Trash fill="var(--slate9)" style={{ height: '16px' }} />
          </ButtonSolid>
        )}
      </Col>

      {/* {index > 0 && (
        <Tooltip
          id={`tdb-join-operator-tooltip-${index}`}
          className="tooltip"
          place="left"
          style={{
            borderRadius: '8px',
            width: '180px',
            padding: '8px 12px',
          }}
        />
      )} */}
    </Row>
  );
};

// Base Component for Join Drop Down ----------
const staticJoinOperationsList = [
  { label: 'Inner Join', value: 'INNER', icon: 'innerjoin' },
  { label: 'Left Join', value: 'LEFT', icon: 'leftouterjoin' },
  { label: 'Right Join', value: 'RIGHT', icon: 'rightouterjoin' },
  { label: 'Full Outer Join', value: 'FULL OUTER', icon: 'fullouterjoin' },
];

export default JoinConstraint;
