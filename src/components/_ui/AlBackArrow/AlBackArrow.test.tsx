import React from 'react';
import { AlBackArrow } from './AlBackArrow';
import { GoogleButton } from '../GoogleButton/GoogleButton';
import { fireEvent, render, screen } from '@testing-library/react';
import { deepRender } from '../../../util/test/TestUtil';

describe('<AlBackArrow />', () => {
	it('it matches a snapshot', () => {
		const button = render(<GoogleButton onClick={() => null} />);
		expect(button).toMatchSnapshot();
	});

	it('it should call history.goBack() on click', () => {
		const [history] = deepRender(<AlBackArrow />);
		history.goBack = jest.fn();
		const leftArroww = screen.getByTestId('leftArrow');

		fireEvent.click(leftArroww);
		expect(history.goBack).toBeCalled();
	});
});
