import React from 'react'
import styles from './Checkbox.module.css'

const Checkbox = ({id, checked, onChange}) => {
    const inputId = id; // replace with props

    return (
        <label className={styles.checkbox} htmlFor={inputId}>
            <input className={styles.input} id={inputId} checked={checked} type="checkbox" onChange={onChange} />
            <svg className={styles.svg} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className={styles.box} x="2.5" y="2.5" width="75" height="75" rx="6.5" fill="transparent" stroke="black" strokeWidth="5"/>
                <g className={styles.check} filter="url(#filter0_d_0_1)">
                    <path d="M18 39.5L33.9323 54.311C34.3402 54.6902 34.9793 54.6631 35.3536 54.2508L61 26" stroke="black" strokeWidth="5" strokeLinecap="round"/>
                </g>
                <defs>
                    <filter id="filter0_d_0_1" x="11.5" y="23.5" width="56" height="41.5787" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </label>
    )   
}

export default Checkbox