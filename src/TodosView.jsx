import React, { useEffect, useRef, useState } from 'react'
import * as todoStorage from './storage/todoStorageHandler'
import styles from './TodosView.module.css'
import Checkbox from './input/Checkbox';
import Trashcan from './input/Trashcan';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TodosView = () => {
    const [todos, setTodos] = useState(
        todoStorage.getTodos() || []
    )

    const [todoText, setTodoText] = useState("");
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState("");

    const [inputPlaceholder, setInputPlaceholder] = useState("");
    const inputRef = useRef();

    const [clearTodosToggled, setClearTodosToggled] = useState(false);

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

    function doesAnyTodoExist() {
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

    function removeTodoTest() {
        setTodos([]);
    }

    function handleAddTodoInputKeyDown(event) {
        if (event.key === "Enter") { 
            addTodo();
        }
    }

    const isTodosEmpty = () => todos.length === 0;

    const inputClasses = isTodosEmpty() ? `${styles.inputField} ${styles.inputFieldFirstTodo}` : styles.inputField;

    function editTodo() {
        if (editingTodoText.trim() === '') {
            removeTodo(editingTodoId)
        }
        else {
            setTodos(
                todos.map(todo => todo.id === editingTodoId ? { ...todo, text: editingTodoText } : todo)
            );
        }

        setEditingTodoId(null);
        setEditingTodoText("");
    }

    function handleEditTodoKeyDown(event) {
        if (event.key === "Enter") {
            editTodo();   
        }
    }

    function todoTextElement(todo) {
        if (todo.id === editingTodoId && !todo.completed) {
            return <input 
                    type='text'
                    className={styles.editInput}
                    value={editingTodoText}
                    onChange={e => setEditingTodoText(e.target.value)}
                    onKeyDown={handleEditTodoKeyDown}
                    onBlur={editTodo}
                    autoFocus
                    />
        }

        const classes = todo.completed ? `${styles.todoText} ${styles.strikethrough}` : styles.todoText;
        return <span className={classes} onClick={() => setEditingTodo(todo)}>{todo.text}</span>
    }

    function setEditingTodo(todo) {
        setEditingTodoId(todo.id);
        setEditingTodoText(todo.text);
    }

    function trashcanStyles(todo) {
        return todo.completed ? `${styles.trashcan} ${styles.shownTrashcan}` : styles.trashcan
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
        setClearTodosToggled(false);
    }

    return (
        <div>
            <div onClick={removeTodoTest} style={{cursor: 'pointer'}}>Reset</div>
            <div className={styles.container}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='todos'>
                    {(provided) => (
                        <div className={styles.todos} {...provided.droppableProps} ref={provided.innerRef}>
                                {todos.map((todo, index) => (
                                    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                        {(provided) => (
                                            <div className={styles.todo} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <Checkbox id={todo.id.toString()} checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
                                                {todoTextElement(todo)}
                                                {<Trashcan customStyles={trashcanStyles(todo)} onClick={() => removeTodo(todo.id)} />}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                
                                {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <input 
                className={inputClasses}
                ref={inputRef}
                placeholder={inputPlaceholder}
                type='text' 
                value={todoText} 
                onChange={e => setTodoText(e.target.value)}
                onKeyDown={handleAddTodoInputKeyDown}
            />
            </div>
            { doesAnyTodoExist() &&
            <div className={styles.clearTodosSection}>
                {clearTodosToggled ? 
                <div className={styles.confirmClearSection}>
                    <span className={styles.confirmClearText}>Are you sure?</span>
                    <div>
                        <button className={styles.confirmClearButton} onClick={clearTodos}>yes, clear my todos</button>
                        <button className={styles.abortClearButton} onClick={() => setClearTodosToggled(false)}>no, keep my todos</button>
                    </div>
                </div>  
                :
                <button className={styles.clearButton} onClick={() => setClearTodosToggled(true)}>Clear Todos</button> 
                }
            </div>
            }
        </div>
    )
}

export default TodosView