import React from 'react';
import { AlBackArrow, AlBackArrowProps } from './AlBackArrow';
import * as H from 'history';
import { GoogleButton } from '../GoogleButton/GoogleButton';
import { fireEvent, render, screen } from '@testing-library/react';

const props: AlBackArrowProps = {
	history: {} as H.History,
};

describe('<AlBackArrow />', () => {
	it('it matches a snapshot', () => {
		const button = render(<GoogleButton onClick={() => null} />);
		expect(button).toMatchSnapshot();
	});

	it('it should call history.goBack() on click', () => {
		props.history.goBack = jest.fn();
		render(<AlBackArrow history={props.history} />);
		const leftArroww = screen.getByTestId('leftArrow');

		fireEvent.click(leftArroww);
		expect(props.history.goBack).toBeCalled();
	});
});
