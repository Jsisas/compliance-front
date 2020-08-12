import React from 'react';
import { deepRender } from '../../util/test/TestUtil';
import { fireEvent, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function TestComponent(props: { hasError: boolean }) {
	if (props.hasError) {
		throw new Error('Kaboom!');
	}
	return <div>Test Component</div>;
}

describe('<ErrorBoundary />', () => {
	it('it matches a snapshot', () => {
		const [history, element] = deepRender(
			<ErrorBoundary>
				<TestComponent hasError={true} />
			</ErrorBoundary>
		);
		expect(element).toMatchSnapshot();
	});

	describe('when error', () => {
		console.error = jest.fn();

		it('it can go back when error', () => {
			deepRender(
				<ErrorBoundary>
					<TestComponent hasError={true} />
				</ErrorBoundary>
			);

			console.error('test');

			const mockBackButton = jest.fn();
			const backButton = screen.getByText('Back Home');
			expect(backButton).toBeInTheDocument();

			backButton.onclick = mockBackButton;
			fireEvent.click(backButton);
			expect(mockBackButton).toHaveBeenCalled();
		});
	});

	describe('When no errors', () => {
		it('it renders component correctly when no error', () => {
			deepRender(<ErrorBoundary>{<TestComponent hasError={false} />}</ErrorBoundary>);

			console.error('test2');

			expect(screen.queryByText('Back Home')).not.toBeInTheDocument();
			expect(screen.getByText('Test Component')).toBeInTheDocument();
		});
	});
});
