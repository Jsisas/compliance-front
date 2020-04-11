import { User } from "../User/UserSlice";

export enum TaskType {
    MAINTENANCE,
    TO_BE_DECIDED
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
    parent?: Comment
}

export interface Task {
    id: number,
    title: string,
    status: string,
    description: string,
    type: TaskType,
    assignee: User,
    dueDate: Date,
    files: TaskFile[],
    comments: Comment[]
}