import React from 'react'
import styles from './ClearTodosBox.module.css'
import { useState } from 'react';

const ClearTodosBox = ({ clearTodos }) => {
    const [clearTodosToggled, setClearTodosToggled] = useState(false);

    return (
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
    )
    
}

export default ClearTodosBox