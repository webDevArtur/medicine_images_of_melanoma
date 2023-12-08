import React from 'react';
import styles from './MessageComponent.css';

interface MessageProps {
    message: string | null;
    messageType:  'error' | null;
}

export const MessageComponent: React.FC<MessageProps> = ({ message, messageType }) => {
    if (!message) {
        return null;
    }

    const messageClassName =  styles.errorMessage;

    return (
        <div className={`${styles.message} ${messageClassName}`}>
            {message}
        </div>
    );
};