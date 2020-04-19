import { User } from "../User/UserSlice";

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
    status: TaskType,
    description: string,
    type: TaskType,
    assignee: User,
    dueDate: Date,
    files: TaskFile[],
    comments: Comment[]
}