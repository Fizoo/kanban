export let list: List= [
  {
    name: 'Ideas',
    tasks: [
      {
        task: 'Some random idea',
        subtask: [{
          name: '1',
          checked: false
        }, {
          name: '2',
          checked: true
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  },
  {
    name: 'Research',
    tasks: [
      {
        task: 'Some random idea',
        subtask: [{
          name: '1',
          checked: false
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  },
  {
    name: 'Todo',
    tasks: [
      {
        task: 'Some random idea',
        subtask: [{
          name: '1',
          checked: false
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  },
  {
    name: 'Done',
    tasks: [
      {
        task: 'Some random idea',
        subtask: [{
          name: '1',
          checked: false
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  }
]

export let list2: List= [
  {
    name: 'Ideassssssssss',
    tasks: [
      {
        task: 'Some random ideas',
        subtask: [{
          name: '1',
          checked: false
        }, {
          name: '2',
          checked: true
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  },
  {
    name: 'Research',
    tasks: [
      {
        task: 'Some random idea',
        subtask: [{
          name: '1',
          checked: false
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  },
  {
    name: 'Todo',
    tasks: [
      {
        task: 'Some random idea',
        subtask: [{
          name: '1',
          checked: false
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  },
  {
    name: 'Done',
    tasks: [
      {
        task: 'Some random idea',
        subtask: [{
          name: '1',
          checked: false
        }]
      },
      {
        task: 'This is another random idea',
        subtask: [{
          name: '2',
          checked: false
        }]
      },
      {
        task: 'Build an awesome idea',
        subtask: [{
          name: '3',
          checked: false
        }]
      },
    ]
  }
]

export type List = Column[];

export interface TasksSubtask {
  name: string;
  checked: boolean;
}


export interface ListTasks {
  task: string;
  subtask: TasksSubtask[];
}

export interface Column {
  name: string;
  tasks: ListTasks[];
}
