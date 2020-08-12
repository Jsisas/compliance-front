import React from 'react';
import { GoogleButton } from './GoogleButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<GoogleButton />', () => {
	it('it matches a snapshot', () => {
		const wrapper = render(<GoogleButton onClick={() => null} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('when disabled is false then onClick should fire ', () => {
		const onClickMock = jest.fn();
		render(<GoogleButton onClick={onClickMock} disabled={false} />);

		const inputButton = screen.getByText('Google');

		fireEvent.click(inputButton);

		expect(inputButton).toBeInTheDocument();
		expect(onClickMock).toHaveBeenCalled();
	});

	it('when disabled is true then onClick should not fire ', () => {
		const onClickMock = jest.fn();
		render(<GoogleButton onClick={onClickMock} disabled={true} />);

		const inputButton = screen.getByText('Google');

		fireEvent.click(inputButton);

		expect(inputButton).toBeInTheDocument();
		expect(onClickMock).not.toHaveBeenCalled();
	});
});
