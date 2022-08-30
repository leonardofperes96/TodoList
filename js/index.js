// Elementos selecionados
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const todoList = document.querySelector('#todo-list');
const cancelBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;
// Funções
const updateValue = (text) => {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement('button');
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  doneBtn.classList.add('finish-todo');
  todo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editBtn.classList.add('edit-todo');
  todo.appendChild(editBtn);

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  removeBtn.classList.add('remove-todo');
  todo.appendChild(removeBtn);

  todoList.appendChild(todo);
  todoInput.value = '';
};

const formEdit = () => {
  todoForm.classList.toggle('hide');
  editForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
};

const editFunction = (text) => {
  const todos = document.querySelectorAll('.todo');

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector('h3');
    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

// Eventos
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    updateValue(inputValue);
  }
});

document.addEventListener('click', (e) => {
  const elTarget = e.target;
  const elParent = elTarget.closest('div');
  let currValue;

  if (elParent && elParent.querySelector('h3')) {
    currValue = elParent.querySelector('h3').innerText;
  }

  if (elTarget.classList.contains('finish-todo')) {
    elParent.classList.toggle('done');
  }

  if (elTarget.classList.contains('remove-todo')) {
    elParent.remove();
  }

  if (elTarget.classList.contains('edit-todo')) {
    formEdit();

    editInput.value = currValue;
    oldInputValue = currValue;
  }
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formEdit();
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editValue = editInput.value;

  if (editValue) {
    editFunction(editValue);
  }

  formEdit();
});
