import { deepRender } from '../../util/test/TestUtil';
import React from 'react';
import { TaskConnectedItems } from './TaskConnectedItems';
import { testTasks } from '../../util/test/data/DataUtil';

it('it matches a snapshot', () => {
	const [history, element] = deepRender(<TaskConnectedItems task={testTasks[0]} />);
	expect(element).toMatchSnapshot();
});
