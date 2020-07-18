import React from 'react';
import { shallow } from 'enzyme';
import { AlComment } from './AlComment';

describe('<AlComment />', () => {
	it('it renders a comment section', () => {
		const wrapper = shallow(<AlComment />);
		expect(wrapper).toMatchSnapshot();
	});
});
