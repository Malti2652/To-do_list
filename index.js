const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// Get existing todos from local storage
let todos = JSON.parse(localStorage)


// Fetch the data from JSON server
fetch('http://localhost:3000/todos')
  .then(response => response.json())
  .then(data => {
    // Loop through the data and create HTML elements for each to-do item
    data.forEach(todo => {
      const todoEl = document.createElement('li');
      todoEl.textContent = todo.task;
      document.querySelector('#todo-list').appendChild(todoEl);
    });
  })
  .catch(error => console.error(error));

// Add new to-do item
document.querySelector('#add-todo').addEventListener('submit', event => {
  event.preventDefault();
  const task = document.querySelector('#task').value;

  // Send the new to-do item to the JSON server
  fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  })
    .then(response => response.json())
    .then(data => {
      // Create an HTML element for the new to-do item
      const todoEl = document.createElement('li');
      todoEl.textContent = data.task;
      document.querySelector('#todo-list').appendChild(todoEl);
    })
    .catch(error => console.error(error));
});
