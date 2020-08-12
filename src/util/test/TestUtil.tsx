import { Provider } from 'react-redux';
import React from 'react';
import { act, render as rtlRender, RenderResult } from '@testing-library/react';
import { User } from '../../redux/User/UserSlice';
import rootReducer from '../../redux/reducer';
import { CombinedState, configureStore, DeepPartial } from '@reduxjs/toolkit';
import { Control } from '../../redux/Control/ControlSlice';
import { Regulation } from '../../redux/Regulation/RegulationSlice';
import { Requirement } from '../../redux/Requirement/RequirementSlice';
import { Task } from '../../redux/Task/TaskSlice';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Authentication } from '../../redux/Auth/AuthSlice';
import { getPreloadedState } from '../ObjectToStateEntityUtil';

export function deepRender(
	element: JSX.Element,
	stateData?: RenderState,
	initialRoute?: string
): [MemoryHistory, RenderResult] {
	const [historyWrapped, history] = mockRouting(element, initialRoute || '/');

	const preloadedState = getPreloadedState(stateData);
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: preloadedState as DeepPartial<CombinedState<never>>,
	});

	let wrappedElement: RenderResult = {} as RenderResult;
	act(() => {
		wrappedElement = rtlRender(<Provider store={store}>{historyWrapped}</Provider>);
	});

	return [history, wrappedElement];
}

export type RenderState = {
	user?: User[];
	control?: Control[];
	regulation?: Regulation[];
	requirement?: Requirement[];
	tmpRequirement?: Requirement[];
	task?: Task[];
	auth?: Authentication[];
};

function mockRouting(element: JSX.Element, initialRoute: string): [JSX.Element, MemoryHistory] {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});

	const history = createMemoryHistory({ initialEntries: [initialRoute] });
	const wrappedElement = <Router history={history}>{element}</Router>;
	return [wrappedElement, history];
}
