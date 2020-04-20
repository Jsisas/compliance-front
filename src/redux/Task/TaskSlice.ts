import {Control} from "../Control/ControlSlice";
import {createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../reducer";
import {fetchAllTasks} from "../Task/TaskService";
import {User} from "../User/UserSlice";

export enum TaskType {
    MAINTENANCE,
    TO_BE_DECIDED
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

export interface Comment {
    id: number,
    author: Task,
    content: string,
    date: Date,
    subComments?: Comment
}

export interface Task {
    id: number,
    title: string,
    state: TaskType,
    description: string,
    kind: TaskType,
    assignee: User,
    due_at: Date,
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
export const createOneTask = (task: Task, state: EntityState<Task>) => tasksAdapter.addOne(state, task);
export const updateOneTask = (task: Task, state: EntityState<Task>) => tasksAdapter.updateOne(state, { id: task.id, changes: task });
export const deleteOneTask = (taskId: number, state: EntityState<Task>) => tasksAdapter.removeOne(state, taskId);
export const selectTaskByControlId = (state: any, controlId: string) => {
    return createSelector(
        [selectAllTasks],
        (items: Task[]) => items.filter(task => task.control.id === controlId)
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