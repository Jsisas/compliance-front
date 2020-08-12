import React from 'react';
import { AlComment } from './AlComment';
import { render } from '@testing-library/react';

describe('<AlComment />', () => {
	it('it renders a comment section', () => {
		const wrapper = render(<AlComment />);
		expect(wrapper).toMatchSnapshot();
	});
});
