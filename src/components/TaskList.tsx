import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if(newTaskTitle.length >= 2){
      let taskID = RandomID(); /// gera um ID de 0 a 1000 de forma randomica
      let thereIsID = tasks.some((task) => task.id == taskID); /// retorna TRUE caso o ID gerado já exista
  
      if (thereIsID == false) {
        setTasks((tasks) => [
          ...tasks,
          {
            id: taskID,
            title: newTaskTitle,
            isComplete: false,
          },
        ]);
        setNewTaskTitle('')
      } else {
        handleCreateNewTask();
      }
    }
    
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    var newArrayTasks = tasks.map((task)=>{
      if(id === task.id){
        return {...task, isComplete: !task.isComplete}
      }else{
        return task
      }
    })
    setTasks(newArrayTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    setTasks(tasks.filter(task => task.id !== id))
  }

  function RandomID() {
    return Math.floor(Math.random() * 1000) + 1;
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
