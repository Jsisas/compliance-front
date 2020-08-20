import { User } from '../../../../../redux/User/UserSlice';
import React from 'react';
import { UserSearchSingle } from './UserSearchSingle';
import { deepRender } from '../../../../../util/test/TestUtil';
import { testUsers } from '../../../../../util/test/data/DataUtil';

describe('<UserSearchSingle	 />', () => {
	it('it matches a snapshot', () => {
		const mockOnChange = jest.fn();

		const [history, element] = deepRender(
			<UserSearchSingle allowClear={true} placeholder={'Test placeholder'} onChange={(user: User) => mockOnChange(user)} />,
			{ user: testUsers }
		);

		expect(element).toMatchSnapshot();
	});
});
