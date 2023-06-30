import React, { useState } from 'react'
import styles from './Todo.module.css'
import { Draggable } from 'react-beautiful-dnd';
import Checkbox from './input/Checkbox';
import Trashcan from './input/Trashcan';

const Todo = ({
    todo,
    index,
    onCheckboxToggle,
    editTodo,
    removeTodo
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editingTodoText, setEditingTodoText] = useState(todo.text);

    const trashcanStyles = todo.completed ? `${styles.trashcan} ${styles.shownTrashcan}` : styles.trashcan;

    function handleEditTodoKeyDown(event) {
        if (event.key === "Enter") {
            handleEdit();   
        }
    }

    function handleEdit() {
        editTodo(todo.id, editingTodoText);
        setIsEditing(false);
    }

    function todoTextElement() {
        if (isEditing && !todo.completed) {
            return <input 
                    type='text'
                    className={styles.editInput}
                    value={editingTodoText}
                    onChange={e => setEditingTodoText(e.target.value)}
                    onKeyDown={handleEditTodoKeyDown}
                    onBlur={handleEdit}
                    autoFocus
                    />
        }

        const classes = todo.completed ? `${styles.todoText} ${styles.strikethrough}` : styles.todoText;
        return <span className={classes} onClick={() => setIsEditing(true)}>{todo.text}</span>
    }

    return (
        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <div className={styles.todo} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Checkbox id={todo.id.toString()} checked={todo.completed} onChange={onCheckboxToggle} />
                    {todoTextElement()}
                    {<Trashcan customStyles={trashcanStyles} onClick={removeTodo} />}
                </div>
            )}
        </Draggable>
    )
}

export default Todo