const todoInput = document.querySelector('.todo-input');
const dateInput = document.querySelector('.date-input');
const addBtn =  document.querySelector('.add-todo');
const todoListContainer = document.querySelector('.todo-list-container')
const todoList = localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')) : [];

renderTodoList(todoList);

addBtn.addEventListener('click', () => {
  const todoInputValue = todoInput.value
  const dateInputValue = dateInput.value

  if (!todoInputValue || !dateInputValue) {
    alert('Input is required')
    todoInput.value = ''
    dateInput.value = ''
    return;
  }

  todoList.push({ todoInputValue, dateInputValue })

  todoInput.value = ''
  dateInput.value = ''

  localStorage.setItem('todo-list', JSON.stringify(todoList))
  
  renderTodoList(todoList)
})


function renderTodoList(todoListArr) {
  let todoListRow = ''

  for (let i = 0; i < todoListArr.length; i++) {

    const { todoInputValue, dateInputValue } = todoListArr[i]

    let html = `
    <div class="todo-list-row">
      <p>${todoInputValue}</p><p>${dateInputValue}</p><button class="btn delete-todo">Delete</button>
    </div>
    `
    todoListRow += html
  }

  todoListContainer.innerHTML = todoListRow
}

todoListContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-todo')) {
    const removeRow = e.target.closest('.todo-list-row');

    const dateInputRow = e.target.previousElementSibling
    const todoInputRow = dateInputRow.previousElementSibling

    const dateInputRowContent = dateInputRow.textContent
    const todoInputRowContent = todoInputRow.textContent

    for (let i = 0; i < todoList.length; i++) {
      const { todoInputValue, dateInputValue } = todoList[i]

      if (todoInputValue === todoInputRowContent && dateInputValue === dateInputRowContent) {
        todoList.splice(i, 1)
        localStorage.setItem('todo-list', JSON.stringify(todoList))
        renderTodoList(todoList)
      }
      
    }

    if (removeRow) {
      removeRow.remove();
    }
  } 
})