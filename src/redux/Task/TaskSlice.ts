import {Control} from "../Control/ControlSlice";
import {createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../reducer";
import {fetchAllTasks} from "../Task/TaskService";
import {User} from "../User/UserSlice";

export enum Weekday {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}

export enum Quarter {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
}

export enum Month {
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER
}

export enum TaskType {
    MAINTENANCE = "Maintenance",
    AUDIT = "Audit",
    REVIEW = "Review"
}

export enum TaskStatus{
    FAILING,
    WARNING,
    OK
}

export interface TaskFile {
    id: number,
    name: string,
    downloadUrl: string,
}

export enum TaskFrequencyType {
    ONE_TIME = "One-time task",
    RECURRING = "Recurring task",
}

export enum TaskFrequencyTypeRecurrence {
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
    QUARTERLY = "Quarterly",
    ANNUAL = "Annual",
}

export interface WeeklyTaskFrequency {
    type: TaskFrequencyType,
    recurrence: TaskFrequencyTypeRecurrence;
    weekDay: Weekday;
}

export interface MonthlyTaskFrequency {
    type: TaskFrequencyType,
    recurrence: TaskFrequencyTypeRecurrence;
    weekDay: number;
    week: number;
}

export interface QuarterlyTaskFrequency {
    type: TaskFrequencyType,
    recurrence: TaskFrequencyTypeRecurrence;
    quarter: Quarter;
}

export interface AnnualTaskFrequency {
    type: TaskFrequencyType,
    recurrence: TaskFrequencyTypeRecurrence;
    month: Month;
}

export interface Comment {
    id: number,
    author: Task,
    content: string,
    date: Date,
    subComments?: Comment
}

export interface Task {
    id: string,
    title: string,
    state: TaskType,
    description: string,
    kind: TaskType,
    frequency: WeeklyTaskFrequency | MonthlyTaskFrequency | QuarterlyTaskFrequency | AnnualTaskFrequency;
    assignee: User,
    due_at: string,
    files: TaskFile[],
    comments: Comment[]
    control: Control
}

const tasksAdapter = createEntityAdapter<Task>({
    selectId: task => task.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const taskInitialState: EntityState<Task> = tasksAdapter.getInitialState();
const taskSelectors = tasksAdapter.getSelectors((state: RootState) => state.task.entities)

export const selectAllTasks = taskSelectors.selectAll;
export const selectTaskById = taskSelectors.selectById;
export const setTasks = (tasks: Task[], state: EntityState<Task>) => tasksAdapter.setAll(state, tasks);
export const updateOneTask = (task: Task, state: EntityState<Task>) => tasksAdapter.updateOne(state, { id: task.id, changes: task });
export const deleteOneTask = (taskId: string, state: EntityState<Task>) => tasksAdapter.removeOne(state, taskId);
export const selectTaskByControlId = (state: any, controlId: string) => {
    return createSelector(
        [selectAllTasks],
        (items: Task[]) => items.filter(task => (task.control.id || null) === controlId)
    )(state)
}

const TaskSlice = createSlice({
    name: 'task',
    initialState: { entities: taskInitialState, loading: false },
    reducers: {
        createTask(state, { payload }: PayloadAction<Task>) {
            tasksAdapter.addOne(state.entities, payload)
        },
        editTask(state, { payload }: PayloadAction<Task>) {
            updateOneTask(payload, state.entities)
        },
        deleteTask(state, { payload }: PayloadAction<Task>) {
            deleteOneTask(payload.id, state.entities)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
            state.loading = false;
            tasksAdapter.setAll(state.entities, action.payload);
        })
    }
})

export const { createTask, editTask, deleteTask } = TaskSlice.actions
export default TaskSlice.reducer;