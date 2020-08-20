import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SearchSelectSingle } from './SearchSelectSingle';
import { User } from '../../../../redux/User/UserSlice';
import { testUsers } from '../../../../util/test/data/DataUtil';

describe('<SearchSelectSingle />', () => {
	it('it matches a snapshot', () => {
		const mockOnChange = jest.fn();
		const selectElement = render(
			<SearchSelectSingle
				data={testUsers}
				displayKey={'name'}
				valueKey={'id'}
				allowClear={true}
				placeholder={'Test placeholder'}
				onChange={(user: User) => mockOnChange(user)}
			/>
		);
		expect(selectElement).toMatchSnapshot();
	});

	it('it can select single element', () => {
		const mockOnChange = jest.fn();
		render(
			<SearchSelectSingle
				data={testUsers}
				displayKey={'name'}
				valueKey={'id'}
				allowClear={true}
				placeholder={'Test placeholder'}
				onChange={(user: User) => mockOnChange(user)}
			/>
		);

		const selectedUser = testUsers[0];
		const select = screen.getByTestId('select');
		const input = select.querySelector('.ant-select-selection-search-input');

		expect(input).toBeInTheDocument();
		expect(select).toBeInTheDocument();

		expect(input).not.toBeNull();
		if (input != null) {
			openSelectBoxOptions(input);
			selectOptionsFromSelectBox(input, selectedUser, mockOnChange);
		}
	});

	describe('while allowclear is enabled', () => {
		it('it can clear', () => {
			const mockOnChange = jest.fn();
			const selectedData = testUsers[0];
			render(
				<SearchSelectSingle
					data={testUsers}
					displayKey={'name'}
					valueKey={'id'}
					allowClear={true}
					placeholder={'Test placeholder'}
					selectedData={testUsers[0]}
					onChange={(user: User) => mockOnChange(user)}
				/>
			);

			const select = screen.getByTestId('select');
			const input = select.querySelector('[class="ant-select-selection-search-input"]');
			const selectedEle = screen.getByText(selectedData.name);

			expect(select).toBeInTheDocument();
			expect(input).toBeInTheDocument();

			const clearButton = select.querySelector('[class="ant-select-clear"]');
			expect(clearButton).toBeInTheDocument();

			if (input != null) {
				if (clearButton != null) {
					expect(selectedEle).toBeInTheDocument();
					fireEvent.mouseDown(clearButton);
					expect(mockOnChange).toHaveBeenCalledWith({});
					fireEvent.mouseUp(clearButton);
					expect(selectedEle).not.toBeInTheDocument();
				}
			}
		});
	});

	describe('while allowclear is disabled', () => {
		it('it can not clear', () => {
			const mockOnChange = jest.fn();
			render(
				<SearchSelectSingle
					data={testUsers}
					displayKey={'name'}
					valueKey={'id'}
					allowClear={false}
					placeholder={'Test placeholder'}
					selectedData={testUsers[0]}
					onChange={(user: User) => mockOnChange(user)}
				/>
			);

			const select = screen.getByTestId('select');
			const clearButton = select.querySelector('[class="ant-select-clear"]');

			expect(select).toBeInTheDocument();
			expect(clearButton).not.toBeInTheDocument();
		});
	});

	function openSelectBoxOptions(input: Element) {
		fireEvent.mouseDown(input);
		fireEvent.mouseUp(input);
		screen.getAllByRole('option').forEach((ele) => {
			expect(testUsers.filter((user) => user.id === ele.textContent).length).toBe(1);
		});
	}

	function selectOptionsFromSelectBox(input: Element, selectedUser: User, mockOnChange: jest.Mock) {
		toggleUserSelect(input, selectedUser, mockOnChange);
		screen.getAllByRole('option').forEach((ele) => {
			if (selectedUser.id === ele.textContent) {
				expect(ele.getAttribute('aria-selected')).toBe('true');
			}
		});
	}

	function toggleUserSelect(input: Element, toggledUser: User, mockOnChange: jest.Mock) {
		openSelectBoxOptions(input);
		const selectedOption = screen.getByText(toggledUser.name);
		expect(selectedOption).toBeInTheDocument();
		fireEvent.click(selectedOption);
		expect(mockOnChange).toHaveBeenLastCalledWith(toggledUser);
		return selectedOption;
	}
});
