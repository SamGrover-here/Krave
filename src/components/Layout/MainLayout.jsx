import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import styles from './MainLayout.module.css';

const MainLayout = () => {
    return (
        <div className={styles.layout}>
            <TopBar />
            <main className={styles.content}>
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};

export default MainLayout;
