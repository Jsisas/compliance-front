// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPreloadedState = (stateData) => {
	const preloadedState = {};

	if (!stateData) {
		return preloadedState;
	}

	Object.keys(stateData).forEach((key) => {
		preloadedState[key] = {
			loading: false,
			entities: {},
			ids: [],
		};

		stateData[key].forEach((obj) => {
			if (key === 'auth') {
				preloadedState[key].entities[obj.token] = obj;
				preloadedState[key].ids.push(obj.token);
				preloadedState[key].isAuthenticated = true;
			} else {
				preloadedState[key].entities[obj.id] = obj;
				preloadedState[key].ids.push(obj.id);
			}
		});
	});
	return preloadedState;
};
