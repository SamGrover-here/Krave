import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, MessageCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';
import SwipeCard from '../components/Discovery/SwipeCard';
import MatchOverlay from '../components/Discovery/MatchOverlay';
import { aiPersonas } from '../data/mockData';
import { useNotification } from '../context/NotificationContext';

const Search = () => {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState(aiPersonas);
    const [matchedProfile, setMatchedProfile] = useState(null);
    // const [showMatches, setShowMatches] = useState(false); // Removed local toggle
    // const [matchHistory, setMatchHistory] = useState([]); // Removed local history
    const { notifyMatch } = useNotification();

    const handleSwipe = (direction, profile) => {
        // ... (keep existing logic)
        // Remove the swiped card from the stack
        setTimeout(() => {
            setPersonas((prev) => prev.filter((p) => p.id !== profile.id));
        }, 200); // Wait for animation to start

        if (direction === 'right') {
            // Calculate delay based on attitude (0-10 scale)
            // Higher attitude = longer wait (up to 10 seconds)
            const attitude = profile.attitude || 5;
            const delay = attitude * 1000;

            console.log(`Swiped right on ${profile.name}. Attitude: ${attitude}. Delay: ${delay}ms`);

            setTimeout(() => {
                // Simulate match success (80% chance for demo)
                const isMatch = Math.random() > 0.2;
                if (isMatch) {
                    setMatchedProfile(profile);
                    notifyMatch(profile);
                    // setMatchHistory(prev => [profile, ...prev]); // No longer needed locally
                }
            }, delay);
        }
    };

    const handleReset = () => {
        setPersonas(aiPersonas);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Discover</h1>
                <div className={styles.headerActions}>
                    <button className={styles.filterBtn} onClick={() => navigate('/activity')}>
                        <Clock size={20} />
                    </button>
                    <button className={styles.filterBtn}>
                        <SlidersHorizontal size={20} />
                    </button>
                </div>
            </div>

            <div className={styles.cardStack}>
                <AnimatePresence>
                    {personas.map((persona, index) => (
                        <SwipeCard
                            key={persona.id}
                            profile={persona}
                            onSwipe={handleSwipe}
                            style={{ zIndex: personas.length - index }}
                        />
                    ))}
                </AnimatePresence>

                {personas.length === 0 && (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}>🎉</span>
                        <h3>You've seen everyone!</h3>
                        <p>Check back later for more AI friends.</p>
                        <button className={styles.resetBtn} onClick={handleReset}>
                            Start Over
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.bottomActions}>
                <button className={styles.matchesBtn} onClick={() => navigate('/activity')}>
                    Matches
                </button>
            </div>

            <AnimatePresence>
                {matchedProfile && (
                    <MatchOverlay
                        matchedProfile={matchedProfile}
                        onClose={() => setMatchedProfile(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Search;
