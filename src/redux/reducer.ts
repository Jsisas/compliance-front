import controlReducer from './Control/ControlSlice'
import userReducer from './User/UserSlice'
import regulationReducer from './Regulation/RegulationSlice'
import requirementReducer from './Requirement/RequirementSlice'
import { combineReducers } from '@reduxjs/toolkit';
import regulationRequirementsSlice from "./RegulationRequirement/RegulationRequirementSlice";

const rootReducer = combineReducers({
    user: userReducer,
    control: controlReducer,
    regulation: regulationReducer,
    requirement: requirementReducer,
    regulationRequirements: regulationRequirementsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;