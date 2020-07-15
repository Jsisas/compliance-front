import React from 'react';
import {shallow} from 'enzyme';
import {GoogleButton} from './GoogleButton';

describe('<GoogleButton />', () => {
	it('it renders a google button', () => {
		const wrapper = shallow(<GoogleButton onClick={() => null}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('attributes work as expected', () => {
		const onClickMock = jest.fn();
		const wrapper = shallow(<GoogleButton onClick={() => null}/>);

		wrapper.setProps({
			onClick: onClickMock,
			disabled: true
		});

		wrapper.simulate('click');
		expect(onClickMock).toHaveBeenCalled();
		expect(wrapper.prop('disabled')).toBe(true);
	});

	it('disabled defaults to false', () => {
		const wrapper = shallow(<GoogleButton onClick={() => null}/>);
		expect(wrapper.prop('disabled')).toBe(false);
	});
});
