export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Tasks {
  id: number;
  title: string;
  description: string;
  status: string;
  statusId: number;
  subtasks: Subtask[];
}

export interface Columns {
  id: number;
  name: string;
  tasks: Tasks[];
}

export interface Boards {
  id: number;
  name: string;
  columns: Columns[];
}

export interface Root {
  boards: Boards[];
}

export interface EditBoard {
  name: string
  columns: Array<{ column: string, id: number }>
}
