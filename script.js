
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');


const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

   
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

 
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

  
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.style.display = 'none';
    }

    if (isValid) {
       
        alert('Form submitted successfully!');
        contactForm.reset();
    }
});


const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');


let todos = JSON.parse(localStorage.getItem('todos')) || [];


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    const span = document.createElement('span');
    span.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        const index = todos.indexOf(text);
        if (index > -1) {
            todos.splice(index, 1);
            saveTodos();
            li.remove();
        }
    });
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}


function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);
    });
}


addTodoBtn.addEventListener('click', function() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push(todoText);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
});


todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            todos.push(todoText);
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    }
});


renderTodos(); 
