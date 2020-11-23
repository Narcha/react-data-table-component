import { Alignment, Direction, Media } from './constants';
import { CSSObject } from 'styled-components';

export type ChangePage = (page: number, totalRows: number) => void;
export type ChangeRowsPerPage = (currentRowsPerPage: number, currentPage: number) => void;
export type ColumnSortFunction<T = Row> = (a: T, b: T) => number;
export type DefaultSortField = string | number | null | undefined;
export type ExpandRowToggled<T = Row> = (expanded: boolean, row: T) => void;
export type Format<T = Row> = (row: T, rowIndex: number) => React.ReactNode;
export type KeyField = string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row<T = Record<string, any>> = T;
export type RowClicked<T = Row> = (row: T, e: React.MouseEvent) => void;
export type RowState<T = Row> = ((row: T) => boolean) | null;
export type Selector<T = Row> = string | ((row: T, rowIndex: number) => React.ReactNode);
export type SortDirection = 'asc' | 'desc';
export type SortFunction<T = Row> = (rows: T[], field: string, sortDirection: 'asc' | 'desc') => T[];

export interface DataTableProps<T = Row> {
	actions?: React.ReactNode | React.ReactNode[];
	className?: string;
	clearSelectedRows?: boolean;
	columns: DataTableColumn<T>[];
	conditionalRowStyles?: ConditionalStyles<T>[];
	contextActions?: React.ReactNode | React.ReactNode[];
	contextComponent?: React.ReactElement;
	contextMessage?: ContextMessage;
	customStyles?: DataTableStyles;
	data: T[];
	defaultSortAsc?: boolean;
	defaultSortFieldId?: DefaultSortField;
	dense?: boolean;
	direction?: Direction;
	disabled?: boolean;
	expandableIcon?: ExpandableIcon;
	expandableInheritConditionalStyles?: boolean;
	expandableRowDisabled?: RowState<T>;
	expandableRowExpanded?: RowState<T>;
	expandableRows?: boolean;
	expandableRowsComponent?: React.ReactElement;
	expandableRowsHideExpander?: boolean;
	expandOnRowClicked?: boolean;
	expandOnRowDoubleClicked?: boolean;
	fixedHeader?: boolean;
	fixedHeaderScrollHeight?: string;
	highlightOnHover?: boolean;
	keyField?: KeyField;
	noContextMenu?: boolean;
	noDataComponent?: React.ReactNode;
	noHeader?: boolean;
	noTableHead?: boolean;
	offset?: string;
	onChangePage?: ChangePage;
	onChangeRowsPerPage?: ChangeRowsPerPage;
	onRowClicked?: (row: T, e: React.MouseEvent) => void;
	onRowDoubleClicked?: (row: T, e: React.MouseEvent) => void;
	onRowExpandToggled?: ExpandRowToggled<T>;
	onSelectedRowsChange?: (selectedRowState: { allSelected: boolean; selectedCount: number; selectedRows: T[] }) => void;
	onSort?: (column: DataTableColumn<T>, sortDirection: 'asc' | 'desc') => void;
	overflowY?: boolean;
	overflowYOffset?: string;
	pagination?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	paginationComponent?: React.ComponentType<any>;
	paginationComponentOptions?: DataTablePaginationOptions;
	paginationDefaultPage?: number;
	paginationIconFirstPage?: React.ReactNode;
	paginationIconLastPage?: React.ReactNode;
	paginationIconNext?: React.ReactNode;
	paginationIconPrevious?: React.ReactNode;
	paginationPerPage?: number;
	paginationResetDefaultPage?: boolean;
	paginationRowsPerPageOptions?: number[];
	paginationServer?: boolean;
	paginationServerOptions?: PaginationServerOptions;
	paginationTotalRows?: number;
	persistTableHead?: boolean;
	pointerOnHover?: boolean;
	progressComponent?: React.ReactNode;
	progressPending?: boolean;
	responsive?: boolean;
	selectableRowDisabled?: RowState<T>;
	selectableRows?: boolean;
	selectableRowsComponent?: React.ReactElement;
	selectableRowsComponentProps?: Record<string, unknown>;
	selectableRowSelected?: RowState<T>;
	selectableRowsHighlight?: boolean;
	selectableRowsNoSelectAll?: boolean;
	selectableRowsVisibleOnly?: boolean;
	sortFunction?: SortFunction<T>;
	sortIcon?: React.ReactNode;
	sortServer?: boolean;
	striped?: boolean;
	style?: CSSObject;
	subHeader?: React.ReactNode | React.ReactNode[];
	subHeaderAlign?: Alignment;
	subHeaderComponent?: React.ReactNode | React.ReactNode[];
	subHeaderWrap?: boolean;
	theme?: Themes;
	title?: string | React.ReactNode;
}

