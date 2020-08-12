import { User } from '../../../../redux/User/UserSlice';
import React from 'react';
import { UserSearch } from './UserSearch';
import { deepRender } from '../../../../util/test/TestUtil';
import { testUsers } from '../../../../util/test/data/DataUtil';

describe('<UserSearch	 />', () => {
	it('it matches a snapshot', () => {
		const mockOnChange = jest.fn();

		const [history, element] = deepRender(
			<UserSearch allowClear={true} placeholder={'Test placeholder'} onChange={(user: User) => mockOnChange(user)} />,
			{ user: testUsers }
		);

		expect(element).toMatchSnapshot();
	});
});
