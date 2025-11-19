import React, { useState, useEffect, useRef } from 'react';
import Post from '../components/Feed/Post';
import ExploreMore from '../components/Feed/ExploreMore';
import AIPersonas from '../components/Feed/AIPersonas';
import TrendingGrid from '../components/Feed/TrendingGrid';
import { posts as initialPosts, stories } from '../data/mockData';
import styles from './Home.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [activeTab, setActiveTab] = useState('for_you');
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef(null);

    // Simulate infinite scroll
    useEffect(() => {
        if (activeTab === 'trending') return; // No infinite scroll for trending yet

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    loadMorePosts();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loading, posts, activeTab]);

    const loadMorePosts = () => {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const newPosts = initialPosts.map(post => ({
                ...post,
                id: post.id + posts.length, // Ensure unique IDs
                likes: Math.floor(Math.random() * 1000)
            }));
            setPosts(prev => [...prev, ...newPosts]);
            setLoading(false);
        }, 1500);
    };

    const renderTabs = () => (
        <div className={styles.tabBar}>
            {['For You', 'Following', 'Trending'].map((tab) => {
                const tabId = tab.toLowerCase().replace(' ', '_');
                const isActive = activeTab === tabId;
                return (
                    <button
                        key={tabId}
                        className={`${styles.tab} ${isActive ? styles.active : ''}`}
                        onClick={() => setActiveTab(tabId)}
                    >
                        {tab}
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className={styles.activeIndicator}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );

    const renderContent = () => {
        if (activeTab === 'trending') {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <TrendingGrid />
                </motion.div>
            );
        }

        return (
            <div className={styles.postsContainer}>
                {/* Inject AI Personas at the top of the feed */}
                <AIPersonas />

                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                        <Post post={post} />
                        {/* Inject Explore More after every 5th post */}
                        {(index + 1) % 5 === 0 && <ExploreMore />}
                    </React.Fragment>
                ))}

                {/* Loading Spinner */}
                <div ref={observerTarget} className={styles.loading}>
                    {loading && <div className={styles.spinner} />}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.feed}>
            {/* Stories Placeholder */}
            <div className={styles.storiesContainer}>
                {stories.map((story) => (
                    <div key={story.id} className={styles.storyItem}>
                        <div className={`${styles.storyRing} ${story.viewed ? styles.viewed : ''}`}>
                            <img src={story.user.avatar} alt={story.user.username} className={styles.storyAvatar} />
                        </div>
                        <span className={styles.storyUsername}>{story.user.username}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            {renderTabs()}

            {/* Main Content */}
            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
        </div>
    );
};

export default Home;
