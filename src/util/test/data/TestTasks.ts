import {
	Month,
	Quarter,
	Task,
	TaskFrequencyType,
	TaskFrequencyTypeRecurrence,
	TaskStatus,
	TaskType,
	Weekday,
} from '../../../redux/Task/TaskSlice';
import { ControlStatus, ControlType } from '../../../redux/Control/ControlSlice';
import { User } from '../../../redux/User/UserSlice';

export const testTasks: Task[] = [
	{
		id: '206b1932-3253-4f30-bfe7-896053be1993',
		assignee: {} as User,
		comments: [],
		files: [],
		control: {
			id: '495d2960-fd50-4756-a7d9-7a3b8a082552',
			state: ControlStatus.FAILING,
			title: 'Definition of security roles and responsibilities (clauses A.7.1.2 and A.13.2.4)',
			assignee: {} as User,
			begins_at: '',
			description: '',
			kind: ControlType.POLICY,
			requirements: [],
			tasks: [],
		},
		description: '',
		due_at: '',
		frequency: {
			month: Month.APRIL,
			quarter: Quarter.FIRST,
			type: TaskFrequencyType.RECURRING,
			week: Quarter.FIRST,
			weekDay: Weekday.FRIDAY,
			recurrence: TaskFrequencyTypeRecurrence.ANNUAL,
		},
		is_overdue: false,
		kind: TaskType.AUDIT,
		state: TaskStatus.OK,
		title: 'Review',
	},
];
