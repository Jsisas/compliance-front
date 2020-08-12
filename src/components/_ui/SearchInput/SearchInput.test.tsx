import React from 'react';
import { SearchInput } from './SearchInput';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { testUsers } from '../../../util/test/data/TestUsers';

describe('<SearchInputP />', () => {
	it('it matches a snapshot', () => {
		const mockOnSelect = jest.fn();
		const wrapper = render(
			<SearchInput
				data={testUsers}
				filterByKeys={['name', 'email']}
				displayKey={'name'}
				idKey={'id'}
				onSelect={mockOnSelect}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('it filters data according to input', async () => {
		const mockOnSelect = jest.fn();
		render(
			<SearchInput
				data={testUsers}
				filterByKeys={['name', 'email']}
				displayKey={'name'}
				idKey={'id'}
				onSelect={mockOnSelect}
			/>
		);
		const input = screen.getByTestId('input');
		const results = screen.getByTestId('results');

		expect(results.children.length).toBeLessThan(1);

		fireEvent.change(input, { target: { value: 'gmail' } });
		expect(results.children.length).toBe(
			testUsers.filter((user) => user.email.includes('gmail') || user.name.includes('gmail')).length
		);

		fireEvent.change(input, { target: { value: 'Joosep' } });
		const result = screen.getByText('Joosep Sisas');

		await waitFor(() => {
			expect(result).toBeInTheDocument();
		});

		fireEvent.change(input, { target: { value: '' } });
		waitFor(() => {
			expect(result).not.toBeInTheDocument();
		});
	});
});
