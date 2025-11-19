import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './AIPersonas.module.css';
import { aiPersonas } from '../../data/mockData';

const AIPersonas = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Chat with AI Personas</span>
            </div>
            <div className={styles.scrollContainer}>
                {aiPersonas.map((persona) => (
                    <div key={persona.id} className={styles.card}>
                        <div className={styles.avatarContainer}>
                            <img src={persona.avatar} alt={persona.name} className={styles.avatar} />
                            <div className={styles.onlineIndicator} />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.name}>{persona.name}</span>
                            <span className={styles.role}>{persona.role}</span>
                        </div>
                        <button className={styles.chatBtn}>
                            <MessageCircle size={16} />
                            <span>Chat</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AIPersonas;
