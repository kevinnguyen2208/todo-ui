export class TaskDetails {
    id: string = "00000000-0000-0000-0000-000000000000";
    description: string = "";
    createdOn?: string;
    priority: Priority = Priority.Low;
}

export enum Priority {
    Low,
    Medium,
    High
}