import users from './testUsers.json';
import tasks from './testTasks.json';
import controls from './testControls.json';
import requirements from './testRequirements.json';
import regulations from './testRegulations.json';
import { User } from '../../../redux/User/UserSlice';
import { Task } from '../../../redux/Task/TaskSlice';
import { Control } from '../../../redux/Control/ControlSlice';
import { Requirement } from '../../../redux/Requirement/RequirementSlice';
import { Regulation } from '../../../redux/Regulation/RegulationSlice';

export const testUsers: User[] = (users as unknown) as User[];
export const testTasks: Task[] = (tasks as unknown) as Task[];
export const testControls: Control[] = (controls as unknown) as Control[];
export const testRequirements: Requirement[] = (requirements as unknown) as Requirement[];
export const testRegulation: Regulation[] = (regulations as unknown) as Regulation[];
