import React from 'react';
import { shallow } from 'enzyme';
import { AlBackArrow, AlBackArrowProps } from './AlBackArrow';
import * as H from 'history';
import { LeftOutlined } from '@ant-design/icons/lib';
import styles from './albackarrow.module.scss';

const props: AlBackArrowProps = {
	history: {} as H.History,
};

describe('<AlBackArrow />', () => {
	it('it renders an arrow with correct attributes', () => {
		const wrapper = shallow(<AlBackArrow history={props.history} />);
		const alButton = wrapper.find('AlButton');

		expect(alButton.length).toEqual(1);
		expect(alButton.prop('type')).toEqual('link');
		expect(alButton.prop('onClick')).toBeDefined();

		expect(wrapper.containsMatchingElement(<LeftOutlined className={styles.alBackArrow} />)).toBe(true);
	});
});
