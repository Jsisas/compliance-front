import { deepRender } from '../../util/test/TestUtil';
import React from 'react';
import { ControlsPage } from './ControlsPage';

it('it matches a snapshot', () => {
	const [history, element] = deepRender(<ControlsPage />);
	expect(element).toMatchSnapshot();
});
