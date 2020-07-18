import controlReducer from './Control/ControlSlice';
import userReducer from './User/UserSlice';
import regulationReducer from './Regulation/RegulationSlice';
import requirementReducer from './Requirement/RequirementSlice';
import tmpRequirementReducer from './Requirement/TmpRequirementSlice/TmpRequirementSlice';
import taskReducer from './Task/TaskSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
	control: controlReducer,
	regulation: regulationReducer,
	requirement: requirementReducer,
	tmpRequirement: tmpRequirementReducer,
	task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
