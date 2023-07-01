import React from 'react'
import styles from './ClearTodosBox.module.css'
import ReactModal from 'react-modal';
import { useState } from 'react';

ReactModal.setAppElement('#root')

const ClearTodosBox = ({ clearTodos }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const onConfirmClear = () => {
        clearTodos();
        closeModal();
    }

    return (
        <div className={styles.clearTodosSection}>
            <button className={styles.clearButton} onClick={openModal}>Clear Todos</button> 
            <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.confirmClearSection} overlayClassName={styles.modalOverlay}>
                <span className={styles.confirmClearText}>Are you sure?</span>
                <div>
                    <button className={styles.confirmClearButton} onClick={onConfirmClear}>yes, clear my todos</button>
                    <button className={styles.abortClearButton} onClick={closeModal}>no, keep my todos</button>
                </div>
            </ReactModal>  
        </div>
    )
    
}

export default ClearTodosBox