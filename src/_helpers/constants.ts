export const USER_COLORS = [
  '#1a1c2c',
  '#5d275d',
  '#b13e53',
  '#ef7d57',
  '#ffcd75',
  '#a7f070',
  '#38b764',
  '#257179',
  '#29366f',
  '#3b5dc9',
  '#41a6f6',
  '#73eff7',
  '#94b0c2',
  '#566c86',
  '#333c57',
];

export const ON_BOARDING_SIZE = ['1-10', '11-50', '51-100', '101-500', '501-1000', '1000+'];

export const ON_BOARDING_ROLES = [
  'Head of engineering',
  'Head of product',
  'CIO/CTO',
  'Software engineer',
  'Data scientist',
  'Product manager',
  'Other',
];

export const urlRegExp = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
export const timerFormatRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]:[0-9]{3}$/;
export const timerFormat = 'HH:mm:ss:SSS';
export const taskCheckDelay = 1000;

export const canvasRowHeightInPixels = 10;
export const menuWidthInPixels = 200;
export const canvasColumnAmount = 43;
export const onePercentOfCanvasColumnAmount = canvasColumnAmount / 100;

export const simpleEventNames = [
  'onDetect',
  'onCheck',
  'onUnCheck',
  'onBoundsChange',
  'onCreateMarker',
  'onMarkerClick',
  'onPageChanged',
  'onSearch',
  'onChange',
  'onEnterPressed',
  'onSelectionChange',
  'onSelect',
  'onClick',
  'onHover',
  'onFileSelected',
  'onFileLoaded',
  'onFileDeselected',
  'onStart',
  'onInject',
  'onResume',
  'onReset',
  'onPause',
  'onCountDownFinish',
  'onCalendarNavigate',
  'onCalendarViewChange',
  'onSearchTextChanged',
  'onPageChange',
  'onAddCardClick',
  'onCardAdded',
  'onCardRemoved',
  'onCardMoved',
  'onCardSelected',
  'onCardUpdated',
  'onUpdate',
  'onTabSwitch',
  'onCategorySwitch',
  'onRedirectToInnerPage',
  'onWidgetInit',
  'onFocus',
  'onBlur',
  'onOpen',
  'onClose',
  'onRowClicked',
  'onCancelChanges',
  'onSort',
  'onCellValueChanged',
  'onFilterChanged',
  'onRowHovered',
  'onSubmit',
  'onInvalid',
  'onNewRowsAdded',
] as const;

export const allEventNames = [
  ...simpleEventNames,
  'onPageLoad',
  'onTrigger',
  'onCalendarEventSelect',
  'onCalendarSlotSelect',
  'onTableActionButtonClicked',
  'OnTableToggleCellChanged',
  'onBulkUpdate',
  'onDataQuerySuccess',
  'onDataQueryFailure',
] as const;
