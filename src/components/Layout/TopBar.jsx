import React from 'react';
import { Bell, MessageCircle } from 'lucide-react';
import styles from './TopBar.module.css';

const TopBar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <button className={styles.iconButton}>
                    <Bell size={24} />
                    <span className={styles.badge} />
                </button>

                <h1 className={styles.logo}>Krave</h1>

                <button className={styles.iconButton}>
                    <MessageCircle size={24} />
                </button>
            </div>
        </header>
    );
};

export default TopBar;
