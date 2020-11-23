import * as React from 'react';
import styled, { CSSObject } from 'styled-components';
import { Row } from './types';

// Make "data" available on our any child component
// eslint-disable-next-line arrow-body-style
const renderChildren = (children: React.ReactElement, data: Record<string, unknown>) => {
	return React.Children.map(children, child => React.cloneElement(child, { data }));
};

const ExpanderRowStyle = styled.div<{
	extendedRowStyle: CSSObject;
}>`
	width: 100%;
	box-sizing: border-box;
	${({ theme }) => theme.expanderRow.style};
	${({ extendedRowStyle }) => extendedRowStyle};
`;

type ExpanderRowProps = {
	data: Row;
	children: React.ReactElement;
	extendedRowStyle: CSSObject;
};

const ExpanderRow = ({ data, children, extendedRowStyle }: ExpanderRowProps): JSX.Element => (
	<ExpanderRowStyle className="rdt_ExpanderRow" extendedRowStyle={extendedRowStyle}>
		{renderChildren(children, data)}
	</ExpanderRowStyle>
);

export default ExpanderRow;
