import * as React from 'react';
import styled, { css, CSSObject } from 'styled-components';
import TableCell from './TableCell';
import TableCellCheckbox from './TableCellCheckbox';
import TableCellExpander from './TableCellExpander';
import ExpanderRow from './ExpanderRow';
import { getConditionalStyle, isOdd } from './util';
import { STOP_PROP_TAG } from './constants';
import {
	ConditionalStyles,
	DataTableColumn,
	ExpandableIcon,
	ExpandRowToggled,
	RowClicked,
	RowState,
	SingleRowAction,
} from './types';

const highlightCSS = css<{
	highlightOnHover?: boolean;
}>`
	&:hover {
		${({ highlightOnHover, theme }) => highlightOnHover && theme.rows.highlightOnHoverStyle};
	}
`;

const pointerCSS = css`
	&:hover {
		cursor: pointer;
	}
`;

const TableRowStyle = styled.div<{
	dense?: boolean;
	extendedRowStyle?: CSSObject;
	highlightOnHover?: boolean;
	pointerOnHover?: boolean;
	selected?: boolean;
	striped?: boolean;
}>`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({ theme }) => theme.rows.style};
	${({ dense, theme }) => dense && theme.rows.denseStyle};
	${({ striped, theme }) => striped && theme.rows.stripedStyle};
	${({ highlightOnHover }) => highlightOnHover && highlightCSS};
	${({ pointerOnHover }) => pointerOnHover && pointerCSS};
	${({ selected, theme }) => selected && theme.rows.selectedHighlightStyle};
	${({ extendedRowStyle }) => extendedRowStyle};
`;

type TableRowProps = {
	columns: DataTableColumn[];
	conditionalRowStyles: ConditionalStyles[];
	defaultExpanded?: boolean;
	defaultExpanderDisabled: boolean;
	dense: boolean;
	expandableIcon: ExpandableIcon;
	expandableRows: boolean;
	expandableRowsComponent: React.ReactElement;
	expandableRowsHideExpander: boolean;
	expandOnRowClicked?: boolean;
	expandOnRowDoubleClicked?: boolean;
	highlightOnHover: boolean;
	id: string | number;
	inheritConditionalStyles: boolean;
	keyField: string;
	onRowClicked: RowClicked;
	onRowDoubleClicked: RowClicked;
	onRowExpandToggled: ExpandRowToggled;
	onSelectedRow: (action: SingleRowAction) => void;
	pointerOnHover: boolean;
	row: Record<string, unknown>;
	rowCount: number;
	rowIndex: number;
	selectableRowDisabled: RowState;
	selectableRows: boolean;
	selectableRowsComponent: 'input' | React.ReactElement;
	selectableRowsComponentProps: Record<string, unknown>;
	selectableRowsHighlight: boolean;
	selected: boolean;
	striped: boolean;
};

function TableRow({
	columns,
	conditionalRowStyles,
	defaultExpanded = false,
	defaultExpanderDisabled = false,
	dense = false,
	expandableIcon,
	expandableRows,
	expandableRowsComponent,
	expandableRowsHideExpander,
	expandOnRowClicked,
	expandOnRowDoubleClicked,
	highlightOnHover = false,
	id,
	inheritConditionalStyles,
	keyField,
	onRowClicked,
	onRowDoubleClicked,
	onRowExpandToggled,
	onSelectedRow,
	pointerOnHover = false,
	row,
	rowCount,
	rowIndex,
	selectableRowDisabled,
	selectableRows,
	selectableRowsComponent,
	selectableRowsComponentProps,
	selectableRowsHighlight,
	selected,
	striped = false,
}: TableRowProps): JSX.Element {
	const [expanded, setExpanded] = React.useState(defaultExpanded);

	React.useEffect(() => {
		setExpanded(defaultExpanded);
	}, [defaultExpanded]);

	const handleExpanded = React.useCallback(() => {
		setExpanded(!expanded);
		onRowExpandToggled(!expanded, row);
	}, [expanded, onRowExpandToggled, row]);

	const showPointer = pointerOnHover || (expandableRows && (expandOnRowClicked || expandOnRowDoubleClicked));

	const handleRowClick = React.useCallback(
		e => {
			// use event delegation allow events to propagate only when the element with data-tag STOP_PROP_TAG is present
			if (e.target && e.target.getAttribute('data-tag') === STOP_PROP_TAG) {
				onRowClicked(row, e);

				if (!defaultExpanderDisabled && expandableRows && expandOnRowClicked) {
					handleExpanded();
				}
			}
		},
		[defaultExpanderDisabled, expandOnRowClicked, expandableRows, handleExpanded, onRowClicked, row],
	);

	const handleRowDoubleClick = React.useCallback(
		e => {
			if (e.target && e.target.getAttribute('data-tag') === STOP_PROP_TAG) {
				onRowDoubleClicked(row, e);
				if (!defaultExpanderDisabled && expandableRows && expandOnRowDoubleClicked) {
					handleExpanded();
				}
			}
		},
		[defaultExpanderDisabled, expandOnRowDoubleClicked, expandableRows, handleExpanded, onRowDoubleClicked, row],
	);

	const extendedRowStyle = getConditionalStyle(row, conditionalRowStyles);
	const hightlightSelected = selectableRowsHighlight && selected;
	const inheritStyles = inheritConditionalStyles ? extendedRowStyle : {};
	const isStriped = striped && isOdd(rowIndex);

	return (
		<>
			<TableRowStyle
				id={`row-${id}`}
				role="row"
				striped={isStriped}
				highlightOnHover={highlightOnHover}
				pointerOnHover={!defaultExpanderDisabled && showPointer}
				dense={dense}
				onClick={handleRowClick}
				onDoubleClick={handleRowDoubleClick}
				className="rdt_TableRow"
				extendedRowStyle={extendedRowStyle}
				selected={hightlightSelected}
			>
				{selectableRows && (
					<TableCellCheckbox
						keyField={keyField}
						row={row}
						rowCount={rowCount}
						selected={selected}
						selectableRowsComponent={selectableRowsComponent}
						selectableRowsComponentProps={selectableRowsComponentProps}
						selectableRowDisabled={selectableRowDisabled}
						onSelectedRow={onSelectedRow}
					/>
				)}

				{expandableRows && !expandableRowsHideExpander && (
					<TableCellExpander
						keyField={keyField}
						expandableIcon={expandableIcon}
						expanded={expanded}
						row={row}
						onToggled={handleExpanded}
						disabled={defaultExpanderDisabled}
					/>
				)}

				{columns.map(column => (
					<TableCell
						id={`cell-${column.id}-${row[keyField]}`}
						key={`cell-${column.id}-${row[keyField]}`}
						keyField={keyField}
						column={column}
						row={row}
						rowCount={rowCount}
						rowIndex={rowIndex}
					/>
				))}
			</TableRowStyle>

			{expandableRows && expanded && (
				<ExpanderRow key={`expander--${row[keyField]}`} data={row} extendedRowStyle={inheritStyles}>
					{expandableRowsComponent}
				</ExpanderRow>
			)}
		</>
	);
}

export default React.memo(TableRow);
