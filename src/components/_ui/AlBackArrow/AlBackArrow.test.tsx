import React from 'react';
import {shallow} from 'enzyme';
import {AlBackArrow, AlBackArrowProps} from './AlBackArrow';
import * as H from 'history';
import {LeftOutlined} from '@ant-design/icons/lib';
import styles from './albackarrow.module.scss';

const props: AlBackArrowProps = {
	history: {} as H.History
};

describe('<AlBackArrow />', () => {
	it('it renders an arrow', () => {
		const arrow = shallow(<AlBackArrow history={props.history} />);
		const alButton = arrow.find('AlButton');

		expect(alButton.length).toEqual(1);
		expect(alButton.prop('type')).toEqual('link');
		expect(alButton.prop('onClick')).toBeDefined();

		expect(arrow.containsMatchingElement(<LeftOutlined className={styles.alBackArrow}/>)).toBeTruthy();
	});
});
