const url = 'https://jsonplaceholder.typicode.com/todos';
const todos = document.getElementById('todo-list');
const btn = document.querySelector('button');
const form = document.getElementById('todo-form');

const getTodos = () => {
  // Concat limit
  fetch(url + '?_limit=10')
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((todo) => addToDoToDOM(todo));
    });
};

const addToDoToDOM = (data) => {
  const div = document.createElement('div');
  div.classList.add('todo');
  div.appendChild(document.createTextNode(data.title));
  // Create a unique id for each element
  div.setAttribute('data-id', data.id);
  if (data.completed === true) {
    div.classList.add('done');
  }
  todos.appendChild(div);
};

const createTodo = (e) => {
  // Stop form submitting
  e.preventDefault();
  // Create a todo object
  const newTodo = {
    title: e.target.firstChild.nextElementSibling.value,
    completed: false,
  };
  // Destructuring object
  const { title, completed } = newTodo;
  // Create Post request
  fetch(url, {
    method: 'POST',
    // Wrap in JSON so we can send
    body: JSON.stringify({
      title,
      completed,
    }),
    headers: {
      'Content-Type': 'application/json',
      token: 'justin123',
    },
  })
    // Get resp object
    .then((resp) => resp.json())
    // Resp is now data, call function and pass data as arg
    .then((data) => addToDoToDOM(data));
  // reset input
  e.target.firstChild.nextElementSibling.value = '';
};

const toggleCompleted = (e) => {
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');
    // Get ID from clicked item
    // Instead of boolean check it has class of done
    updateTodo(e.target.dataset.id, e.target.classList.contains('todo'));
  }
};

const updateTodo = (id, completed) => {
  // Targeting the specific id to update so we need to use a direct path to it
  fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      completed,
    }),
    headers: {
      'Content-Type': 'application/json',
      token: 'justinFullSend',
    },
  });
};

const deleteTodo = (e) => {
  if (e.target.classList.contains('todo')) {
    const id = e.target.dataset.id;
    e.target.remove();
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
  }
};

const init = () => {
  form.addEventListener('submit', createTodo);
  todos.addEventListener('click', toggleCompleted);
  todos.addEventListener('dblclick', deleteTodo);
  getTodos();
};

init();
