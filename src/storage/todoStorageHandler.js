
export function addTodo(todoText) {
    intializeIfEmpty();

    const todo = {
        id: getNextId(),
        text: todoText,
        completed: false
    };

    const todos = getTodos();
    todos.push(todo);
    saveTodos(todos);
}

export function removeTodo(todoId) {
    let todos = getTodos();
    todos = todos.filter(t => t.id !== todoId);
    saveTodos(todos);
}

export function getTodos() {
    return JSON.parse(localStorage.getItem("todos"));
}

export function setTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function TEMP_CLEAR_TODOS() {
    const todos = [];
    saveTodos(todos);
}

function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getNextId() {
    const todos = getTodos();
    const highestId = Math.max(...todos.map(t => t.id));

    if (highestId === -Infinity) {
        return 1;
    }

    return highestId + 1;
}

function intializeIfEmpty() {
    const jsonTodos = getTodos();
    if (jsonTodos === null) {
        const todos = [];
        saveTodos(todos);
    }
}
