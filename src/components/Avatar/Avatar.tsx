import React from 'react';
import styles from "./Avatar.css";


export function Avatar(){

    return (
        <a href={'/profile'} className={styles.logo}>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
        </a>
);
}

