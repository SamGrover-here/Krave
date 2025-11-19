import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import styles from './MatchOverlay.module.css';

const MatchOverlay = ({ matchedProfile, onClose }) => {
    useEffect(() => {
        // Trigger haptics if available
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([100, 50, 100]);
        }
    }, []);

    return (
        <motion.div
            className={styles.overlay}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
        >
            <div className={styles.content}>
                <motion.h1
                    className={styles.title}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    It's a Match!
                </motion.h1>

                <p className={styles.subtitle}>You and {matchedProfile.name} have connected.</p>

                <div className={styles.avatars}>
                    <motion.div
                        className={styles.avatarWrapper}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                    >
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" alt="You" className={styles.avatar} />
                    </motion.div>
                    <motion.div
                        className={styles.avatarWrapper}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                    >
                        <img src={matchedProfile.avatar} alt={matchedProfile.name} className={styles.avatar} />
                    </motion.div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.chatBtn}>
                        <MessageCircle size={20} />
                        Send a Message
                    </button>
                    <button className={styles.keepSwipingBtn} onClick={onClose}>
                        Keep Swiping
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MatchOverlay;
