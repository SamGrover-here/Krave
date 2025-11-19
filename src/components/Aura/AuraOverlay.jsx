import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff } from 'lucide-react';
import styles from './AuraOverlay.module.css';

const AuraOverlay = ({ isOpen, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [mode, setMode] = useState('idle'); // idle, listening, speaking

    useEffect(() => {
        if (isOpen) {
            // Reset state when opened
            setMode('idle');
            setIsListening(false);
        }
    }, [isOpen]);

    const toggleListening = () => {
        if (mode === 'listening') {
            setMode('idle');
            setIsListening(false);
        } else {
            setMode('listening');
            setIsListening(true);
            // Simulate AI response after a few seconds
            setTimeout(() => {
                setMode('speaking');
                setTimeout(() => {
                    setMode('idle');
                    setIsListening(false);
                }, 4000);
            }, 3000);
        }
    };

    // Blob animation variants
    const blobVariants = {
        idle: {
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%"],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "linear"
            }
        },
        listening: {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "40%", "60%", "50%"],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        speaking: {
            scale: [1, 1.5, 0.8, 1.2, 1],
            rotate: [0, -45, 45, 0],
            borderRadius: ["50%", "30%", "70%", "40%", "60%"],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={32} />
                    </button>

                    <div className={styles.content}>
                        <div className={styles.blobContainer}>
                            <motion.div
                                className={`${styles.blob} ${styles[mode]}`}
                                variants={blobVariants}
                                animate={mode}
                            />
                            {/* Inner glow/core */}
                            <motion.div
                                className={styles.core}
                                animate={{
                                    scale: mode === 'speaking' ? [1, 1.2, 1] : 1,
                                    opacity: mode === 'listening' ? 0.8 : 0.5
                                }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            />
                        </div>

                        <div className={styles.statusText}>
                            {mode === 'idle' && "Tap to speak with Aura"}
                            {mode === 'listening' && "Listening..."}
                            {mode === 'speaking' && "Aura is speaking..."}
                        </div>

                        <button
                            className={`${styles.micButton} ${isListening ? styles.active : ''}`}
                            onClick={toggleListening}
                        >
                            {isListening ? <Mic size={32} /> : <MicOff size={32} />}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuraOverlay;