export interface ConditionalStyles<T = Row> {
	when: (row: T) => boolean;
	style?: CSSObject | ((row: T) => CSSObject);
}

export interface DataTableColumn<T = Row> {
	allowOverflow?: boolean;
	button?: boolean;
	cell?: (row: T, rowIndex: number, column: DataTableColumn, id: string | number) => React.ReactNode;
	center?: boolean;
	compact?: boolean;
	conditionalCellStyles?: ConditionalStyles<T>[];
	format?: Format<T> | undefined;
	grow?: number;
	hide?: number | ((value: number) => CSSObject) | Media;
	id?: string | number;
	ignoreRowClick?: boolean;
	maxWidth?: string;
	minWidth?: string;
	name: string | number | React.ReactNode;
	omit?: boolean;
	right?: boolean;
	selector?: Selector<T>;
	sortable?: boolean;
	sortFunction?: ColumnSortFunction<T>;
	style?: CSSObject;
	width?: string;
	wrap?: boolean;
}

export interface DataTableStyles {
	table?: {
		style: CSSObject;
	};
	tableWrapper?: {
		style: CSSObject;
	};
	header?: {
		style: CSSObject;
	};
	subHeader?: {
		style: CSSObject;
	};
	head?: {
		style: CSSObject;
	};
	headRow?: {
		style?: CSSObject;
		denseStyle?: CSSObject;
	};
	headCells?: {
		style?: CSSObject;
		activeSortStyle?: CSSObject;
		inactiveSortStyle?: CSSObject;
	};
	contextMenu?: {
		style?: CSSObject;
		activeStyle?: CSSObject;
	};
	cells?: {
		style: CSSObject;
	};
	rows?: {
		style?: CSSObject;
		selectedHighlightStyle?: CSSObject;
		denseStyle?: CSSObject;
		highlightOnHoverStyle?: CSSObject;
		stripedStyle?: CSSObject;
	};
	expanderRow?: {
		style: CSSObject;
	};
	expanderCell?: {
		style: CSSObject;
	};
	expanderButton?: {
		style: CSSObject;
	};
	pagination?: {
		style?: CSSObject;
		pageButtonsStyle?: CSSObject;
	};
	noData?: {
		style: CSSObject;
	};
	progress?: {
		style: CSSObject;
	};
}

export interface ConditionalStyles<T = Row> {
	when: (row: T) => boolean;
	style?: CSSObject | ((row: T) => CSSObject);
}

export interface DataTablePaginationOptions {
	noRowsPerPage?: boolean;
	rowsPerPageText?: string;
	rangeSeparatorText?: string;
	selectAllRowsItem?: boolean;
	selectAllRowsItemText?: string;
}

export interface ExpandableIcon {
	collapsed: React.ReactNode;
	expanded: React.ReactNode;
}

export interface ContextMessage {
	singular: string;
	plural: string;
	message?: string;
}

export interface PaginationServerOptions {
	persistSelectedOnSort?: boolean;
	persistSelectedOnPageChange?: boolean;
}

