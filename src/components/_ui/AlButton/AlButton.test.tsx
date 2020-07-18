import React from 'react';
import { shallow } from 'enzyme';
import AlButton from './AlButton';

describe('<AlButton />', () => {
	it('it renders a button', () => {
		const wrapper = shallow(<AlButton type={'primary'} />);
		expect(wrapper.exists('Button')).toBe(true);
		expect(wrapper).toMatchSnapshot();
	});

	it('primary button attributes are correct', () => {
		const onClickMock = jest.fn();
		const wrapper = shallow(<AlButton type={'primary'} />);

		wrapper.setProps({
			type: 'primary',
			style: { position: 'absolute' },
			onClick: onClickMock,
			htmlType: 'button',
			className: 'test-class',
			disabled: true,
		});

		const antdButton = wrapper.find('Button');
		expect(antdButton.prop('className')).toBe('primary test-class');
		expect(antdButton.prop('type')).toBe('primary');
		expect(antdButton.prop('style')).toStrictEqual({ position: 'absolute' });
		expect(antdButton.prop('htmlType')).toBe('button');
		expect(antdButton.prop('disabled')).toBe(true);

		antdButton.simulate('click');
		expect(onClickMock).toHaveBeenCalled();
	});

	it('link button attributes are correct', () => {
		const wrapper = shallow(<AlButton type={'link'} />);

		wrapper.setProps({
			type: 'link',
		});

		const antdButton = wrapper.find('Button');
		expect(antdButton.prop('type')).toBe('link');
		expect(antdButton.prop('className')?.trim()).toBe('');
	});

	it('secondary button attributes are correct', () => {
		const wrapper = shallow(<AlButton type={'secondary'} />);

		wrapper.setProps({
			type: 'secondary',
		});

		const antdButton = wrapper.find('Button');
		expect(antdButton.prop('type')).toBe(undefined);
		expect(antdButton.prop('className')?.trim()).toBe('secondary');
	});
});
