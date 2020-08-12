import React from 'react';
import AlButton from './AlButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<AlButton />', () => {
	it('it matches a snapshot', () => {
		const wrapper = render(<AlButton type={'primary'} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('it should not fire onClick when button is disabled', () => {
		const onClickMock = jest.fn();
		render(
			<AlButton
				type={'primary'}
				style={{ position: 'absolute' }}
				onClick={onClickMock}
				htmlType={'button'}
				className={'test-class'}
				disabled={true}
			>
				Test Button
			</AlButton>
		);

		const button = screen.getByText('Test Button');
		fireEvent.click(button);
		expect(onClickMock).not.toBeCalled();
	});

	it('it should fire onClick when button is enabled', () => {
		const onClickMock = jest.fn();
		render(
			<AlButton
				type={'primary'}
				style={{ position: 'absolute' }}
				onClick={onClickMock}
				htmlType={'button'}
				className={'test-class'}
				disabled={false}
			>
				Test Button
			</AlButton>
		);

		const button = screen.getByText('Test Button');
		fireEvent.click(button);
		expect(onClickMock).toBeCalled();
	});
});
