import { InspectorElementTypeEnum, WidgetConfigType } from '@/types/EditorTypes/InspectorElementTypes';

import { timerFormat, timerFormatRegExp } from '../../_helpers/constants';

// types are not fully described
export const widgets: WidgetConfigType = [
  {
    name: 'Video',
    displayName: 'Video',
    component: 'VideoPlayer',
    description: 'Show a video by url',
    withoutDocumentationLink: true,
    defaultSize: { width: 22, height: 360 },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      source: {
        type: InspectorElementTypeEnum.code,
        displayName: 'URL',
        validation: {
          schema: { type: 'string' },
        },
      },
      isMuted: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Muted (preview mode only)',
        validation: { schema: { type: 'boolean' } },
      },
      isLooped: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Looped',
        validation: { schema: { type: 'boolean' } },
      },
      isAutoplayed: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Autoplay (only for muted video)',
        validation: { schema: { type: 'boolean' } },
      },
      isControled: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show player controls',
        validation: { schema: { type: 'boolean' } },
      },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        source: { value: 'https://www.youtube.com/watch?v=RjaC2MWX_oc' },
        isAutoplayed: { value: '{{true}}' },
        isControled: { value: '{{true}}' },
        isLooped: { value: '{{false}}' },
        isMuted: { value: '{{false}}' },
        visible: { value: '{{true}}' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
      generalStyles: {
        boxShadow: { value: '2px 2px 15px 3px #0000004d' },
      },
    },
  },
  {
    name: 'Table',
    displayName: 'Table',
    description: 'Display paginated tabular data',
    component: 'Table',
    properties: {
      title: {
        type: InspectorElementTypeEnum.string,
        displayName: 'Title',
        validation: {
          schema: { type: 'string' },
        },
      },
      data: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Table data',
        validation: {
          schema: {
            type: 'array',
            element: { type: 'object' },
            optional: true,
          },
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      columns: {
        type: InspectorElementTypeEnum.array,
        displayName: 'Table Columns',
        // validation: {
        //   schema: {
        //     type: 'array',
        //     element: {
        //       type: 'union',
        //       schemas: [
        //         {
        //           type: 'object',
        //           object: {
        //             columnType: { type: 'string' },
        //             name: { type: 'string' },
        //             textWrap: { type: 'string' },
        //             key: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        //             textColor: { type: 'string' },
        //             regex: { type: 'string' },
        //             minLength: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        //             maxLength: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        //             customRule: { type: 'string' },
        //           },
        //         },
        //         {
        //           type: 'object',
        //           object: {
        //             columnType: { type: 'string' },
        //             name: { type: 'string' },
        //             key: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        //           },
        //           isEditable: { type: 'boolean' },
        //         },
        //         {
        //           type: 'object',
        //           object: {
        //             columnType: { type: 'string' },
        //             name: { type: 'string' },
        //             activeColor: { type: 'string' },
        //             isEditable: { type: 'boolean' },
        //           },
        //         },
        //         {
        //           type: 'object',
        //           object: {
        //             columnType: { type: 'string' },
        //             name: { type: 'string' },
        //             key: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        //             values: {
        //               type: 'union',
        //               schemas: [
        //                 { type: 'array', element: { type: 'string' } },
        //                 { type: 'array', element: { type: 'number' } },
        //               ],
        //             },
        //             labels: {
        //               type: 'union',
        //               schemas: [
        //                 { type: 'array', element: { type: 'string' } },
        //                 { type: 'array', element: { type: 'number' } },
        //               ],
        //             },
        //           },
        //           isEditable: { type: 'boolean' },
        //         },
        //         {
        //           type: 'object',
        //           object: {
        //             columnType: { type: 'string' },
        //             name: { type: 'string' },
        //             key: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        //             values: {
        //               type: 'union',
        //               schemas: [
        //                 { type: 'array', element: { type: 'string' } },
        //                 { type: 'array', element: { type: 'number' } },
        //               ],
        //             },
        //             labels: {
        //               type: 'union',
        //               schemas: [
        //                 { type: 'array', element: { type: 'string' } },
        //                 { type: 'array', element: { type: 'number' } },
        //               ],
        //             },
        //           },
        //           isEditable: { type: 'boolean' },
        //         },
        //         {
        //           type: 'object',
        //           object: {
        //             columnType: { type: 'string' },
        //             name: { type: 'string' },
        //             key: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        //             dateFormat: { type: 'string' },
        //             parseDateFormat: { type: 'string' },
        //             isTimeChecked: { type: 'boolean' },
        //             isEditable: { type: 'boolean' },
        //           },
        //         },
        //       ],
        //     },
        //   },
        // },
      },
      useDynamicColumn: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Use dynamic column',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      columnData: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Column data',
      },
      rowsPerPage: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Number of rows per page',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      serverSidePagination: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Server-side pagination',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      enableNextButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable next page button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      enabledSort: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable sorting',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      hideColumnSelectorButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Hide column selector button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      enablePrevButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable previous page button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      totalRecords: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Total records server side',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      clientSidePagination: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Client-side pagination',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      serverSideSearch: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Server-side search',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      serverSideSort: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Server-side sort',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      serverSideFilter: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Server-side filter',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      actionButtonBackgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      actionButtonTextColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' },
        },
      },
      displaySearchBox: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show search box',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      showDownloadButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show download button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      showFilterButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show filter button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      showBulkUpdateActions: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show update buttons',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      allowSelection: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Allow selection',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      showBulkSelector: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Bulk selection',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      highlightSelectedRow: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Highlight selected row',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      showAddNewRowButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show add new row button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop ' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    defaultSize: {
      width: 20,
      height: 360,
    },
    events: {
      onRowHovered: { displayName: 'Row hovered' },
      onRowClicked: { displayName: 'Row clicked' },
      onBulkUpdate: { displayName: 'Save changes' },
      onPageChanged: { displayName: 'Page changed' },
      onSearch: { displayName: 'Search' },
      onCancelChanges: { displayName: 'Cancel changes' },
      onSort: { displayName: 'Sort applied' },
      onCellValueChanged: { displayName: 'Cell value changed' },
      onFilterChanged: { displayName: 'Filter changed' },
      onNewRowsAdded: { displayName: 'Add new rows' },
    },
    styles: {
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      actionButtonRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Action Button Radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'boolean' }] },
        },
      },
      tableType: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Table type',
        options: [
          { name: 'Bordered', value: 'table-bordered' },
          { name: 'Borderless', value: 'table-borderless' },
          { name: 'Classic', value: 'table-classic' },
          { name: 'Striped', value: 'table-striped' },
          { name: 'Striped & bordered', value: 'table-striped table-bordered' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
      cellSize: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Cell size',
        options: [
          { name: 'Compact', value: 'compact' },
          { name: 'Spacious', value: 'spacious' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border Radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      selectedRow: {},
      clickedRow: {},
      changeSet: {},
      dataUpdates: [],
      pageIndex: 1,
      searchText: '',
      selectedRows: [],
      filters: [],
    },
    actions: [
      {
        handle: 'setPage',
        displayName: 'Set page',
        params: [
          {
            handle: 'page',
            displayName: 'Page',
            defaultValue: '{{1}}',
          },
        ],
      },
      {
        handle: 'selectRow',
        displayName: 'Select row',
        params: [
          { handle: 'key', displayName: 'Key' },
          { handle: 'value', displayName: 'Value' },
        ],
      },
      {
        handle: 'clickRow',
        displayName: 'Click row',
        params: [
          { handle: 'key', displayName: 'Key' },
          { handle: 'value', displayName: 'Value' },
        ],
      },
      {
        handle: 'deselectRow',
        displayName: 'Deselect row',
      },
      {
        handle: 'discardChanges',
        displayName: 'Discard Changes',
      },
      {
        handle: 'discardNewlyAddedRows',
        displayName: 'Discard newly added rows',
      },
      {
        displayName: 'Download table data',
        handle: 'downloadTableData',
        params: [
          {
            handle: 'type',
            displayName: 'Type',
            options: [
              { name: 'Download as Excel', value: 'xlsx' },
              { name: 'Download as CSV', value: 'csv' },
              { name: 'Download as PDF', value: 'pdf' },
            ],
            defaultValue: `{{Download as Excel}}`,
            type: InspectorElementTypeEnum.select,
          },
        ],
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        title: { value: 'Table' },
        visible: { value: '{{true}}' },
        loadingState: { value: '{{false}}' },
        data: {
          value:
            "{{ [ \n\t\t{ id: 1, name: 'Sarah', email: 'sarah@example.com'}, \n\t\t{ id: 2, name: 'Lisa', email: 'lisa@example.com'}, \n\t\t{ id: 3, name: 'Sam', email: 'sam@example.com'}, \n\t\t{ id: 4, name: 'Jon', email: 'jon@example.com'} \n] }}",
        },
        useDynamicColumn: { value: '{{false}}' },
        columnData: {
          value: "{{[{name: 'email', key: 'email'}, {name: 'Full name', key: 'name', isEditable: true}]}}",
        },
        rowsPerPage: { value: '{{10}}' },
        serverSidePagination: { value: '{{false}}' },
        enableNextButton: { value: '{{true}}' },
        enablePrevButton: { value: '{{true}}' },
        totalRecords: { value: '' },
        clientSidePagination: { value: '{{true}}' },
        serverSideSort: { value: '{{false}}' },
        serverSideFilter: { value: '{{false}}' },
        displaySearchBox: { value: '{{true}}' },
        showDownloadButton: { value: '{{true}}' },
        showFilterButton: { value: '{{true}}' },
        autogenerateColumns: { value: true },
        columns: {
          value: [
            {
              name: 'id',
              id: 'e3ecbf7fa52c4d7210a93edb8f43776267a489bad52bd108be9588f790126737',
              autogenerated: true,
            },
            {
              name: 'name',
              id: '5d2a3744a006388aadd012fcc15cc0dbcb5f9130e0fbb64c558561c97118754a',
              autogenerated: true,
            },
            {
              name: 'email',
              id: 'afc9a5091750a1bd4760e38760de3b4be11a43452ae8ae07ce2eebc569fe9a7f',
              autogenerated: true,
            },
          ],
        },
        showBulkUpdateActions: { value: '{{true}}' },
        showBulkSelector: { value: '{{false}}' },
        highlightSelectedRow: { value: '{{false}}' },
        columnSizes: { value: '{{({})}}' },
        actions: { value: [] },
        enabledSort: { value: '{{true}}' },
        hideColumnSelectorButton: { value: '{{false}}' },
        showAddNewRowButton: { value: '{{true}}' },
        allowSelection: { value: '{{true}}' },
      },
      events: [],
      styles: {
        textColor: { value: '#000' },
        actionButtonRadius: { value: '0' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        cellSize: { value: 'compact' },
        borderRadius: { value: '0' },
        tableType: { value: 'table-bordered' },
      },
    },
  },
  {
    name: 'Button',
    displayName: 'Button',
    description: 'Trigger actions: queries, alerts etc',
    component: 'Button',
    defaultSize: {
      width: 3,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      text: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Button Text',
        validation: {
          schema: { type: 'string' },
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading State',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {
      onClick: { displayName: 'On click' },
      onHover: { displayName: 'On hover' },
    },
    styles: {
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
      backgroundColorOnHover: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color on hover',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
      backgroundColorOnClick: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color on click',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
      loaderColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Loader color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false,
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false,
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'number' },
          defaultValue: false,
        },
      },
      borderColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
    },
    exposedVariables: {
      buttonText: 'Button',
    },
    actions: [
      {
        handle: 'click',
        displayName: 'Click',
      },
      {
        handle: 'setText',
        displayName: 'Set Text',
        params: [{ handle: 'text', displayName: 'Text', defaultValue: 'New Text' }],
      },
      {
        handle: 'disable',
        displayName: 'Disable',
        params: [
          { handle: 'disable', displayName: 'Value', defaultValue: `{{false}}`, type: InspectorElementTypeEnum.toggle },
        ],
      },
      {
        handle: 'visibility',
        displayName: 'Visibility',
        params: [
          { handle: 'visible', displayName: 'Value', defaultValue: `{{false}}`, type: InspectorElementTypeEnum.toggle },
        ],
      },
      {
        handle: 'loading',
        displayName: 'Loading',
        params: [
          { handle: 'loading', displayName: 'Value', defaultValue: `{{false}}`, type: InspectorElementTypeEnum.toggle },
        ],
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        text: { value: `Button` },
        loadingState: { value: `{{false}}` },
      },
      events: [],
      styles: {
        backgroundColor: { value: '#375FCF' },
        textColor: { value: '#fff' },
        loaderColor: { value: '#fff' },
        visibility: { value: '{{true}}' },
        borderRadius: { value: '{{2}}' },
        borderColor: { value: '#375FCF00' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Chart',
    displayName: 'Chart',
    description: 'Display charts',
    component: 'Chart',
    defaultSize: {
      width: 20,
      height: 400,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      title: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Title',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      data: {
        type: InspectorElementTypeEnum.json,
        displayName: 'Data',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'array' }] },
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading State',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      markerColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Marker color',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      showAxes: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show axes',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      showGridLines: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show grid lines',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      type: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Chart type',
        options: [
          { name: 'Line', value: 'line' },
          { name: 'Bar', value: 'bar' },
          { name: 'Pie', value: 'pie' },
        ],
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'boolean' }, { type: 'number' }],
          },
        },
      },
      jsonDescription: {
        type: InspectorElementTypeEnum.json,
        displayName: 'Json Description',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      plotFromJson: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Use Plotly JSON schema',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      barmode: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Bar mode',
        options: [
          { name: 'Stack', value: 'stack' },
          { name: 'Group', value: 'group' },
          { name: 'Overlay', value: 'overlay' },
          { name: 'Relative', value: 'relative' },
        ],
        validation: {
          schema: {
            schemas: { type: 'string' },
          },
        },
      },
    },
    events: {},
    styles: {
      padding: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Padding',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'number' }, { type: 'string' }],
          },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
    },
    exposedVariables: {
      show: null,
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        title: { value: 'This title can be changed' },
        markerColor: { value: '#CDE1F8' },
        showAxes: { value: '{{true}}' },
        showGridLines: { value: '{{true}}' },
        plotFromJson: { value: '{{false}}' },
        loadingState: { value: `{{false}}` },
        barmode: { value: `group` },
        jsonDescription: {
          value: `{
            "data": [
                {
                    "x": [
                        "Jan",
                        "Feb",
                        "Mar"
                    ],
                    "y": [
                        100,
                        80,
                        40
                    ],
                    "type": "bar"
                }
            ]
        }`,
        },
        type: { value: `line` },
        data: {
          value: `[
  { "x": "Jan", "y": 100},
  { "x": "Feb", "y": 80},
  { "x": "Mar", "y": 40}
]`,
        },
      },
      events: [],
      styles: {
        padding: { value: '50' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Modal',
    displayName: 'Modal',
    description: 'Modal triggered by events',
    component: 'Modal',
    defaultSize: {
      width: 10,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      title: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Title',
        validation: {
          schema: { type: 'string' },
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading State',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      useDefaultButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Use default trigger button',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      triggerButtonLabel: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Trigger button label',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      hideTitleBar: { type: InspectorElementTypeEnum.toggle, displayName: 'Hide title bar' },
      hideCloseButton: { type: InspectorElementTypeEnum.toggle, displayName: 'Hide close button' },
      hideOnEsc: { type: InspectorElementTypeEnum.toggle, displayName: 'Close on escape key' },
      closeOnClickingOutside: { type: InspectorElementTypeEnum.toggle, displayName: 'Close on clicking outside' },

      size: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Modal size',
        options: [
          { name: 'small', value: 'sm' },
          { name: 'medium', value: 'lg' },
          { name: 'large', value: 'xl' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
      modalHeight: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Modal Height',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    events: {
      onOpen: { displayName: 'On open' },
      onClose: { displayName: 'On close' },
    },
    styles: {
      headerBackgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Header background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      headerTextColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Header title color',
        validation: {
          schema: { type: 'string' },
        },
      },
      bodyBackgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Body background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: true,
        },
      },
      triggerButtonBackgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Trigger button background color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
      triggerButtonTextColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Trigger button text color',
        validation: {
          schema: { type: 'string' },
          defaultValue: false,
        },
      },
    },
    exposedVariables: {
      show: false,
    },
    actions: [
      {
        handle: 'open',
        displayName: 'Open',
      },
      {
        handle: 'close',
        displayName: 'Close',
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        title: { value: 'This title can be changed' },
        loadingState: { value: `{{false}}` },
        useDefaultButton: { value: `{{true}}` },
        triggerButtonLabel: { value: `Launch Modal` },
        size: { value: 'lg' },
        hideTitleBar: { value: '{{false}}' },
        hideCloseButton: { value: '{{false}}' },
        hideOnEsc: { value: '{{true}}' },
        closeOnClickingOutside: { value: '{{false}}' },
        modalHeight: { value: '400px' },
      },
      events: [],
      styles: {
        headerBackgroundColor: { value: '#ffffffff' },
        headerTextColor: { value: '#000000' },
        bodyBackgroundColor: { value: '#ffffffff' },
        disabledState: { value: '{{false}}' },
        visibility: { value: '{{true}}' },
        triggerButtonBackgroundColor: { value: '#4D72FA' },
        triggerButtonTextColor: { value: '#ffffffff' },
      },
    },
  },
  {
    name: 'TextInput',
    displayName: 'Text Input',
    description: 'Text field for forms',
    component: 'TextInput',
    defaultSize: {
      width: 6,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      placeholder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    validation: {
      regex: { type: InspectorElementTypeEnum.code, displayName: 'Regex' },
      minLength: { type: InspectorElementTypeEnum.code, displayName: 'Min length' },
      maxLength: { type: InspectorElementTypeEnum.code, displayName: 'Max length' },
      customRule: { type: InspectorElementTypeEnum.code, displayName: 'Custom validation' },
    },
    events: {
      onChange: { displayName: 'On change' },
      onEnterPressed: { displayName: 'On Enter Pressed' },
      onFocus: { displayName: 'On focus' },
      onBlur: { displayName: 'On blur' },
    },
    styles: {
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: { schema: { type: 'string' } },
      },
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background Color',
        validation: { schema: { type: 'string' } },
      },
      borderColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Border Color',
        validation: { schema: { type: 'string' } },
      },
      errTextColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Error Text Color',
        validation: { schema: { type: 'string' } },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: { schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: { schema: { type: 'boolean' } },
      },
    },
    exposedVariables: {
      value: '',
    },
    actions: [
      {
        handle: 'setText',
        displayName: 'Set text',
        params: [{ handle: 'text', displayName: 'text', defaultValue: 'New Text' }],
      },
      {
        handle: 'clear',
        displayName: 'Clear',
      },
      {
        handle: 'setFocus',
        displayName: 'Set focus',
      },
      {
        handle: 'setBlur',
        displayName: 'Set blur',
      },
      {
        handle: 'disable',
        displayName: 'Disable',
        params: [
          { handle: 'disable', displayName: 'Value', defaultValue: '{{false}}', type: InspectorElementTypeEnum.toggle },
        ],
      },
      {
        handle: 'visibility',
        displayName: 'Visibility',
        params: [
          {
            handle: 'visibility',
            displayName: 'Value',
            defaultValue: '{{false}}',
            type: InspectorElementTypeEnum.toggle,
          },
        ],
      },
    ],
    definition: {
      validation: {
        regex: { value: '' },
        minLength: { value: null },
        maxLength: { value: null },
        customRule: { value: null },
      },
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        value: { value: '' },
        placeholder: { value: 'Enter your input' },
      },
      events: [],
      styles: {
        textColor: { value: '#000' },
        borderColor: { value: '#dadcde' },
        errTextColor: { value: '#ff0000' },
        borderRadius: { value: '{{0}}' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        backgroundColor: { value: '#fff' },
      },
    },
  },
  {
    name: 'NumberInput',
    displayName: 'Number Input',
    description: 'Number field for forms',
    component: 'NumberInput',
    defaultSize: {
      width: 4,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      minValue: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Minimum value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      maxValue: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Maximum value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      placeholder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' },
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      decimalPlaces: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Decimal places',
        validation: {
          schema: { type: 'number' },
        },
      },
    },
    events: {
      onChange: { displayName: 'On change' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background Color',
      },
      borderColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Border Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: { schema: { type: 'string' } },
      },
    },
    exposedVariables: {
      value: 99,
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        value: { value: '99' },
        maxValue: { value: '' },
        minValue: { value: '' },
        placeholder: { value: '0' },
        decimalPlaces: { value: '{{2}}' },
        loadingState: { value: '{{false}}' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{0}}' },
        backgroundColor: { value: '#ffffffff' },
        borderColor: { value: '#fff' },
        textColor: { value: '#232e3c' },
      },
    },
  },
  {
    name: 'PasswordInput',
    displayName: 'Password Input',
    description: 'Password input field for forms',
    component: 'PasswordInput',
    defaultSize: {
      width: 4,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      placeholder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    validation: {
      regex: { type: InspectorElementTypeEnum.code, displayName: 'Regex' },
      minLength: { type: InspectorElementTypeEnum.code, displayName: 'Min length' },
      maxLength: { type: InspectorElementTypeEnum.code, displayName: 'Max length' },
      customRule: { type: InspectorElementTypeEnum.code, displayName: 'Custom validation' },
    },
    events: {
      onChange: { displayName: 'On change' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background Color',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    exposedVariables: {
      value: '',
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        placeholder: { value: 'password' },
      },
      validation: {
        regex: { value: '' },
        minLength: { value: null },
        maxLength: { value: null },
        customRule: { value: null },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{0}}' },
        backgroundColor: { value: '#ffffff' },
      },
    },
  },
  {
    name: 'Datepicker',
    displayName: 'Date Picker',
    description: 'Select a date and time',
    component: 'Datepicker',
    defaultSize: {
      width: 5,
      height: 30,
    },
    validation: {
      customRule: { type: InspectorElementTypeEnum.code, displayName: 'Custom validation' },
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      defaultValue: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: { type: 'string' },
        },
      },
      format: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Format',
        validation: {
          schema: { type: 'string' },
        },
      },
      enableTime: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable time selection?',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false,
        },
      },
      enableDate: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable date selection?',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: true,
        },
      },
      disabledDates: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Disabled dates',
        validation: {
          schema: { type: 'array', element: { type: 'string' } },
        },
      },
    },
    events: {
      onSelect: { displayName: 'On select' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
    },
    exposedVariables: {
      value: '',
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      validation: {
        customRule: { value: null },
      },
      properties: {
        defaultValue: { value: '01/01/2022' },
        format: { value: 'DD/MM/YYYY' },
        enableTime: { value: '{{false}}' },
        enableDate: { value: '{{true}}' },
        disabledDates: { value: '{{[]}}' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{0}}' },
      },
    },
  },
  {
    name: 'Checkbox',
    displayName: 'Checkbox',
    description: 'A single checkbox',
    component: 'Checkbox',
    defaultSize: {
      width: 5,
      height: 30,
    },
    actions: [
      {
        handle: 'setChecked',
        displayName: 'Set checked',
        params: [{ handle: 'status', displayName: 'status' }],
      },
    ],
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      label: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Label',
        validation: {
          schema: { type: 'string' },
        },
      },
      defaultValue: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Default Status',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {
      onCheck: { displayName: 'On check' },
      onUnCheck: { displayName: 'On uncheck' },
    },
    styles: {
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      checkboxColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Checkbox Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: false,
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        label: { value: 'Checkbox label' },
        defaultValue: { value: '{{false}}' },
      },
      events: [],
      styles: {
        textColor: { value: '' },
        checkboxColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Radio-button',
    displayName: 'Radio Button',
    description: 'Radio buttons',
    component: 'RadioButton',
    defaultSize: {
      width: 6,
      height: 60,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      label: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Label',
        validation: {
          schema: { type: 'string' },
        },
      },
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
        },
      },
      values: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Option values',
        validation: {
          schema: {
            type: 'array',
            element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
          },
        },
      },
      display_values: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Option labels',
        validation: {
          schema: { type: 'array', element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
        },
      },
    },
    events: {
      onSelectionChange: { displayName: 'On select' },
    },
    styles: {
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      activeColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Active Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    actions: [
      {
        handle: 'selectOption',
        displayName: 'Select Option',
        params: [
          {
            handle: 'option',
            displayName: 'Option',
          },
        ],
      },
    ],
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        label: { value: 'Select' },
        value: { value: '{{true}}' },
        values: { value: '{{[true,false]}}' },
        display_values: { value: '{{["yes", "no"]}}' },
        visible: { value: '{{true}}' },
      },
      events: [],
      styles: {
        textColor: { value: '' },
        activeColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'ToggleSwitch',
    displayName: 'Toggle Switch',
    description: 'Toggle Switch',
    component: 'ToggleSwitch',
    defaultSize: {
      width: 6,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      label: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Label',
        validation: {
          schema: { type: 'string' },
        },
      },
      defaultValue: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Default Status',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {
      onChange: { displayName: 'On change' },
    },
    styles: {
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      toggleSwitchColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Toggle Switch Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: false,
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        label: { value: 'Toggle label' },
        defaultValue: { value: '{{false}}' },
      },
      events: [],
      styles: {
        textColor: { value: '' },
        toggleSwitchColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Textarea',
    displayName: 'Textarea',
    description: 'Text area form field',
    component: 'TextArea',
    defaultSize: {
      width: 6,
      height: 100,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      twoWayBinding: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Two-way default value binding (only for edit mode)',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: { type: 'string' },
        },
      },
      placeholder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
    },
    exposedVariables: {
      value:
        'Platma is a low-code platform for building and deploying internal tools with minimal engineering efforts 🚀',
    },
    actions: [
      {
        handle: 'setText',
        displayName: 'Set Text',
        params: [{ handle: 'text', displayName: 'text', defaultValue: 'New Text' }],
      },
      {
        handle: 'clear',
        displayName: 'Clear',
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        twoWayBinding: {
          value: '{{true}}',
        },
        value: {
          value:
            'Platma is a low-code platform for building and deploying internal tools with minimal engineering efforts 🚀',
        },
        placeholder: { value: 'Placeholder text' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{0}}' },
      },
    },
  },
  {
    name: 'DateRangePicker',
    displayName: 'Range Picker',
    description: 'Select a date range',
    component: 'DaterangePicker',
    defaultSize: {
      width: 10,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      defaultStartDate: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default start date',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      defaultEndDate: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default end date',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      format: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Format',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
    },
    events: {
      onSelect: { displayName: 'On select' },
    },
    styles: {
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'number' }, { type: 'string' }],
          },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
    },
    exposedVariables: {
      endDate: {},
      startDate: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        defaultStartDate: { value: '01/04/2022' },
        defaultEndDate: { value: '10/04/2022' },

        format: { value: 'DD/MM/YYYY' },
      },
      events: [],
      styles: {
        borderRadius: { value: '0' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Text',
    displayName: 'Text',
    description: 'Display markdown or HTML',
    component: 'Text',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      text: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Text',
        validation: { schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show loading state',
        validation: { schema: { type: 'boolean' } },
      },
    },
    defaultSize: { width: 6, height: 30 },
    styles: {
      fontWeight: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Font Weight',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'bold', value: 'bold' },
          { name: 'lighter', value: 'lighter' },
          { name: 'bolder', value: 'bolder' },
        ],
      },
      decoration: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Text Decoration',
        options: [
          { name: 'none', value: 'none' },
          { name: 'overline', value: 'overline' },
          { name: 'line-through', value: 'line-through' },
          { name: 'underline', value: 'underline' },
          { name: 'overline underline', value: 'overline underline' },
        ],
      },
      transformation: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Text Transformation',
        options: [
          { name: 'none', value: 'none' },
          { name: 'uppercase', value: 'uppercase' },
          { name: 'lowercase', value: 'lowercase' },
          { name: 'capitalize', value: 'capitalize' },
        ],
      },
      fontStyle: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Font Style',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'italic', value: 'italic' },
          { name: 'oblique', value: 'oblique' },
        ],
      },
      lineHeight: { type: InspectorElementTypeEnum.number, displayName: 'Line Height' },
      textIndent: { type: InspectorElementTypeEnum.number, displayName: 'Text Indent' },
      letterSpacing: { type: InspectorElementTypeEnum.number, displayName: 'Letter Spacing' },
      wordSpacing: { type: InspectorElementTypeEnum.number, displayName: 'Word Spacing' },
      fontVariant: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Font Variant',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'small-caps', value: 'small-caps' },
          { name: 'initial', value: 'initial' },
          { name: 'inherit', value: 'inherit' },
        ],
      },
      textSize: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Text Size',
        validation: {
          schema: { type: 'number' },
        },
      },
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textAlign: {
        type: InspectorElementTypeEnum.alignButtons,
        displayName: 'Align Text',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      text: 'Hello, there!',
    },
    actions: [
      {
        handle: 'setText',
        displayName: 'Set Text',
        params: [{ handle: 'text', displayName: 'Text', defaultValue: 'New text' }],
      },
      {
        handle: 'visibility',
        displayName: 'Set Visibility',
        params: [
          {
            handle: 'visibility',
            displayName: 'Value',
            defaultValue: `{{false}}`,
            type: InspectorElementTypeEnum.toggle,
          },
        ],
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        text: { value: 'Hello, there!' },
        loadingState: { value: `{{false}}` },
      },
      events: [],
      styles: {
        backgroundColor: { value: '#fff00000' },
        textColor: { value: '#000000' },
        textSize: { value: 14 },
        textAlign: { value: 'left' },
        fontWeight: { value: 'normal' },
        decoration: { value: 'none' },
        transformation: { value: 'none' },
        fontStyle: { value: 'normal' },
        lineHeight: { value: 1.5 },
        textIndent: { value: 0 },
        letterSpacing: { value: 0 },
        wordSpacing: { value: 0 },
        fontVariant: { value: 'normal' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'TimeRunner',
    displayName: 'Time Runner',
    description: 'Set events that are triggered after certain time',
    component: 'TimeRunner',
    defaultSize: { width: 2, height: 10 },
    withoutDocumentationLink: true,
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      reinject: {
        type: InspectorElementTypeEnum.rundomNumberGenerator,
        displayName: 'Reinject time runner to apply new changes (only for edit mode)',
        buttonText: 'Reinject',
      },
      isDisabled: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disabled (only for edit mode)',
        withFxButton: false,
      },
      isOnce: {
        type: InspectorElementTypeEnum.toggleAfterTime,
        displayName: 'Execute once:',
        validation: { schema: { type: 'boolean' } },
      },
      after: {
        type: InspectorElementTypeEnum.code,
        displayName: 'After:',
        validation: {
          withErrorMessage: `Invalid value, time must be in ${timerFormat} format`,
          schema: { type: 'string', pattern: timerFormatRegExp },
        },
      },
      repeat: {
        type: InspectorElementTypeEnum.intervalSelect,
        displayName: 'Then repeat:',
        options: [
          { name: 'None', value: 'none' },
          { name: 'Interval', value: 'interval' },
          { name: 'Interval between times', value: 'betweenTimes' },
          { name: 'Specific time', value: 'specificTime' },
        ],
        validation: { schema: { type: 'string' } },
      },
      interval: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Every:',
        validation: {
          withErrorMessage: `Invalid value, time must be in ${timerFormat} format`,
          schema: { type: 'string', pattern: timerFormatRegExp },
        },
      },
      startTime: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Beetwen:',
        validation: {
          withErrorMessage: `Invalid value, time must be in ${timerFormat} format`,
          schema: { type: 'string', pattern: timerFormatRegExp },
        },
      },
      endTime: {
        type: InspectorElementTypeEnum.code,
        displayName: 'And:',
        validation: {
          withErrorMessage: `Invalid value, time must be in ${timerFormat} format`,
          schema: { type: 'string', pattern: timerFormatRegExp },
        },
      },
      atTime: {
        type: InspectorElementTypeEnum.code,
        displayName: 'At:',
        validation: {
          withErrorMessage: `Invalid value, time must be in ${timerFormat} format`,
          schema: { type: 'string', pattern: timerFormatRegExp },
        },
      },
      onDays: {
        type: InspectorElementTypeEnum.daySelector,
        displayName: 'On:',
        validation: { schema: { type: 'array' } },
      },
    },
    validation: {},
    events: { onInject: { displayName: 'On Inject' } },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } },
      },
    },
    exposedVariables: { value: '' },
    definition: {
      others: { showOnDesktop: { value: '{{true}}' }, showOnMobile: { value: '{{false}}' } },
      properties: {
        isDisabled: { value: '{{false}}' },
        isOnce: { value: '{{true}}' },
        after: { value: '00:00:00:000', isActive: true },
        repeat: { value: 'none' },
        startTime: { value: '00:00:00:000', isActive: false },
        endTime: { value: '23:59:59:999', isActive: false },
        atTime: { value: '12:00:00:000', isActive: false },
        interval: { value: '00:00:01:000', isActive: false },
        onDays: { value: '{{[0, 1, 2, 3, 4, 5, 6]}}', isActive: false },
      },
      events: [],
      styles: { visibility: { value: '{{true}}' }, disabledState: { value: '{{false}}' } },
    },
  },
  {
    name: 'Image',
    displayName: 'Image',
    description: 'Display an Image',
    defaultSize: {
      width: 3,
      height: 100,
    },
    component: 'Image',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      source: {
        type: InspectorElementTypeEnum.code,
        displayName: 'URL',
        validation: {
          schema: { type: 'string' },
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      alternativeText: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Alternative text',
        validation: {
          schema: { type: 'string' },
        },
      },
      zoomButtons: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Zoom button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      rotateButton: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Rotate button',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {
      onClick: { displayName: 'On click' },
    },
    styles: {
      borderType: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Border type',
        options: [
          { name: 'None', value: 'none' },
          { name: 'Rounded', value: 'rounded' },
          { name: 'Circle', value: 'rounded-circle' },
          { name: 'Thumbnail', value: 'img-thumbnail' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      padding: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Padding',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      imageFit: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Image fit',
        options: [
          { name: 'fill', value: 'fill' },
          { name: 'contain', value: 'contain' },
          { name: 'cover', value: 'cover' },
          { name: 'scale-down', value: 'scale-down' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        source: { value: 'https://www.svgrepo.com/show/34217/image.svg' },
        visible: { value: '{{true}}' },
        loadingState: { value: '{{false}}' },
        alternativeText: { value: '' },
        zoomButtons: { value: '{{false}}' },
        rotateButton: { value: '{{false}}' },
      },
      events: [],
      styles: {
        borderType: { value: 'none' },
        padding: { value: '0' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        imageFit: { value: 'contain' },
        backgroundColor: { value: '' },
      },
    },
  },
  {
    name: 'Container',
    displayName: 'Container',
    description: 'Wrapper for multiple components',
    defaultSize: {
      width: 5,
      height: 200,
    },
    component: 'Container',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'loading state',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {},
    styles: {
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border Radius',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
      borderColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        visible: { value: '{{true}}' },
        loadingState: { value: `{{false}}` },
      },
      events: [],
      styles: {
        backgroundColor: { value: '#fff' },
        borderRadius: { value: '0' },
        borderColor: { value: '#fff' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Dropdown',
    displayName: 'Dropdown',
    description: 'Select one value from options',
    defaultSize: {
      width: 8,
      height: 30,
    },
    component: 'DropDown',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    validation: {
      customRule: { type: InspectorElementTypeEnum.code, displayName: 'Custom validation' },
    },
    properties: {
      label: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Label',
        validation: {
          schema: { type: 'string' },
        },
      },
      placeholder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Placeholder',
        validation: {
          validation: {
            schema: { type: 'string' },
          },
        },
      },
      advanced: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Advanced',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        conditionallyRender: {
          key: 'advanced',
          value: false,
        },
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
          },
        },
      },
      values: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Option values',
        conditionallyRender: {
          key: 'advanced',
          value: false,
        },
        validation: {
          schema: {
            type: 'array',
            element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
          },
        },
      },
      display_values: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Option labels',
        conditionallyRender: {
          key: 'advanced',
          value: false,
        },
        validation: {
          schema: {
            type: 'array',
            element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
          },
        },
      },

      schema: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Schema',
        conditionallyRender: {
          key: 'advanced',
          value: true,
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Options loading state',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {
      onSelect: { displayName: 'On select' },
      onSearchTextChanged: { displayName: 'On search text changed' },
    },
    styles: {
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'number' }, { type: 'string' }],
          },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      selectedTextColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Selected Text Color',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      justifyContent: {
        type: InspectorElementTypeEnum.alignButtons,
        displayName: 'Align Text',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
    },
    exposedVariables: {
      value: 2,
      searchText: '',
      label: 'Select',
      optionLabels: ['one', 'two', 'three'],
      selectedOptionLabel: 'two',
    },
    actions: [
      {
        handle: 'selectOption',
        displayName: 'Select option',
        params: [{ handle: 'select', displayName: 'Select' }],
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      validation: {
        customRule: { value: null },
      },
      properties: {
        advanced: { value: `{{false}}` },
        schema: {
          value:
            "{{[\t{label: 'One',value: 1,disable: false,visible: true,default: true},{label: 'Two',value: 2,disable: false,visible: true},{label: 'Three',value: 3,disable: false,visible: true}\t]}}",
        },

        label: { value: 'Select' },
        value: { value: '{{2}}' },
        values: { value: '{{[1,2,3]}}' },
        display_values: { value: '{{["one", "two", "three"]}}' },
        loadingState: { value: '{{false}}' },
        placeholder: { value: 'Select an option' },
      },
      events: [],
      styles: {
        borderRadius: { value: '0' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        justifyContent: { value: 'left' },
      },
    },
  },
  {
    name: 'Multiselect',
    displayName: 'Multiselect',
    description: 'Select multiple values from options',
    defaultSize: {
      width: 12,
      height: 30,
    },
    component: 'Multiselect',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    actions: [
      {
        handle: 'selectOption',
        displayName: 'Select Option',
        params: [
          {
            handle: 'option',
            displayName: 'Option',
          },
        ],
      },
      {
        handle: 'deselectOption',
        displayName: 'Deselect Option',
        params: [
          {
            handle: 'option',
            displayName: 'Option',
          },
        ],
      },
      {
        handle: 'clearSelections',
        displayName: 'Clear selections',
      },
    ],
    properties: {
      label: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Label',
        validation: {
          schema: { type: 'string' },
        },
      },
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: { type: 'array', element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
        },
      },
      values: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Option values',
        validation: {
          schema: { type: 'array', element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
        },
      },
      display_values: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Option labels',
        validation: {
          schema: { type: 'array', element: { type: 'string' } },
        },
      },
      showAllOption: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable select All option',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {
      onSelect: { displayName: 'On select' },
    },
    styles: {
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      values: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        label: { value: 'Select' },
        value: { value: '{{[2,3]}}' },
        values: { value: '{{[1,2,3]}}' },
        display_values: { value: '{{["one", "two", "three"]}}' },
        visible: { value: '{{true}}' },
        showAllOption: { value: '{{false}}' },
      },
      events: [],
      styles: {
        borderRadius: { value: '0' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'RichTextEditor',
    displayName: 'Text Editor',
    description: 'Rich text editor',
    component: 'RichTextEditor',
    defaultSize: {
      width: 16,
      height: 210,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      placeholder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' },
        },
      },
      defaultValue: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default Value',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
    },
    exposedVariables: {
      value: '',
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        placeholder: { value: 'Placeholder text' },
        defaultValue: { value: '' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  // {
  //   name: 'Map',
  //   displayName: 'Map',
  //   description: 'Display Google Maps',
  //   component: 'Map',
  //   defaultSize: {
  //     width: 16,
  //     height: 420,
  //   },
  //   others: {
  //     resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
  //     positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
  //     showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
  //     showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
  //   },
  //   properties: {
  //     initialLocation: {
  //       type: InspectorElementTypeEnum.code,
  //       displayName: 'Initial location',
  //       tip: 'This location will be the initial center of the map',
  //       options: {
  //         mode: 'javascript',
  //         theme: 'duotone-light',
  //         className: 'map-location-input pr-2',
  //       },
  //       validation: {
  //         schema: {
  //           type: 'union',
  //           schemas: [{ type: 'array', element: { type: 'object' } }, { type: 'object' }],
  //         },
  //       },
  //     },
  //     defaultMarkers: {
  //       type: InspectorElementTypeEnum.code,
  //       displayName: 'Default markers',
  //       options: {
  //         mode: 'javascript',
  //         theme: 'duotone-light',
  //         className: 'map-location-input pr-2',
  //       },
  //       validation: {
  //         schema: {
  //           type: 'union',
  //           schemas: [{ type: 'array', element: { type: 'object' } }, { type: 'object' }],
  //         },
  //       },
  //     },
  //     addNewMarkers: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Add new markers',
  //       validation: {
  //         schema: {
  //           type: 'boolean',
  //         },
  //       },
  //     },
  //     canSearch: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Search for places',
  //       validation: {
  //         schema: {
  //           type: 'boolean',
  //         },
  //       },
  //     },
  //   },
  //   events: {
  //     onBoundsChange: { displayName: 'On bounds change' },
  //     onCreateMarker: { displayName: 'On create marker' },
  //     onMarkerClick: { displayName: 'On marker click' },
  //   },
  //   actions: [
  //     {
  //       handle: 'setLocation',
  //       displayName: 'Set Location',
  //       params: [
  //         { handle: 'lat', displayName: 'Latitude' },
  //         { handle: 'lng', displayName: 'Longitude' },
  //       ],
  //     },
  //   ],
  //   styles: {
  //     visibility: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Visibility',
  //       validation: {
  //         schema: {
  //           type: 'boolean',
  //         },
  //       },
  //     },
  //     disabledState: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Disable',
  //       validation: {
  //         schema: {
  //           type: 'boolean',
  //         },
  //       },
  //     },
  //   },
  //   exposedVariables: {
  //     center: {},
  //   },
  //   definition: {
  //     others: {
  //       showOnDesktop: { value: '{{true}}' },
  //       showOnMobile: { value: '{{false}}' },
  //     },
  //     properties: {
  //       initialLocation: {
  //         value: `{{ {"lat": 40.7128, "lng": -73.935242} }}`,
  //       },
  //       defaultMarkers: {
  //         value: `{{ [{"lat": 40.7128, "lng": -73.935242}] }}`,
  //       },
  //       canSearch: {
  //         value: `{{true}}`,
  //       },
  //       addNewMarkers: { value: `{{true}}` },
  //     },
  //     events: [],
  //     styles: {
  //       visibility: { value: '{{true}}' },
  //       disabledState: { value: '{{false}}' },
  //     },
  //   },
  // },
  {
    name: 'QrScanner',
    displayName: 'QR Scanner',
    description: 'Scan QR codes and hold its data',
    component: 'QrScanner',
    defaultSize: {
      width: 10,
      height: 300,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {},
    events: {
      onDetect: { displayName: 'On detect' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      lastDetectedValue: '',
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{true}}' },
      },
      properties: {},
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'StarRating',
    displayName: 'Rating',
    description: 'Star rating',
    component: 'StarRating',
    defaultSize: { width: 10, height: 30 },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      label: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Label',
        validation: { schema: { type: 'string' } },
      },
      maxRating: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Number of stars',
        validation: { schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
      },
      defaultSelected: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default no of selected stars',
        validation: { schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
      },
      allowHalfStar: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable half star',
        validation: { schema: { type: 'boolean' } },
      },
      tooltips: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Tooltips',
        validation: {
          schema: { type: 'array', element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
        },
      },
    },
    events: { onChange: { displayName: 'On Change' } },
    styles: {
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Star Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      labelColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Label Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: 0,
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        label: { value: 'Select your rating' },
        maxRating: { value: '5' },
        defaultSelected: { value: '5' },
        allowHalfStar: { value: '{{false}}' },
        visible: { value: '{{true}}' },
        tooltips: { value: '{{[]}}' },
      },
      events: [],
      styles: {
        textColor: { value: '#ffb400' },
        labelColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Divider',
    displayName: 'Divider',
    description: 'Separator between components',
    component: 'Divider',
    defaultSize: {
      width: 10,
      height: 10,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {},
    events: {},
    styles: {
      dividerColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Divider Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {},
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        dividerColor: { value: '' },
      },
    },
  },
  {
    name: 'FilePicker',
    displayName: 'File Picker',
    description: 'File Picker',
    component: 'FilePicker',
    defaultSize: {
      width: 15,
      height: 100,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    actions: [
      {
        handle: 'clearFiles',
        displayName: 'Clear Files',
      },
    ],
    properties: {
      instructionText: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Instruction Text',
        validation: {
          schema: { type: 'string' },
        },
      },
      enableDropzone: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Use Drop zone',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      enablePicker: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Use File Picker',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      enableMultiple: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Pick multiple files',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      maxFileCount: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Max file count',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
      fileType: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Accept file types',
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
      maxSize: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Max size limit (Bytes)',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
      minSize: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Min size limit (Bytes)',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
      parseContent: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Parse content',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      parseFileType: {
        type: InspectorElementTypeEnum.select,
        displayName: 'File type',
        options: [
          { name: 'Autodetect from extension', value: 'auto-detect' },
          { name: 'CSV', value: 'csv' },
          { name: 'Microsoft Excel - xls', value: 'vnd.ms-excel' },
          {
            name: 'Microsoft Excel - xlsx',
            value: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
        validation: {
          schema: {
            type: 'string',
          },
        },
      },
    },
    events: {
      onFileSelected: { displayName: 'On File Selected' },
      onFileLoaded: { displayName: 'On File Loaded' },
      onFileDeselected: { displayName: 'On File Deselected' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
    },
    exposedVariables: {
      file: [{ name: '', content: '', dataURL: '', type: '', parsedData: '' }],
      isParsing: false,
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        instructionText: { value: 'Drag and Drop some files here, or click to select files' },
        enableDropzone: { value: '{{true}}' },
        enablePicker: { value: '{{true}}' },
        maxFileCount: { value: '{{2}}' },
        enableMultiple: { value: '{{false}}' },
        fileType: { value: '{{"image/*"}}' },
        maxSize: { value: '{{1048576}}' },
        minSize: { value: '{{50}}' },
        parseContent: { value: '{{false}}' },
        parseFileType: { value: 'auto-detect' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{0}}' },
      },
    },
  },
  {
    name: 'Calendar',
    displayName: 'Calendar',
    description: 'Calendar',
    component: 'Calendar',
    defaultSize: {
      width: 30,
      height: 600,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      dateFormat: { type: InspectorElementTypeEnum.code, displayName: 'Date format' },
      defaultDate: { type: InspectorElementTypeEnum.code, displayName: 'Default date' },
      events: { type: InspectorElementTypeEnum.code, displayName: 'Events' },
      resources: { type: InspectorElementTypeEnum.code, displayName: 'Resources' },
      defaultView: { type: InspectorElementTypeEnum.code, displayName: 'Default view' },
      startTime: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Start time on week and day view',
      },
      endTime: { type: InspectorElementTypeEnum.code, displayName: 'End time on week and day view' },
      displayToolbar: { type: InspectorElementTypeEnum.toggle, displayName: 'Show toolbar' },
      displayViewSwitcher: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show view switcher',
      },
      highlightToday: { type: InspectorElementTypeEnum.toggle, displayName: 'Highlight today' },
      showPopOverOnEventClick: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show popover when event is clicked',
      },
    },
    events: {
      onCalendarEventSelect: { displayName: 'On Event Select' },
      onCalendarSlotSelect: { displayName: 'On Slot Select' },
      onCalendarNavigate: { displayName: 'On Date Navigate' },
      onCalendarViewChange: { displayName: 'On View Change' },
    },
    styles: {
      visibility: { type: InspectorElementTypeEnum.toggle, displayName: 'Visibility' },
      cellSizeInViewsClassifiedByResource: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Cell size in views classified by resource',
        options: [
          { name: 'Compact', value: 'compact' },
          { name: 'Spacious', value: 'spacious' },
        ],
      },
      weekDateFormat: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Header date format on week view',
      },
    },
    exposedVariables: {
      selectedEvent: {},
      selectedSlots: {},
      currentView: 'month',
      currentDate: undefined,
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        dateFormat: {
          value: 'MM-DD-YYYY HH:mm:ss A Z',
        },
        defaultDate: {
          value: '{{moment().format("MM-DD-YYYY HH:mm:ss A Z")}}',
        },
        events: {
          value:
            "{{[\n\t\t{\n\t\t\t title: 'Sample event',\n\t\t\t start: `${moment().startOf('day').format('MM-DD-YYYY HH:mm:ss A Z')}`,\n\t\t\t end: `${moment().endOf('day').format('MM-DD-YYYY HH:mm:ss A Z')}`,\n\t\t\t allDay: false,\n\t\t\t color: '#4D72DA'\n\t\t}\n]}}",
        },
        resources: {
          value: '{{[]}}',
        },
        defaultView: {
          value: "{{'month'}}",
        },
        startTime: {
          value: "{{moment().startOf('day').format('MM-DD-YYYY HH:mm:ss A Z')}}",
        },
        endTime: {
          value: "{{moment().endOf('day').format('MM-DD-YYYY HH:mm:ss A Z')}}",
        },
        displayToolbar: {
          value: true,
        },
        displayViewSwitcher: {
          value: true,
        },
        highlightToday: {
          value: true,
        },
        showPopOverOnEventClick: {
          value: false,
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        cellSizeInViewsClassifiedByResource: { value: 'spacious' },
        weekDateFormat: { value: 'DD MMM' },
      },
    },
  },
  {
    name: 'Iframe',
    displayName: 'Iframe',
    description: 'Display an Iframe',
    defaultSize: {
      width: 20,
      height: 310,
    },
    component: 'IFrame',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      source: {
        type: InspectorElementTypeEnum.code,
        displayName: 'URL',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        source: { value: 'https://www.youtube.com/embed/RjaC2MWX_oc?si=6wrfADuXyNtkG4Od' },
        visible: { value: '{{true}}' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'CodeEditor',
    displayName: 'Code Editor',
    description: 'Code Editor',
    component: 'CodeEditor',
    defaultSize: {
      width: 15,
      height: 120,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      enableLineNumber: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Show Line Number',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      mode: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Mode',
        validation: {
          schema: { type: 'string' },
        },
      },
      placeholder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Placeholder',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
    },
    exposedVariables: {
      value: '',
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        enableLineNumber: { value: '{{true}}' },
        mode: { value: 'javascript' },
        placeholder: { value: '' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{0}}' },
      },
    },
  },
  {
    name: 'BreadCrumbs',
    displayName: 'Bread Crumbs',
    description: 'Secondary navigation aid',
    withoutDocumentationLink: true,
    defaultSize: { width: 15, height: 40 },
    component: 'BreadCrumbs',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      maxLength: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Max Length of crumbs',
        validation: { schema: { type: 'number' } },
      },
      subPageComputedName: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Sub Page/Category name',
        validation: { schema: { type: 'string' } },
      },
      innerPageComputedName: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Inner page name',
        validation: { schema: { type: 'string' } },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading state',
        validation: { schema: { type: 'boolean' } },
      },
    },
    styles: {
      fontWeight: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Font Weight',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'bold', value: 'bold' },
          { name: 'lighter', value: 'lighter' },
          { name: 'bolder', value: 'bolder' },
        ],
      },
      decoration: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Text Decoration',
        options: [
          { name: 'none', value: 'none' },
          { name: 'overline', value: 'overline' },
          { name: 'line-through', value: 'line-through' },
          { name: 'underline', value: 'underline' },
          { name: 'overline underline', value: 'overline underline' },
        ],
      },
      transformation: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Text Transformation',
        options: [
          { name: 'none', value: 'none' },
          { name: 'uppercase', value: 'uppercase' },
          { name: 'lowercase', value: 'lowercase' },
          { name: 'capitalize', value: 'capitalize' },
        ],
      },
      fontStyle: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Font Style',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'italic', value: 'italic' },
          { name: 'oblique', value: 'oblique' },
        ],
      },
      lineHeight: { type: InspectorElementTypeEnum.number, displayName: 'Line Height' },
      textIndent: { type: InspectorElementTypeEnum.number, displayName: 'Text Indent' },
      letterSpacing: { type: InspectorElementTypeEnum.number, displayName: 'Letter Spacing' },
      wordSpacing: { type: InspectorElementTypeEnum.number, displayName: 'Word Spacing' },
      fontVariant: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Font Variant',
        options: [
          { name: 'normal', value: 'normal' },
          { name: 'small-caps', value: 'small-caps' },
          { name: 'initial', value: 'initial' },
          { name: 'inherit', value: 'inherit' },
        ],
      },
      textSize: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Text Size',
        validation: {
          schema: { type: 'number' },
        },
      },
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textAlign: {
        type: InspectorElementTypeEnum.alignButtons,
        displayName: 'Align Text',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    definition: {
      others: { showOnDesktop: { value: '{{true}}' }, showOnMobile: { value: '{{false}}' } },
      styles: {
        backgroundColor: { value: '#ffffff00' },
        textColor: { value: '#000000' },
        textSize: { value: 14 },
        textAlign: { value: 'left' },
        fontWeight: { value: 'normal' },
        decoration: { value: 'none' },
        transformation: { value: 'none' },
        fontStyle: { value: 'normal' },
        lineHeight: { value: 1.5 },
        textIndent: { value: 0 },
        letterSpacing: { value: 0 },
        wordSpacing: { value: 0 },
        fontVariant: { value: 'normal' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
      properties: { maxLength: { value: 3 } },
      events: [],
    },
  },
  // {
  //   name: 'Catalog',
  //   displayName: 'Catalog',
  //   description: 'Container with a list of categories',
  //   withoutDocumentationLink: true,
  //   defaultSize: { width: 41, height: 380 },
  //   defaultChildren: [
  //     {
  //       componentName: 'Listview',
  //       layout: { top: 0, left: 0, width: 43, height: 330 },
  //       tab: 1,
  //       withDefaultChildren: true,
  //       properties: ['rowHeight', 'data'],
  //       styles: ['borderColor'],
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       defaultValue: {
  //         borderColor: 'rgba(0, 0, 0, 0)',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //         rowHeight: '110',
  //         data: `{{[
  //           { imageURL: 'https://www.svgrepo.com/show/279196/smartphone-cellphone.svg', text: 'LG', buttonText: 'Add to cart', id: '1' },
  //           { imageURL: 'https://www.svgrepo.com/show/279196/smartphone-cellphone.svg', text: 'Samsung', buttonText: 'Add to cart', id: '2' },
  //           { imageURL: 'https://www.svgrepo.com/show/279196/smartphone-cellphone.svg', text: 'Apple', buttonText: 'Add to cart', id: '3' }
  //         ]}}`,
  //       },
  //       events: [
  //         {
  //           eventId: 'onRowClicked',
  //           actionId: 'control-component',
  //           componentId: RelationshipEnum.parent,
  //           componentSpecificActionHandle: 'redirectToInnerPage',
  //           componentSpecificActionParams: [
  //             {
  //               handle: 'category',
  //               displayName: 'Category ID',
  //               value: `{{components.${RelationshipEnum.parent}.currentCategoryId}}`,
  //             },
  //             {
  //               handle: 'innerPage',
  //               displayName: 'Product ID',
  //               value: `{{components.${RelationshipEnum.self}.selectedRowInfo.id}}`,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       componentName: 'Listview',
  //       layout: { top: 0, left: 0, width: 43, height: 330 },
  //       tab: 2,
  //       withDefaultChildren: true,
  //       properties: ['rowHeight', 'data'],
  //       styles: ['borderColor'],
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       defaultValue: {
  //         borderColor: 'rgba(0, 0, 0, 0)',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //         rowHeight: '110',
  //         data: `{{[
  //           { imageURL: 'https://www.svgrepo.com/show/474385/laptop1.svg', text: 'Macbook', buttonText: 'Add to cart', id: '4' },
  //           { imageURL: 'https://www.svgrepo.com/show/474385/laptop1.svg', text: 'Dell', buttonText: 'Add to cart', id: '5' },
  //           { imageURL: 'https://www.svgrepo.com/show/474385/laptop1.svg', text: 'Asus', buttonText: 'Add to cart', id: '6' }
  //         ]}}`,
  //       },
  //       events: [
  //         {
  //           eventId: 'onRowClicked',
  //           actionId: 'control-component',
  //           componentId: RelationshipEnum.parent,
  //           componentSpecificActionHandle: 'redirectToInnerPage',
  //           componentSpecificActionParams: [
  //             {
  //               handle: 'category',
  //               displayName: 'Category ID',
  //               value: `{{components.${RelationshipEnum.parent}.currentCategoryId}}`,
  //             },
  //             {
  //               handle: 'innerPage',
  //               displayName: 'Product ID',
  //               value: `{{components.${RelationshipEnum.self}.selectedRowInfo.id}}`,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       componentName: 'Listview',
  //       layout: { top: 0, left: 0, width: 43, height: 330 },
  //       tab: 3,
  //       withDefaultChildren: true,
  //       properties: ['rowHeight', 'data'],
  //       styles: ['borderColor'],
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       defaultValue: {
  //         borderColor: 'rgba(0, 0, 0, 0)',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //         rowHeight: '110',
  //         data: `{{[
  //           { imageURL: 'https://www.svgrepo.com/show/503859/game.svg', text: 'GTA 6', buttonText: 'Add to cart', id: '7' },
  //           { imageURL: 'https://www.svgrepo.com/show/503859/game.svg', text: 'S.T.A.L.K.E.R. 2', buttonText: 'Add to cart', id: '8' },
  //           { imageURL: 'https://www.svgrepo.com/show/503859/game.svg', text: 'The Witcher 4', buttonText: 'Add to cart', id: '9'   }
  //         ]}}`,
  //       },
  //       events: [
  //         {
  //           eventId: 'onRowClicked',
  //           actionId: 'control-component',
  //           componentId: RelationshipEnum.parent,
  //           componentSpecificActionHandle: 'redirectToInnerPage',
  //           componentSpecificActionParams: [
  //             {
  //               handle: 'category',
  //               displayName: 'Category ID',
  //               value: `{{components.${RelationshipEnum.parent}.currentCategoryId}}`,
  //             },
  //             {
  //               handle: 'innerPage',
  //               displayName: 'Product ID',
  //               value: `{{components.${RelationshipEnum.self}.selectedRowInfo.id}}`,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       componentName: 'Image',
  //       layout: { top: 50, left: 0, height: 320, width: 21 },
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       tab: 'inner',
  //       properties: ['source'],
  //       defaultValue: {
  //         source: 'https://www.svgrepo.com/show/493365/product-shelf.svg',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //       },
  //     },
  //     {
  //       componentName: 'Text',
  //       layout: { top: 20, left: 49, width: 20, height: 40 },
  //       tab: 'inner',
  //       styles: ['fontWeight'],
  //       properties: ['text'],
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       defaultValue: {
  //         fontWeight: 'bold',
  //         text: 'Fetch some data to render product info here',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //       },
  //     },
  //     {
  //       componentName: 'Text',
  //       layout: { top: 90, left: 49, width: 20, height: 60 },
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       tab: 'inner',
  //       properties: ['text'],
  //       defaultValue: { text: 'There should be some description', showOnDesktop: '{{true}}', showOnMobile: '{{true}}' },
  //     },
  //     {
  //       componentName: 'Button',
  //       tab: 'inner',
  //       layout: { top: 280, left: 72, height: 30, width: 10 },
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       styles: ['backgroundColor'],
  //       properties: ['text'],
  //       defaultValue: {
  //         text: 'Copy SKU',
  //         backgroundColor: '#E7DEC9',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //       },
  //     },
  //     {
  //       componentName: 'Button',
  //       tab: 'inner',
  //       layout: { top: 245, left: 72, height: 30, width: 10 },
  //       styles: ['backgroundColor'],
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       properties: ['text'],
  //       defaultValue: {
  //         text: 'Order',
  //         backgroundColor: '#9EB1E9',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //       },
  //     },
  //     {
  //       componentName: 'StarRating',
  //       tab: 'inner',
  //       layout: { top: 190, left: 49, height: 30, width: 16 },
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       properties: ['defaultSelected', 'label'],
  //       defaultValue: {
  //         defaultSelected: '4',
  //         label: 'Product rating',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //       },
  //     },
  //     {
  //       componentName: 'BreadCrumbs',
  //       tab: 'inner',
  //       layout: { top: 10, left: 1, height: 30, width: 16 },
  //       others: ['showOnDesktop', 'showOnMobile'],
  //       properties: ['defaultSelected', 'label'],
  //       defaultValue: {
  //         defaultSelected: '4',
  //         label: 'Product rating',
  //         showOnDesktop: '{{true}}',
  //         showOnMobile: '{{true}}',
  //       },
  //     },
  //   ],
  //   component: 'Catalog',
  //   others: {
  //     resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
  //     positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
  //     showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
  //     showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
  //   },
  //   properties: {
  //     isInnerPageShown: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Show inner page (only for edit mode)',
  //       validation: { schema: { type: 'boolean' } },
  //       withFxButton: false,
  //     },
  //     loadingState: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Loading state',
  //       validation: { schema: { type: 'boolean' } },
  //     },
  //     innerPageLoadingState: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Inner page loading state',
  //       validation: { schema: { type: 'boolean' } },
  //     },
  //     categories: {
  //       type: InspectorElementTypeEnum.code,
  //       displayName: 'Categories',
  //       validation: {
  //         schema: {
  //           type: 'array',
  //           element: {
  //             type: 'object',
  //             object: { id: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
  //           },
  //         },
  //       },
  //     },
  //     defaultCategory: {
  //       type: InspectorElementTypeEnum.code,
  //       displayName: 'Default category',
  //       validation: { schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
  //     },
  //     hideCategory: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Hide Categories',
  //       validation: { schema: { type: 'boolean' } },
  //     },
  //     isRenderOnlyActiveCategory: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Render only active category',
  //       validation: { schema: { type: 'boolean' } },
  //     },
  //     isSpinerShown: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Show spiner if categories are empty',
  //       validation: { schema: { type: 'boolean' } },
  //       withFxButton: false,
  //     },
  //     defaultInnerPageSpinerTime: {
  //       type: InspectorElementTypeEnum.number,
  //       displayName: 'Default inner page spiner time in milliseconds',
  //       validation: { schema: { type: 'number' } },
  //       withFxButton: false,
  //     },
  //   },
  //   events: {
  //     onCategorySwitch: { displayName: 'On category switch' },
  //     onRedirectToInnerPage: { displayName: 'On redirect to inner page' },
  //     onWidgetInit: { displayName: 'On widget initializing' },
  //   },
  //   styles: {
  //     highlightColor: {
  //       type: InspectorElementTypeEnum.color,
  //       displayName: 'Highlight Color',
  //       validation: { schema: { type: 'string' } },
  //     },
  //     visibility: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Visibility',
  //       validation: { schema: { type: 'boolean' } },
  //     },
  //     disabledState: {
  //       type: InspectorElementTypeEnum.toggle,
  //       displayName: 'Disable',
  //       validation: { schema: { type: 'boolean' } },
  //     },
  //   },
  //   actions: [
  //     {
  //       handle: 'redirectToInnerPage',
  //       displayName: 'Redirect to inner page',
  //       params: [
  //         { handle: 'category', displayName: 'Category ID' },
  //         { handle: 'innerPage', displayName: 'Product ID' },
  //       ],
  //     },
  //     {
  //       handle: 'setCurrentCategory',
  //       displayName: 'Set current category',
  //       params: [{ handle: 'category', displayName: 'Category' }],
  //     },
  //   ],
  //   exposedVariables: { currentCategoryId: '', currentInnerPageId: '', currentCategoryInfo: {} },
  //   definition: {
  //     others: { showOnDesktop: { value: '{{true}}' }, showOnMobile: { value: '{{false}}' } },
  //     properties: {
  //       defaultInnerPageSpinerTime: { value: 200 },
  //       innerPageLoadingState: { value: `{{false}}` },
  //       isSpinerShown: { value: `{{true}}` },
  //       loadingState: { value: `{{false}}` },
  //       categories: {
  //         value:
  //           "{{[ \n\t\t{ name: 'Phone', id: '1', urlpath: 'phone' }, \n\t\t{ name: 'Laptop', id: '2', urlpath: 'laptop' }, \n\t\t{ name: 'Games', id: '3', urlpath: 'games' } \n ]}}",
  //       },
  //       defaultCategory: { value: '1' },
  //       hideCategory: { value: false },
  //       isRenderOnlyActiveCategory: { value: true },
  //     },
  //     events: [],
  //     styles: {
  //       highlightColor: { value: '' },
  //       visibility: { value: '{{true}}' },
  //       disabledState: { value: '{{false}}' },
  //     },
  //   },
  // },
  {
    name: 'Tabs',
    displayName: 'Tabs',
    description: 'Tabs component',
    defaultSize: {
      width: 30,
      height: 300,
    },
    defaultChildren: [
      {
        componentName: 'Image',
        layout: {
          top: 60,
          left: 37,
          height: 100,
        },
        tab: 0,
        properties: ['source'],
        defaultValue: {
          source: 'assets/images/dark.svg',
        },
      },
      {
        componentName: 'Text',
        layout: {
          top: 100,
          left: 17,
          height: 50,
          width: 34,
        },
        tab: 1,
        properties: ['text'],
        defaultValue: {
          text: 'Platma is a low-code platform to build & deploy internal tools within minutes.',
        },
      },
      {
        componentName: 'Table',
        layout: {
          top: 0,
          left: 1,
          width: 42,
          height: 250,
        },
        tab: 2,
      },
    ],
    component: 'Tabs',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      tabs: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Tabs',
        validation: {
          schema: {
            type: 'array',
            element: {
              type: 'object',
              object: {
                id: {
                  type: 'union',
                  schemas: [{ type: 'string' }, { type: 'number' }],
                },
              },
            },
          },
        },
      },
      defaultTab: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default tab',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
      hideTabs: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Hide Tabs',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      renderOnlyActiveTab: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Render only active tab',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
    },
    events: { onTabSwitch: { displayName: 'On tab switch' } },
    styles: {
      highlightColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Highlight Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: {
            type: 'boolean',
          },
        },
      },
      tabWidth: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Tab width',
        options: [
          { name: 'Auto', value: 'auto' },
          { name: 'Equally split', value: 'split' },
        ],
      },
    },
    actions: [
      {
        handle: 'setTab',
        displayName: 'Set current tab',
        params: [
          {
            handle: 'id',
            displayName: 'Id',
          },
        ],
      },
    ],
    exposedVariables: { currentTab: '' },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        tabs: {
          value:
            "{{[ \n\t\t{ title: 'Home', id: '0' }, \n\t\t{ title: 'Profile', id: '1' }, \n\t\t{ title: 'Settings', id: '2' } \n ]}}",
        },
        defaultTab: { value: '0' },
        hideTabs: { value: false },
        renderOnlyActiveTab: { value: true },
      },
      events: [],
      styles: {
        highlightColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        tabWidth: { value: 'auto' },
      },
    },
  },
  {
    name: 'Timer',
    displayName: 'Timer',
    description: 'timer',
    component: 'Timer',
    defaultSize: {
      width: 11,
      height: 128,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: { type: 'string' },
        },
      },
      type: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Timer type',
        options: [
          { name: 'Count Up', value: 'countUp' },
          { name: 'Count Down', value: 'countDown' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    validation: {},
    events: {
      onStart: { displayName: 'On Start' },
      onResume: { displayName: 'On Resume' },
      onPause: { displayName: 'On Pause' },
      onCountDownFinish: { displayName: 'On Count Down Finish' },
      onReset: { displayName: 'On Reset' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: '',
    },
    definition: {
      validation: {},
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        value: {
          value: '00:00:00:000',
        },
        type: {
          value: 'countUp',
        },
      },
      defaults: [
        {
          type: 'countUp',
          value: '00:00:00:000',
          paramName: 'value',
        },
        {
          type: 'countDown',
          value: '00:00:10:000',
          paramName: 'value',
        },
      ],
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Listview',
    displayName: 'List View',
    description: 'Wrapper for multiple components',
    defaultSize: { width: 20, height: 300 },
    defaultChildren: [
      {
        componentName: 'Image',
        layout: { top: 5, left: 7, height: 100 },
        properties: ['source'],
        accessorKey: 'imageURL',
        others: ['showOnDesktop', 'showOnMobile'],
        defaultValue: { showOnDesktop: '{{true}}', showOnMobile: '{{true}}' },
      },
      {
        componentName: 'Text',
        layout: { top: 50, left: 27, height: 30 },
        properties: ['text'],
        accessorKey: 'text',
        others: ['showOnDesktop', 'showOnMobile'],
        defaultValue: { showOnDesktop: '{{true}}', showOnMobile: '{{true}}' },
      },
      {
        componentName: 'Button',
        layout: { top: 50, left: 60, height: 30 },
        incrementWidth: 2,
        properties: ['text'],
        accessorKey: 'buttonText',
        others: ['showOnDesktop', 'showOnMobile'],
        defaultValue: { showOnDesktop: '{{true}}', showOnMobile: '{{true}}' },
      },
    ],
    component: 'Listview',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      mode: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Mode',
        options: [
          { name: 'List', value: 'list' },
          { name: 'Grid', value: 'grid' },
        ],
        validation: { schema: { type: 'string' } },
      },
      columns: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Columns',
        validation: { schema: { type: 'number' } },
        conditionallyRender: {
          key: 'mode',
          value: 'grid',
        },
      },
      data: {
        type: InspectorElementTypeEnum.code,
        displayName: 'List data',
        validation: {
          schema: { type: 'array', element: { type: 'object' } },
        },
      },
      rowHeight: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Row height',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      showBorder: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Show bottom border',
        validation: { schema: { type: 'boolean' } },
        conditionallyRender: { key: 'mode', value: 'list' },
      },
      enablePagination: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable pagination',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      rowsPerPage: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Rows per page',
        validation: {
          schema: { type: 'number' },
        },
      },
    },
    events: {
      onRowClicked: { displayName: 'Row clicked' },
    },
    styles: {
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      borderColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
    },
    exposedVariables: {
      data: [{}],
    },
    definition: {
      others: { showOnDesktop: { value: '{{true}}' }, showOnMobile: { value: '{{false}}' } },
      properties: {
        mode: { value: 'list' },
        columns: { value: 3 },
        loadingState: { value: '{{false}}' },
        data: {
          value: `{{[
            { imageURL: 'https://www.svgrepo.com/show/34217/image.svg', text: 'Sample text 1', buttonText: 'Button 1' },
            { imageURL: 'https://www.svgrepo.com/show/34217/image.svg', text: 'Sample text 1', buttonText: 'Button 2' },
            { imageURL: 'https://www.svgrepo.com/show/34217/image.svg', text: 'Sample text 1', buttonText: 'Button 3' },
          ]}}`,
        },
        rowHeight: {
          value: '100',
        },
        visible: { value: '{{true}}' },
        showBorder: { value: '{{true}}' },
        rowsPerPage: { value: '{{10}}' },
        enablePagination: { value: '{{false}}' },
      },
      events: [],
      styles: {
        backgroundColor: { value: '#fff' },
        borderColor: { value: '#dadcde' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        borderRadius: { value: '{{0}}' },
      },
    },
  },
  {
    name: 'Tags',
    displayName: 'Tags',
    description: 'Content can be shown as tags',
    component: 'Tags',
    defaultSize: {
      width: 8,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      data: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Tags',
        validation: {
          schema: {
            type: 'array',
            element: {
              type: 'object',
              object: { title: { type: 'string' }, color: { type: 'string' }, textColor: { type: 'string' } },
            },
          },
        },
      },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        data: {
          value:
            "{{ [ \n\t\t{ title: 'success', color: '#2fb344', textColor: '#fff' }, \n\t\t{ title: 'info', color: '#206bc4', textColor: '#fff'  }, \n\t\t{ title: 'warning', color: '#f59f00', textColor: '#fff'  }, \n\t\t{ title: 'danger', color: '#d63939', textColor: '#fff' } ] }}",
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'Pagination',
    displayName: 'Pagination',
    description: 'Pagination ',
    component: 'Pagination',
    defaultSize: {
      width: 10,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      numberOfPages: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Number of pages',
        validation: {
          schema: { type: 'number' },
        },
      },
      defaultPageIndex: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default page index',
        validation: {
          schema: { type: 'number' },
        },
      },
    },
    validation: {},
    events: {
      onPageChange: { displayName: 'On Page Change' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      totalPages: null,
      currentPageIndex: null,
    },
    definition: {
      validation: {},
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        numberOfPages: {
          value: '{{5}}',
        },
        defaultPageIndex: {
          value: '{{1}}',
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'CircularProgressbar',
    displayName: 'Circular Progressbar',
    description: 'Show the progress using circular progressbar',
    component: 'CircularProgressBar',
    defaultSize: {
      width: 7,
      height: 50,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      text: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Text',
        validation: {
          schema: { type: 'string' },
        },
      },
      progress: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Progress',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
    },
    events: {},
    styles: {
      color: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textSize: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Text Size',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      strokeWidth: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Stroke Width',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      counterClockwise: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Counter Clockwise',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      circleRatio: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Circle Ratio',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        text: {
          value: '',
        },
        progress: {
          value: '{{50}}',
        },
      },
      events: [],
      styles: {
        color: { value: '' },
        textColor: { value: '' },
        textSize: { value: '{{16}}' },
        strokeWidth: { value: '{{8}}' },
        counterClockwise: { value: '{{false}}' },
        circleRatio: { value: '{{1}}' },
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'Spinner',
    displayName: 'Spinner',
    description: 'Spinner can be used to display loading status',
    component: 'Spinner',
    defaultSize: {
      width: 4,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {},
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      colour: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Colour',
        validation: {
          schema: { type: 'string' },
        },
      },
      size: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Size',
        options: [
          { name: 'small', value: 'sm' },
          { name: 'large', value: 'lg' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {},
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        size: { value: 'sm' },
        colour: { value: '#0565ff' },
      },
    },
  },
  {
    name: 'Statistics',
    displayName: 'Statistics',
    description: 'Statistics can be used to display different statistical information',
    component: 'Statistics',
    defaultSize: {
      width: 9,
      height: 150,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      primaryValueLabel: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Primary value label',
        validation: { schema: { type: 'string' } },
      },
      primaryValue: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Primary value',
        validation: { schema: { type: 'string' } },
      },
      hideSecondary: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Hide secondary value',
        validation: { schema: { type: 'boolean' } },
      },
      secondaryValueLabel: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Secondary value label',
        validation: { schema: { type: 'string' } },
      },
      secondaryValue: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Secondary value',
        validation: { schema: { type: 'string' } },
      },
      secondarySignDisplay: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Secondary sign display',

        validation: { schema: { type: 'string' } },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading State',
        validation: { schema: { type: 'boolean' } },
      },
    },
    events: {},
    styles: {
      primaryLabelColour: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Primary Label Colour',
        validation: { schema: { type: 'string' } },
      },
      primaryTextColour: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Primary Text  Colour',
        validation: { schema: { type: 'string' } },
      },
      secondaryLabelColour: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Secondary Label Colour',
        validation: { schema: { type: 'string' } },
      },
      secondaryTextColour: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Secondary Text Colour',
        validation: { schema: { type: 'string' } },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } },
      },
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        primaryValueLabel: { value: 'This months earnings' },
        primaryValue: { value: '682.3' },
        secondaryValueLabel: { value: 'Last month' },
        secondaryValue: { value: '2.85' },
        secondarySignDisplay: { value: 'positive' },
        loadingState: { value: `{{false}}` },
      },
      events: [],
      styles: {
        primaryLabelColour: { value: '#8092AB' },
        primaryTextColour: { value: '#000000' },
        secondaryLabelColour: { value: '#8092AB' },
        secondaryTextColour: { value: '#36AF8B' },
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'RangeSlider',
    displayName: 'Range Slider',
    description: 'Can be used to show slider with a range',
    component: 'RangeSlider',
    defaultSize: {
      width: 9,
      height: 30,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      min: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Min',
        validation: {
          schema: { type: 'number' },
        },
      },
      max: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Max',
        validation: {
          schema: { type: 'number' },
        },
      },
      value: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
      enableTwoHandle: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Two handles',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    events: {
      onChange: { displayName: 'On change' },
    },
    styles: {
      lineColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Line color',
        validation: {
          schema: { type: 'string' },
        },
      },
      handleColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Handle color',
        validation: {
          schema: { type: 'string' },
        },
      },
      trackColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Track color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: null,
    },
    definition: {
      others: {
        showOnDesktop: { value: true },
        showOnMobile: { value: false },
      },
      properties: {
        min: {
          value: '{{0}}',
        },
        max: {
          value: '{{100}}',
        },
        value: {
          value: '{{50}}',
        },
        enableTwoHandle: { value: false },
      },
      events: [],
      styles: {
        lineColor: { value: '' },
        handleColor: { value: '' },
        trackColor: { value: '' },
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'Timeline',
    displayName: 'Timeline',
    description: 'Visual representation of a sequence of events',
    component: 'Timeline',
    properties: {
      data: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Timeline data',
        validation: {
          schema: { type: 'array', element: { type: 'object' } },
        },
      },
      hideDate: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Hide Date',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    defaultSize: {
      width: 20,
      height: 270,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } },
      },
    },
    exposedVariables: {
      value: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        data: {
          value:
            "{{ [ \n\t\t{ title: 'Product Launched', subTitle: 'First version of our product released to public', date: '20/10/2021', iconBackgroundColor: '#4d72fa'},\n\t\t { title: 'First Signup', subTitle: 'Congratulations! We got our first signup', date: '22/10/2021', iconBackgroundColor: '#4d72fa'}, \n\t\t { title: 'First Payment', subTitle: 'Hurray! We got our first payment', date: '01/11/2021', iconBackgroundColor: '#4d72fa'} \n] }}",
        },
        hideDate: { value: '{{false}}' },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'SvgImage',
    displayName: 'Svg Image',
    description: 'Svg image',
    component: 'SvgImage',
    properties: {
      data: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Svg  data',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    defaultSize: {
      width: 4,
      height: 50,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        data: {
          value:
            '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /><line x1="14" y1="7" x2="20" y2="7" /><line x1="17" y1="4" x2="17" y2="10" /></svg>',
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'Html',
    displayName: 'HTML Viewer',
    description: 'HTML Viewer',
    component: 'Html',
    defaultSize: {
      width: 10,
      height: 310,
    },
    properties: {
      rawHtml: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Raw HTML',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        rawHtml: {
          value: `<body><main><section class="hero" style="height:306px;display: flex;
          justify-content: center;padding:0 1px;align-items: center;text-align:center">You can build your custom HTML-CSS template here</section></main></body>`,
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'VerticalDivider',
    displayName: 'Vertical Divider',
    description: 'Vertical Separator between components',
    component: 'VerticalDivider',
    defaultSize: {
      width: 2,
      height: 100,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {},
    events: {},
    styles: {
      dividerColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Divider Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      value: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {},
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        dividerColor: { value: '#000000' },
      },
    },
  },
  {
    name: 'CustomComponent',
    displayName: 'Custom Component',
    description: 'Visual representation of a sequence of events',
    component: 'CustomComponent',
    properties: {
      data: { type: InspectorElementTypeEnum.code, displayName: 'Data', validation: { schema: { type: 'object' } } },
      code: { type: InspectorElementTypeEnum.code, displayName: 'Code' },
    },
    defaultSize: {
      width: 20,
      height: 140,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } },
      },
    },
    exposedVariables: {
      data: { value: `{{{ title: 'Hi! There', buttonText: 'Update Title'}}}` },
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        visible: { value: '{{true}}' },
        data: {
          value: `{{{ title: 'Hi! There', buttonText: 'Update Title'}}}`,
        },
        code: {
          value: `import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { Button, Container } from 'https://cdn.skypack.dev/@material-ui/core';
const MyCustomComponent = ({data, updateData, runQuery}) => (
  <Container>
      <h1>{data.title}</h1>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {updateData({title: 'Hello World!!'})}}
      >
        {data.buttonText}
      </Button>
    </Container>
);
const ConnectedComponent = Tooljet.connectComponent(MyCustomComponent);
ReactDOM.render(<ConnectedComponent />, document.body);`,
          skipResolve: true,
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'ButtonGroup',
    displayName: 'Button Group',
    description: 'ButtonGroup',
    component: 'ButtonGroup',
    properties: {
      label: {
        type: InspectorElementTypeEnum.code,
        displayName: 'label',
        validation: {
          schema: { type: 'string' },
        },
      },
      values: {
        type: InspectorElementTypeEnum.code,
        displayName: 'values',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'array', element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } }],
          },
        },
      },
      labels: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Labels',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'array', element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } }],
          },
        },
      },
      defaultSelected: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default selected',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'array', element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } }],
          },
        },
      },
      multiSelection: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Enable multiple selection',

        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    defaultSize: {
      width: 12,
      height: 80,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {
      onClick: { displayName: 'On click' },
    },
    styles: {
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Border radius',
        validation: {
          schema: { type: 'number' },
          defaultValue: false,
        },
      },
      selectedTextColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Selected text colour',
        validation: {
          schema: { type: 'string' },
        },
      },
      selectedBackgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Selected background color',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    exposedVariables: {
      selected: [1],
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        label: { value: `Button group` },
        defaultSelected: { value: '{{[1]}}' },
        values: { value: '{{[1,2,3]}}' },
        labels: { value: '{{[]}}' },
        multiSelection: { value: '{{false}}' },
      },
      events: [],
      styles: {
        backgroundColor: { value: '' },
        textColor: { value: '' },
        visibility: { value: '{{true}}' },
        borderRadius: { value: '{{0}}' },
        disabledState: { value: '{{false}}' },
        selectedTextColor: { value: '' },
        selectedBackgroundColor: { value: '' },
      },
    },
  },
  {
    name: 'PDF',
    displayName: 'PDF',
    description: 'Embed PDF file',
    component: 'PDF',
    properties: {
      url: { type: InspectorElementTypeEnum.code, displayName: 'File URL', validation: { schema: { type: 'string' } } },
      scale: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Scale page to width',
        validation: { schema: { type: 'boolean' } },
      },
      pageControls: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show page controls',
        validation: { schema: { type: 'boolean' } },
      },
      showDownloadOption: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show the Download',
        validation: { schema: { type: 'boolean' } },
      },
      renderTextLayer: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Show text layer',
        validation: { schema: { type: 'boolean' } },
      },
    },
    defaultSize: {
      width: 20,
      height: 640,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {},
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: { schema: { type: 'boolean' } },
      },
    },
    exposedVariables: {},
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        url: {
          value:
            'https://upload.wikimedia.org/wikipedia/commons/e/ee/Guideline_No._GD-Ed-2214_Marman_Clamp_Systems_Design_Guidelines.pdf',
        },
        scale: {
          value: '{{true}}',
        },
        pageControls: {
          value: `{{true}}`,
        },
        showDownloadOption: {
          value: `{{true}}`,
        },
        renderTextLayer: {
          value: `{{false}}`,
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'Steps',
    displayName: 'Steps',
    description: 'Steps',
    component: 'Steps',
    properties: {
      steps: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Steps',
        validation: {
          schema: {
            type: 'array',
            element: { type: 'object', object: { id: { type: 'number' } } },
          },
        },
      },
      currentStep: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Current step',
        validation: {
          schema: { type: 'number' },
        },
      },
      stepsSelectable: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Steps selectable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    defaultSize: {
      width: 22,
      height: 40,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {
      onSelect: { displayName: 'On select' },
    },
    styles: {
      color: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text color',
        validation: {
          schema: { type: 'string' },
        },
      },
      theme: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Theme',
        options: [
          { name: 'titles', value: 'titles' },
          { name: 'numbers', value: 'numbers' },
          { name: 'plain', value: 'plain' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      currentStepId: '3',
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        steps: {
          value: `{{ [{ name: 'step 1', tooltip: 'some tooltip', id: 1},{ name: 'step 2', tooltip: 'some tooltip', id: 2},{ name: 'step 3', tooltip: 'some tooltip', id: 3},{ name: 'step 4', tooltip: 'some tooltip', id: 4},{ name: 'step 5', tooltip: 'some tooltip', id: 5}]}}`,
        },
        currentStep: { value: '{{3}}' },
        stepsSelectable: { value: true },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        theme: { value: 'titles' },
        color: { value: '' },
        textColor: { value: '' },
      },
    },
  },
  {
    name: 'KanbanBoard',
    displayName: 'Kanban Board',
    description: 'Kanban Board',
    component: 'KanbanBoard',
    defaultSize: {
      width: 40,
      height: 490,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      columns: { type: InspectorElementTypeEnum.code, displayName: 'Columns' },
      cardData: { type: InspectorElementTypeEnum.code, displayName: 'Card Data' },
      enableAddCard: { type: InspectorElementTypeEnum.toggle, displayName: 'Enable Add Card' },
    },
    events: {
      onCardAdded: { displayName: 'Card added' },
      onCardRemoved: { displayName: 'Card removed' },
      onCardMoved: { displayName: 'Card moved' },
      onCardSelected: { displayName: 'Card selected' },
      onCardUpdated: { displayName: 'Card updated' },
    },
    styles: {
      disabledState: { type: InspectorElementTypeEnum.toggle, displayName: 'Disable' },
      visibility: { type: InspectorElementTypeEnum.toggle, displayName: 'Visibility' },
      width: { type: InspectorElementTypeEnum.number, displayName: 'Width' },
      minWidth: { type: InspectorElementTypeEnum.number, displayName: 'Min Width' },
      accentColor: { type: InspectorElementTypeEnum.color, displayName: 'Accent color' },
    },
    exposedVariables: {
      columns: {},
      lastAddedCard: {},
      lastRemovedCard: {},
      lastCardMovement: {},
      lastUpdatedCard: {},
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        columns: {
          value: '{{[{ "id": "1", "title": "to do" },{ "id": "2", "title": "in progress" }]}}',
        },
        cardData: {
          value:
            '{{[{ id: "01", title: "one", columnId: "1" },{ id: "02", title: "two", columnId: "1" },{ id: "03", title: "three", columnId: "2" }]}}',
        },
        enableAddCard: {
          value: `{{true}}`,
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        width: { value: '{{400}}' },
        minWidth: { value: '{{200}}' },
        textColor: { value: '' },
      },
    },
  },
  {
    name: 'Kanban',
    displayName: 'Kanban',
    description: 'Kanban',
    component: 'Kanban',
    defaultSize: {
      width: 40,
      height: 490,
    },
    defaultChildren: [
      {
        componentName: 'Text',
        layout: {
          top: 20,
          left: 4,
          height: 30,
        },
        properties: ['text'],
        accessorKey: 'text',
        styles: ['fontWeight', 'textSize', 'textColor'],
        defaultValue: {
          text: '{{cardData.title}}',
          fontWeight: 'bold',
          textSize: 16,
          textColor: '#000',
        },
      },
      {
        componentName: 'Text',
        layout: {
          top: 50,
          left: 4,
          height: 30,
        },
        properties: ['text'],
        accessorKey: 'text',
        styles: ['textSize', 'textColor'],
        defaultValue: {
          text: '{{cardData.description}}',
          textSize: 14,
          textColor: '#000',
        },
      },
    ],
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      columnData: { type: InspectorElementTypeEnum.code, displayName: 'Column Data' },
      cardData: { type: InspectorElementTypeEnum.code, displayName: 'Card Data' },
      cardWidth: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Card Width',
        validation: {
          schema: { type: 'number' },
        },
      },
      cardHeight: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Card Height',
        validation: {
          schema: { type: 'number' },
        },
      },
      enableAddCard: { type: InspectorElementTypeEnum.toggle, displayName: 'Enable Add Card' },
      showDeleteButton: { type: InspectorElementTypeEnum.toggle, displayName: 'Show Delete Button' },
    },
    events: {
      onUpdate: { displayName: 'On update' },
      onAddCardClick: { displayName: 'On add card click' },
      onCardRemoved: { displayName: 'Card removed' },
      onCardAdded: { displayName: 'Card added' },
      onCardMoved: { displayName: 'Card moved' },
      onCardSelected: { displayName: 'Card selected' },
    },
    styles: {
      disabledState: { type: InspectorElementTypeEnum.toggle, displayName: 'Disable' },
      visibility: { type: InspectorElementTypeEnum.toggle, displayName: 'Visibility' },
      accentColor: { type: InspectorElementTypeEnum.color, displayName: 'Accent color' },
    },
    actions: [
      {
        handle: 'addCard',
        displayName: 'Add Card',
        params: [
          {
            handle: 'cardDetails',
            displayName: 'Card Details',
            defaultValue: `{{{ id: "c11", title: "Title 11", description: "Description 11", columnId: "r3" }}}`,
          },
        ],
      },
      {
        handle: 'deleteCard',
        displayName: 'Delete Card',
        params: [
          { handle: 'id', displayName: 'Card Id', defaultValue: `{{components.kanban1?.lastSelectedCard?.id}}` },
        ],
      },
      {
        handle: 'moveCard',
        displayName: 'Move Card',
        params: [
          { handle: 'cardId', displayName: 'Card Id', defaultValue: `{{components.kanban1?.lastSelectedCard?.id}}` },
          { handle: 'columnId', displayName: 'Destination Column Id', defaultValue: '' },
        ],
      },
      {
        handle: 'updateCardData',
        displayName: 'Update Card Data',
        params: [
          { handle: 'id', displayName: 'Card Id', defaultValue: `{{components.kanban1?.lastSelectedCard?.id}}` },
          {
            handle: 'value',
            displayName: 'Value',
            defaultValue: `{{{...components.kanban1?.lastSelectedCard, title: 'New Title'}}}`,
          },
        ],
      },
    ],
    exposedVariables: {
      updatedCardData: {},
      lastAddedCard: {},
      lastRemovedCard: {},
      lastCardMovement: {},
      lastSelectedCard: {},
      lastUpdatedCard: {},
      lastCardUpdate: [],
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        columnData: {
          value:
            '{{[{ "id": "r1", "title": "To Do" },{ "id": "r2", "title": "In Progress" },{ "id": "r3", "title": "Done" }]}}',
        },
        cardData: {
          value:
            '{{[{ id: "c1", title: "Title 1", description: "Description 1", columnId: "r1" },{ id: "c2", title: "Title 2", description: "Description 2", columnId: "r1" },{ id: "c3", title: "Title 3", description: "Description 3",columnId: "r2" },{ id: "c4", title: "Title 4", description: "Description 4",columnId: "r3" },{ id: "c5", title: "Title 5", description: "Description 5",columnId: "r3" }, { id: "c6", title: "Title 6", description: "Description 6", columnId: "r1" },{ id: "c7", title: "Title 7", description: "Description 7", columnId: "r1" },{ id: "c8", title: "Title 8", description: "Description 8",columnId: "r2" },{ id: "c9", title: "Title 9", description: "Description 9",columnId: "r3" },{ id: "c10", title: "Title 10", description: "Description 10",columnId: "r3" }]}}',
        },
        cardWidth: {
          value: '{{302}}',
        },
        cardHeight: {
          value: '{{100}}',
        },
        enableAddCard: {
          value: `{{true}}`,
        },
        showDeleteButton: {
          value: `{{true}}`,
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
        accentColor: { value: '#4d72fa' },
      },
    },
  },
  {
    name: 'ColorPicker',
    displayName: 'Color Picker',
    description: 'Color Picker Palette',
    component: 'ColorPicker',
    properties: {
      defaultColor: { type: InspectorElementTypeEnum.color, displayName: 'Default Color' },
    },
    defaultSize: {
      width: 9,
      height: 40,
    },
    actions: [
      {
        displayName: 'Set Color',
        handle: 'setColor',
        params: [
          { handle: 'color', displayName: 'color', defaultValue: '#ffffff', type: InspectorElementTypeEnum.color },
        ],
      },
    ],
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    events: {
      onChange: { displayName: 'On change' },
    },
    styles: {
      visibility: { type: InspectorElementTypeEnum.toggle, displayName: 'Visibility' },
    },
    exposedVariables: {
      selectedColorHex: '#000000',
      selectedColorRGB: 'rgb(0,0,0)',
      selectedColorRGBA: 'rgba(0, 0, 0, 1)',
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        defaultColor: {
          value: '#000000',
        },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'TreeSelect',
    displayName: 'Tree Select',
    description: 'Select values from a tree view',
    defaultSize: {
      width: 12,
      height: 200,
    },
    component: 'TreeSelect',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      label: { type: InspectorElementTypeEnum.code, displayName: 'Title' },
      data: { type: InspectorElementTypeEnum.code, displayName: 'Structure' },
      checkedData: { type: InspectorElementTypeEnum.code, displayName: 'Checked Values' },
      expandedData: { type: InspectorElementTypeEnum.code, displayName: 'Expanded Values' },
    },
    events: {
      onChange: { displayName: 'On change' },
      onCheck: { displayName: 'On check' },
      onUnCheck: { displayName: 'On uncheck' },
    },
    styles: {
      textColor: { type: InspectorElementTypeEnum.color, displayName: 'Text Color' },
      checkboxColor: { type: InspectorElementTypeEnum.color, displayName: 'Checkbox Color' },
      visibility: { type: InspectorElementTypeEnum.toggle, displayName: 'Visibility' },
      disabledState: { type: InspectorElementTypeEnum.toggle, displayName: 'Disable' },
    },
    exposedVariables: {
      checked: ['asia', 'china', 'beijing', 'shanghai', 'japan', 'india', 'delhi', 'mumbai', 'bengaluru'],
      expanded: ['asia'],
      checkedPathArray: [
        ['asia'],
        ['asia', 'china'],
        ['asia', 'china', 'beijing'],
        ['asia', 'china', 'shanghai'],
        ['asia', 'japan'],
        ['asia', 'india'],
        ['asia', 'india', 'delhi'],
        ['asia', 'india', 'mumbai'],
        ['asia', 'india', 'bengaluru'],
      ],
      checkedPathStrings: [
        'asia',
        'asia-china',
        'asia-china-beijing',
        'asia-china-shanghai',
        'asia-japan',
        'asia-india',
        'asia-india-delhi',
        'asia-india-mumbai',
        'asia-india-bengaluru',
      ],
    },
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        label: { value: 'Countries' },
        data: {
          value:
            '{{[{"label":"Asia","value":"asia","children":[{"label":"China","value":"china","children":[{"label":"Beijing","value":"beijing"},{"label":"Shanghai","value":"shanghai"}]},{"label":"Japan","value":"japan"},{"label":"India","value":"india","children":[{"label":"Delhi","value":"delhi"},{"label":"Mumbai","value":"mumbai"},{"label":"Bengaluru","value":"bengaluru"}]}]},{"label":"Europe","value":"europe","children":[{"label":"France","value":"france"},{"label":"Spain","value":"spain"},{"label":"England","value":"england"}]},{"label":"Africa","value":"africa"}]}}',
        },
        checkedData: { value: '{{["asia"]}}' },
        expandedData: { value: '{{["asia"]}}' },
      },
      events: [],
      styles: {
        textColor: { value: '' },
        checkboxColor: { value: '' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'Link',
    displayName: 'Link',
    description: 'Add link to the text',
    defaultSize: {
      width: 6,
      height: 30,
    },
    component: 'Link',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      linkTarget: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Link Target',
        validation: {
          schema: { type: 'string' },
        },
      },
      linkText: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Link Text',
        validation: {
          schema: { type: 'string' },
        },
      },
      targetType: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Target Type',
        options: [
          { name: 'New Tab', value: 'new' },
          { name: 'Same Tab', value: 'same' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    events: {
      onClick: { displayName: 'On click' },
      onHover: { displayName: 'On hover' },
    },
    styles: {
      textColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Text Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      textSize: {
        type: InspectorElementTypeEnum.number,
        displayName: 'Text Size',
        validation: {
          schema: { type: 'number' },
        },
      },
      textAlign: {
        type: InspectorElementTypeEnum.alignButtons,
        displayName: 'Align Text',
        validation: { schema: { type: 'string' } },
      },
      underline: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Underline',
        options: [
          { name: 'Never', value: 'no-underline' },
          { name: 'On Hover', value: 'on-hover' },
          { name: 'Always', value: 'underline' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {},
    actions: [
      {
        handle: 'click',
        displayName: 'Click',
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        linkTarget: { value: 'https://dev.to/' },
        linkText: { value: 'Click here' },
        targetType: { value: 'new' },
      },
      events: [],
      styles: {
        textColor: { value: '#375FCF' },
        textSize: { value: 14 },
        underline: { value: 'on-hover' },
        visibility: { value: '{{true}}' },
        textAlign: { value: 'left' },
      },
    },
  },
  {
    name: 'Icon',
    displayName: 'Icon',
    description: 'Icon',
    defaultSize: {
      width: 5,
      height: 50,
    },
    component: 'Icon',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      icon: {
        type: InspectorElementTypeEnum.iconPicker,
        displayName: 'Icon',
        validation: {
          schema: { type: 'string' },
        },
      },
    },
    events: {
      onClick: { displayName: 'On click' },
      onHover: { displayName: 'On hover' },
    },
    styles: {
      iconColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Icon Color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {},
    actions: [
      {
        handle: 'click',
        displayName: 'Click',
      },
      {
        displayName: 'Set Visibility',
        handle: 'setVisibility',
        params: [
          { handle: 'value', displayName: 'Value', defaultValue: '{{true}}', type: InspectorElementTypeEnum.toggle },
        ],
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        icon: { value: 'IconHome2' },
      },
      events: [],
      styles: {
        iconColor: { value: '#000' },
        visibility: { value: '{{true}}' },
      },
    },
  },
  {
    name: 'Form',
    displayName: 'Form',
    description: 'Wrapper for multiple components',
    defaultSize: {
      width: 13,
      height: 330,
    },
    defaultChildren: [
      {
        componentName: 'Text',
        layout: {
          top: 40,
          left: 10,
          height: 30,
          width: 17,
        },
        properties: ['text'],
        styles: ['fontWeight', 'textSize', 'textColor'],
        defaultValue: {
          text: 'User Details',
          fontWeight: 'bold',
          textSize: 20,
          textColor: '#000',
        },
      },
      {
        componentName: 'Text',
        layout: {
          top: 90,
          left: 10,
          height: 30,
        },
        properties: ['text'],
        defaultValue: {
          text: 'Name',
        },
      },
      {
        componentName: 'Text',
        layout: {
          top: 160,
          left: 10,
          height: 30,
        },
        properties: ['text'],
        defaultValue: {
          text: 'Age',
        },
      },
      {
        componentName: 'TextInput',
        layout: {
          top: 120,
          left: 10,
          height: 30,
          width: 25,
        },
        properties: ['placeholder'],
        defaultValue: {
          placeholder: 'Enter your name',
        },
      },
      {
        componentName: 'NumberInput',
        layout: {
          top: 190,
          left: 10,
          height: 30,
          width: 25,
        },
        properties: ['value'],
        styles: ['borderColor'],
        defaultValue: {
          value: 24,
          borderColor: '#dadcde',
        },
      },
      {
        componentName: 'Button',
        layout: {
          top: 240,
          left: 10,
          height: 30,
          width: 10,
        },
        properties: ['text'],
        defaultValue: {
          text: 'Submit',
        },
      },
    ],
    component: 'Form',
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      buttonToSubmit: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Button To Submit Form',
        options: [{ name: 'None', value: 'none' }],
        validation: {
          schema: { type: 'string' },
        },
        conditionallyRender: {
          key: 'advanced',
          value: false,
        },
      },
      loadingState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Loading state',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      advanced: {
        type: InspectorElementTypeEnum.toggle,
        displayName: ' Use custom schema',
      },
      JSONSchema: {
        type: InspectorElementTypeEnum.code,
        displayName: 'JSON Schema',
        conditionallyRender: {
          key: 'advanced',
          value: true,
        },
      },
    },
    events: {
      onSubmit: { displayName: 'On submit' },
      onInvalid: { displayName: 'On invalid' },
    },
    styles: {
      backgroundColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Background color',
        validation: {
          schema: { type: 'string' },
        },
      },
      borderRadius: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Border Radius',
        validation: {
          schema: {
            type: 'union',
            schemas: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
      borderColor: {
        type: InspectorElementTypeEnum.color,
        displayName: 'Border color',
        validation: {
          schema: { type: 'string' },
        },
      },
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
        },
      },
    },
    exposedVariables: {
      data: {},
      isValid: true,
    },
    actions: [
      {
        handle: 'submitForm',
        displayName: 'Submit Form',
      },
      {
        handle: 'resetForm',
        displayName: 'Reset Form',
      },
    ],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        loadingState: { value: '{{false}}' },
        advanced: { value: '{{false}}' },
        JSONSchema: {
          value:
            "{{ {title: 'User registration form', properties: {firstname: {type: 'textinput',value: 'Maria',label:'First name', validation:{maxLength:6}, styles: {backgroundColor: '#f6f5ff',textColor: 'black'},},lastname:{type: 'textinput',value: 'Doe', label:'Last name', styles: {backgroundColor: '#f6f5ff',textColor: 'black'},},age:{type:'number'},}, submitButton: {value: 'Submit', styles: {backgroundColor: '#3a433b',borderColor:'#595959'}}} }}",
        },
      },
      events: [],
      styles: {
        backgroundColor: { value: '#fff' },
        borderRadius: { value: '0' },
        borderColor: { value: '#fff' },
        visibility: { value: '{{true}}' },
        disabledState: { value: '{{false}}' },
      },
    },
  },
  {
    name: 'BoundedBox',
    displayName: 'Bounded Box',
    description: 'An infinitely customizable image annotation widget',
    component: 'BoundedBox',
    defaultSize: {
      width: 30,
      height: 420,
    },
    others: {
      resizer: { type: InspectorElementTypeEnum.resizer, displayName: 'Size' },
      positioner: { type: InspectorElementTypeEnum.positioner, displayName: 'Position' },
      showOnDesktop: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on desktop' },
      showOnMobile: { type: InspectorElementTypeEnum.toggle, displayName: 'Show on mobile' },
    },
    properties: {
      imageUrl: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Image Url',
        validation: {
          schema: { type: 'string' },
        },
      },

      defaultValue: {
        type: InspectorElementTypeEnum.code,
        displayName: 'Default value',
        validation: {
          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'array', element: { type: 'object' } }] },
        },
      },
      selector: {
        type: InspectorElementTypeEnum.select,
        displayName: 'Selector',
        options: [
          { name: 'Rectangle', value: 'RECTANGLE' },
          { name: 'Point', value: 'POINT' },
        ],
        validation: {
          schema: { type: 'string' },
        },
      },
      labels: {
        type: InspectorElementTypeEnum.code,
        displayName: 'List of labels',
        validation: {
          schema: { type: 'array' },
          element: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
        },
      },
    },
    events: {
      onChange: { displayName: 'On change' },
    },
    styles: {
      visibility: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Visibility',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false,
        },
      },
      disabledState: {
        type: InspectorElementTypeEnum.toggle,
        displayName: 'Disable',
        validation: {
          schema: { type: 'boolean' },
          defaultValue: false,
        },
      },
    },
    exposedVariables: {
      annotations: [
        {
          type: 'RECTANGLE',
          x: 41,
          y: 62,
          width: 40,
          height: 24,
          text: 'Car',
          id: 'ce103db2-b2a6-46f5-a4f0-5f4eaa6f3663',
        },
        {
          type: 'RECTANGLE',
          x: 41,
          y: 12,
          width: 40,
          height: 24,
          text: 'Tree',
          id: 'b1a7315e-2b15-4bc8-a1c6-a042dab44f27',
        },
      ],
    },
    actions: [],
    definition: {
      others: {
        showOnDesktop: { value: '{{true}}' },
        showOnMobile: { value: '{{false}}' },
      },
      properties: {
        defaultValue: {
          value:
            "{{[\t{type: 'RECTANGLE',width: 40,height:24, x:41,y:62,text:'Car'},{type: 'RECTANGLE',width: 40,height:24, x:41,y:12,text:'Tree'}\t]}}",
        },
        imageUrl: {
          value: `https://burst.shopifycdn.com/photos/three-cars-are-parked-on-stone-paved-street.jpg?width=746&format=pjpg&exif=1&iptc=1`,
        },
        selector: { value: `RECTANGLE` },
        labels: { value: `{{['Tree', 'Car', 'Stree light']}}` },
      },
      events: [],
      styles: {
        visibility: { value: '{{true}}' },

        disabledState: { value: '{{false}}' },
      },
    },
  },
];
