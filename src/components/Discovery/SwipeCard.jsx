import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { Info, X, Heart } from 'lucide-react';
import styles from './SwipeCard.module.css';

const SwipeCard = ({ profile, onSwipe, style }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const x = useMotionValue(0);
    const controls = useAnimation();

    const rotate = useTransform(x, [-200, 200], [-10, 10]); // Reduced rotation for elegance
    // Instant feedback: Opacity reaches 100% with very little movement (20px)
    const opacityLike = useTransform(x, [0, 20], [0, 1]);
    const opacityNope = useTransform(x, [0, -20], [0, 1]);

    // Auto-scroll photos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length);
        }, 3000); // Change photo every 3 seconds

        return () => clearInterval(interval);
    }, [profile.photos.length]);

    const handleDragEnd = async (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > 100 || velocity > 500) {
            await controls.start({ x: 500, opacity: 0, transition: { duration: 0.4, ease: "backIn" } });
            onSwipe('right', profile);
        } else if (offset < -100 || velocity < -500) {
            await controls.start({ x: -500, opacity: 0, transition: { duration: 0.4, ease: "backIn" } });
            onSwipe('left', profile);
        } else {
            // Smooth return to center
            controls.start({ x: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } });
        }
    };

    return (
        <motion.div
            className={styles.card}
            style={{ x, rotate, ...style }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            whileTap={{ scale: 0.98 }}
        >
            {/* Stamps - Redesigned as subtle glows/icons */}
            <motion.div className={styles.overlayLike} style={{ opacity: opacityLike }}>
                <div className={styles.actionIconLike}><Heart size={40} fill="white" /></div>
            </motion.div>
            <motion.div className={styles.overlayNope} style={{ opacity: opacityNope }}>
                <div className={styles.actionIconNope}><X size={40} /></div>
            </motion.div>

            {/* Photo Carousel */}
            <div className={styles.photoContainer} onClick={() => setShowInfo(!showInfo)}>
                <AnimatePresence mode='wait'>
                    <motion.img
                        key={currentPhotoIndex}
                        src={profile.photos[currentPhotoIndex]}
                        alt={profile.name}
                        className={styles.photo}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>

                {/* Progress Bar Indicators */}
                <div className={styles.progressContainer}>
                    {profile.photos.map((_, idx) => (
                        <div key={idx} className={styles.progressTrack}>
                            <motion.div
                                className={styles.progressBar}
                                initial={{ width: "0%" }}
                                animate={{
                                    width: idx === currentPhotoIndex ? "100%" : (idx < currentPhotoIndex ? "100%" : "0%")
                                }}
                                transition={{
                                    duration: idx === currentPhotoIndex ? 3 : 0,
                                    ease: "linear"
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Minimal Info Overlay */}
            <div className={styles.infoOverlay}>
                <div className={styles.header}>
                    <div className={styles.titleRow}>
                        <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
                        <div>
                            <h2 className={styles.name}>{profile.name}, <span className={styles.age}>{profile.age}</span></h2>
                            <p className={styles.role}>{profile.role}</p>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            className={styles.details}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            <p className={styles.bio}>{profile.bio}</p>
                            <div className={styles.interests}>
                                {profile.interests.map(interest => (
                                    <span key={interest} className={styles.interestTag}>
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button className={styles.infoBtn}>
                    <Info size={18} color="rgba(255,255,255,0.8)" />
                </button>
            </div>
        </motion.div>
    );
};

export default SwipeCard;
