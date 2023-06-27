import React, { useRef } from 'react'
import styles from './Trashcan.module.css'

const Trashcan = ({customStyles, onClick}) => {
    const buttonRef = useRef();

    return (
        <button className={`${styles.buttonWrapper} ${customStyles}`} onClick={onClick} ref={buttonRef}>
            <svg className={styles.trashcan} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className={styles.piece} x="11.5" y="30.8671" width="57" height="47.6329" rx="3.5" fill="transparent" stroke="black" strokeWidth="5"/>
                <path d="M23 39.4937L23 69.8734" stroke="black" strokeWidth="5" strokeLinecap="round"/>
                <path d="M40.5 39.4937V69.8734" stroke="black" strokeWidth="5" strokeLinecap="round"/>
                <path d="M58 39.4937V69.8734" stroke="black" strokeWidth="5" strokeLinecap="round"/>
                <rect className={styles.piece} x="1.5" y="13.6519" width="77" height="17.2532" rx="3.5" fill="transparent" stroke="black" strokeWidth="5"/>
                <rect className={styles.piece} x="11.5" y="1.5" width="57" height="12.1899" rx="3.5" fill="transparent" stroke="black" strokeWidth="5"/>
            </svg>
        </button>
    )
}

export default Trashcan