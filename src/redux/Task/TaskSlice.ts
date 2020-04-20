import { User } from "../User/UserSlice";
import {Control} from "../Control/ControlSlice";

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
    author: User,
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
    dueAt: Date,
    files: TaskFile[],
    comments: Comment[]
    control: Control
}