import { deepRender } from '../../util/test/TestUtil';
import React from 'react';
import { ControlsPage } from './ControlsPage';
import { testControls } from '../../util/test/data/DataUtil';
import { fireEvent, screen } from '@testing-library/react';

describe('</ControlsPage />', () => {
	it('it matches a snapshot', () => {
		const [history, element] = deepRender(<ControlsPage />, { control: testControls });
		expect(element).toMatchSnapshot();
	});

	it('it renders 10 items per page', () => {
		deepRender(<ControlsPage />, { control: testControls });

		const controlsTable = screen.getByTestId('controls-table');
		const rows = controlsTable.getElementsByClassName('ant-table-row-level-0');

		expect(rows.length).toBe(10);
	});

	it('it filters by text', () => {
		deepRender(<ControlsPage />, { control: testControls });
		const searchQuery = '123';
		const textSearchInput = screen.getByPlaceholderText('Search by title');
		const controlsTable = screen.getByTestId('controls-table');

		fireEvent.change(textSearchInput, { target: { value: searchQuery } });

		const rows = controlsTable.getElementsByClassName('ant-table-row-level-0');
		const filteredControls = testControls.filter((control) =>
			control.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
		expect(rows.length).toBe(filteredControls.length);
	});
});
