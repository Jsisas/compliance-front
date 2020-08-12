import React from 'react';
import { ControlConnectedItems } from './ControlConnectedItems';
import { deepRender } from '../../util/test/TestUtil';
import { screen } from '@testing-library/react';
import { testRequirements } from '../../util/test/data/DataUtil';

describe('<ControlConnectedItems />', () => {
	it('it matches a snapshot', () => {
		const [history, element] = deepRender(<ControlConnectedItems requirements={testRequirements} />);
		expect(element).toMatchSnapshot();
	});

	it('it shows all the requirements', () => {
		deepRender(<ControlConnectedItems requirements={testRequirements} />);

		const requirementsCount = screen.getByText(`Requirements (${testRequirements.length.toString()})`);
		const list = screen.getByTestId('list');

		expect(requirementsCount).toBeInTheDocument();
		expect(list.children.length).toBe(testRequirements.length);
	});

	it('it shows fallback text', () => {
		deepRender(<ControlConnectedItems requirements={[]} />);

		const requirementsCount = screen.getByText(`Requirements (${0})`);
		const list = screen.getByTestId('list');
		const fallbackText = screen.getByText('No connected requirements');

		expect(requirementsCount).toBeInTheDocument();
		expect(fallbackText).toBeInTheDocument();
		expect(list.children.length).toBe(1);
	});
});
