import React from 'react';
import styles from './TrendingGrid.module.css';
import { trendingContent } from '../../data/mockData';

const TrendingGrid = () => {
    return (
        <div className={styles.grid}>
            {trendingContent.map((item) => (
                <div key={item.id} className={`${styles.item} ${styles[item.height]}`}>
                    <img src={item.src} alt="Trending content" className={styles.image} />
                </div>
            ))}
        </div>
    );
};

export default TrendingGrid;
