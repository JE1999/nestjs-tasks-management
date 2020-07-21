export interface Tasks{
    id: string;
    tittle: string;
    description: string;
    status: TaskStatus
}

export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}