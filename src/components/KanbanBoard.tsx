
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { PlusCircle, MoreHorizontal, X } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description?: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Research content ideas', description: 'Brainstorm new topics for notes' },
      { id: '2', title: 'Update profile', description: 'Add more personal information' }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Write documentation', description: 'Create user guides for the app' },
      { id: '4', title: 'Design new logo', description: 'Create mockups for review' }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '5', title: 'Set up project', description: 'Initialize the repository and dependencies' },
      { id: '6', title: 'Create initial design', description: 'Design the first draft of the UI' }
    ]
  }
];

export const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (draggingTaskId) {
      // Find the task and its original column
      let taskToMove: Task | undefined;
      let sourceColumnId: string = '';
      
      columns.forEach(column => {
        const task = column.tasks.find(t => t.id === draggingTaskId);
        if (task) {
          taskToMove = task;
          sourceColumnId = column.id;
        }
      });

      if (taskToMove && sourceColumnId && sourceColumnId !== columnId) {
        // Remove from source column and add to target column
        setColumns(prev => 
          prev.map(col => {
            if (col.id === sourceColumnId) {
              return {
                ...col,
                tasks: col.tasks.filter(t => t.id !== draggingTaskId)
              };
            }
            if (col.id === columnId) {
              return {
                ...col,
                tasks: [...col.tasks, taskToMove!]
              };
            }
            return col;
          })
        );
      }
      setDraggingTaskId(null);
    }
  };

  const addNewTask = (columnId: string) => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: ''
    };
    
    setColumns(prev => 
      prev.map(col => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: [...col.tasks, newTask]
          };
        }
        return col;
      })
    );
    
    setNewTaskTitle('');
    setShowNewTaskForm(null);
  };

  const removeTask = (columnId: string, taskId: string) => {
    setColumns(prev => 
      prev.map(col => {
        if (col.id === columnId) {
          return {
            ...col,
            tasks: col.tasks.filter(t => t.id !== taskId)
          };
        }
        return col;
      })
    );
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <div 
            key={column.id}
            className="bg-gray-50 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNewTaskForm(column.id)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            
            {showNewTaskForm === column.id && (
              <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full p-2 border rounded mb-2"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setShowNewTaskForm(null);
                      setNewTaskTitle('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => addNewTask(column.id)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              {column.tasks.map(task => (
                <Card 
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="cursor-move bg-white"
                >
                  <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between">
                    <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:bg-gray-200"
                        onClick={() => removeTask(column.id, task.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-200">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  {task.description && (
                    <CardContent className="p-3 pt-2">
                      <p className="text-xs text-gray-500">{task.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
