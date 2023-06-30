import React, { useEffect, useRef, useState } from 'react'
import * as todoStorage from './storage/todoStorageHandler'
import styles from './TodosView.module.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Todo from './Todo';
import ClearTodosBox from './input/ClearTodosBox';

const TodosView = () => {
    const [todos, setTodos] = useState(
        todoStorage.getTodos() || []
    )
    const [todoText, setTodoText] = useState("");
    const [inputPlaceholder, setInputPlaceholder] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        todoStorage.setTodos(todos);

        if (todos.length === 0) {
            setInputPlaceholder("Write your first todo here!")
        } else {
            setInputPlaceholder("");
        }
    }, [todos]);

    function addTodo() {
        const text = todoText.trim();

        if (text.trim() === "") {
            return;
        }

        const todo = {
            id: getNextId(),
            text: todoText,
            completed: false
        };

        setTodos([...todos, todo])
        setTodoText("");
    }

    function removeTodo(todoId) {
        setTodos(
            [...todos.filter(todo => todo.id !== todoId)]
        )
    }

    function doAnyTodosExist() {
        return todos.length > 0;
    }

    function toggleCompleted(todoId) {
        setTodos(
            todos.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)
        )
    }

    function getNextId() {
        const highestId = Math.max(...todos.map(t => t.id));
    
        if (highestId === -Infinity) {
            return 1;
        }
    
        return highestId + 1;
    }

    function handleAddTodoInputKeyDown(event) {
        if (event.key === "Enter") { 
            addTodo();
        }
    }

    const inputClasses = !doAnyTodosExist() ? `${styles.inputField} ${styles.inputFieldFirstTodo}` : styles.inputField;

    function editTodo(todoId, text) {
        if (text.trim() === '') {
            removeTodo(todoId)
        }
        else {
            setTodos(
                todos.map(todo => todo.id === todoId ? { ...todo, text: text } : todo)
            );
        }
    }

    function handleOnDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const todosCopy = Array.from(todos);
        const [reorderedTodo] = todosCopy.splice(result.source.index, 1);
        todosCopy.splice(result.destination.index, 0, reorderedTodo)

        setTodos(todosCopy);
    }

    function clearTodos() {
        setTodos([]);
    }

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='todos'>
                            {(provided) => (
                                <div className={styles.todos} {...provided.droppableProps} ref={provided.innerRef}>
                                        {todos.map((todo, index) => (
                                            <Todo
                                                key={todo.id}
                                                todo={todo}
                                                index={index}
                                                onCheckboxToggle={() => toggleCompleted(todo.id)}
                                                editTodo={editTodo}
                                                removeTodo={() => removeTodo(todo.id)}
                                            />
                                        ))}
                                        
                                        {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    <input 
                        className={inputClasses}
                        ref={inputRef}
                        placeholder={inputPlaceholder}
                        type='text' 
                        value={todoText} 
                        onChange={e => setTodoText(e.target.value)}
                        onKeyDown={handleAddTodoInputKeyDown}
                    />
                    </DragDropContext>
                </div>
            </div>
            { doAnyTodosExist() && <ClearTodosBox clearTodos={clearTodos} />}
        </div>
    )
}

export default TodosView