type ThemeText = {
	primary: string;
	secondary: string;
	disabled: string;
};

type ThemeBackground = {
	default: string;
};

type ThemeContext = {
	background: string;
	text: string;
};

type ThemeDivider = {
	default: string;
};

type ThemeButton = {
	default: string;
	focus: string;
	hover: string;
	disabled: string;
};

type ThemeSortFocus = {
	default: string;
};

type ThemeSelected = {
	default: string;
	text: string;
};

type ThemeHighlightOnHover = {
	default: string;
	text: string;
};

type ThemeStriped = {
	default: string;
	text: string;
};

export interface ThemeCustom {
	text?: ThemeText;
	background?: ThemeBackground;
	context?: ThemeContext;
	divider?: ThemeDivider;
	button?: ThemeButton;
	sortFocus?: ThemeSortFocus;
	selected?: ThemeSelected;
	highlightOnHover?: ThemeHighlightOnHover;
	striped?: ThemeStriped;
}

export type Themes = 'default' | 'dark' | string | undefined;

export interface Theme {
	text: ThemeText;
	background: ThemeBackground;
	context: ThemeContext;
	divider: ThemeDivider;
	button: ThemeButton;
	sortFocus: ThemeSortFocus;
	selected: ThemeSelected;
	highlightOnHover: ThemeHighlightOnHover;
	striped: ThemeStriped;
}

export type IDefaultThemes = {
	default: Theme;
	dark: Theme;
};

export type DataTableState<T = Row> = {
	allSelected: boolean;
	contextMessage: ContextMessage;
	rows: T[];
	selectedCount: number;
	selectedRows: T[];
	selectedColumn: DataTableColumn;
	sortDirection: SortDirection;
	currentPage: number;
	rowsPerPage: number;
	selectedRowsFlag: boolean;
};

export interface AllRowsAction<T = Row> {
	type: 'SELECT_ALL_ROWS';
	keyField: KeyField;
	rows: T[];
	rowCount: number;
	mergeSelections: boolean;
}

export interface SingleRowAction<T = Row> {
	type: 'SELECT_SINGLE_ROW';
	keyField: KeyField;
	row: T;
	isSelected: boolean;
	rowCount: number;
}

export interface MultiRowAction<T = Row> {
	type: 'SELECT_MULTIPLE_ROWS';
	keyField: KeyField;
	selectedRows: T[];
	rows: T[];
	mergeSelections: boolean;
}

export interface SortAction<T = Row> {
	type: 'SORT_CHANGE';
	rows: T[];
	sortDirection: SortDirection;
	sortServer: boolean;
	selectedColumn: DataTableColumn;
	pagination: boolean;
	paginationServer: boolean;
	visibleOnly: boolean;
	persistSelectedOnSort: boolean;
}

export interface PaginationPageAction {
	type: 'CHANGE_PAGE';
	page: number;
	paginationServer: boolean;
	visibleOnly: boolean;
	persistSelectedOnPageChange: boolean;
}

export interface PaginationRowsPerPageAction {
	type: 'CHANGE_ROWS_PER_PAGE';
	rowsPerPage: number;
	page: number;
}

export interface ClearSelectedRowsAction {
	type: 'CLEAR_SELECTED_ROWS';
	selectedRowsFlag: boolean;
}

export interface RowsAction<T = Row> {
	type: 'UPDATE_ROWS';
	rows: T[];
}

export type Action =
	| AllRowsAction
	| SingleRowAction
	| MultiRowAction
	| SortAction
	| PaginationPageAction
	| PaginationRowsPerPageAction
	| ClearSelectedRowsAction
	| RowsAction
	| { type: '' };

// export function createTheme<T = any>(name: string, customTheme: T): Theme;
// export const defaultThemes: IDefaultThemes;

// export default function DataTable<T = any>(props: IDataTableProps<T>): React.ReactElement;
