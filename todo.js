let tasks = [];

// Load tasks from localStorage 
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

function addTask() {
  const taskInput = document.getElementById('inp-task');
  const dueDateInput = document.getElementById('due-date');
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText === '' || dueDate === '') {
    alert('Please enter a task and a due date.');
    return;
  }

  const newTask = {
    id: new Date().toISOString(),
    text: taskText,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(); 
  renderTasks();

  taskInput.value = '';
  dueDateInput.value = '';
}

function toggleComplete(taskId) {
  const task = tasks.find(task => task.id === taskId);
  task.completed = !task.completed;
  saveTasks(); 
  renderTasks();
}

function deleteTask(taskId) {
    const taskElement = document.querySelector(`[data-id='${taskId}']`); 
  
    
    taskElement.classList.add('deleting');
  
    
    setTimeout(() => {
      tasks = tasks.filter(task => task.id !== taskId); 
      saveTasks(); 
      renderTasks(); 
    }, 500);
  }

function searchTask() {
  const searchInput = document.querySelector('.search-task').value.toLowerCase();
  const statusFilter = document.querySelector('#search-status').value;

  // Filter
  const filteredTasks = tasks.filter(task => {
    const matchesText = task.text.toLowerCase().includes(searchInput);
    const matchesStatus = statusFilter === '' || (statusFilter === 'complete' && task.completed) || (statusFilter === 'incomplete' && !task.completed);
    return matchesText && matchesStatus;
  });

  renderFilteredTasks(filteredTasks);
}

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  const statusDisplay = document.getElementById('status-display');
  todoList.innerHTML = '';

  tasks.forEach(task => {
    // Task list rendering
    const listItem = document.createElement('li');
    if (task.completed) {
      listItem.classList.add('completed');
    }

    listItem.setAttribute('data-id', task.id);

    listItem.innerHTML = `
      <span>${task.text} (Due: ${task.dueDate})</span>
      <div class="todo-actions">
        <button class="complete-btn" onclick="toggleComplete('${task.id}')">${task.completed ? 'Undo' : 'Complete'}</button>
        ${task.completed ? `<button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>` : ''}
      </div>
    `;
    todoList.appendChild(listItem);
  });
}

function renderFilteredTasks(filteredTasks) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  if (filteredTasks.length === 0) {
    todoList.innerHTML = '<li>No matching tasks found.</li>';
  }

  filteredTasks.forEach(task => {
    const listItem = document.createElement('li');
    if (task.completed) {
      listItem.classList.add('completed');
    }

    listItem.setAttribute('data-id', task.id);

    listItem.innerHTML = `
      <span>${task.text} (Due: ${task.dueDate})</span>
      <div class="todo-actions">
        <button class="complete-btn" onclick="toggleComplete('${task.id}')">${task.completed ? 'Undo' : 'Complete'}</button>
        ${task.completed ? `<button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>` : ''}
      </div>
    `;

    todoList.appendChild(listItem);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


window.onload = function() {
  loadTasks();
};


function clearAllTask() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}
