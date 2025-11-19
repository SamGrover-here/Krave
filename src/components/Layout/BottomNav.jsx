import React, { useState, useEffect, useRef } from 'react';
import { Home, Search, Plus, Heart, User, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BottomNav.module.css';
import AuraOverlay from '../Aura/AuraOverlay';

import { useNotification } from '../../context/NotificationContext';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showAura, setShowAura] = useState(false);
    const [showEngagementPopup, setShowEngagementPopup] = useState(false);
    const collapseTimerRef = useRef(null);
    const popupTimerRef = useRef(null);
    const { matchNotifications, clearNotification } = useNotification();

    // Handle scroll for collapse only
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Only collapse on scroll down, never auto-expand
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsExpanded(false);
            }

            setLastScrollY(currentScrollY);
            resetInactivityTimer();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('click', resetInactivityTimer);
        window.addEventListener('touchstart', resetInactivityTimer);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', resetInactivityTimer);
            window.removeEventListener('touchstart', resetInactivityTimer);
        };
    }, [lastScrollY]);

    // Inactivity timer logic
    const lastPopupTimeRef = useRef(0); // Track last time popup was shown

    // Inactivity timer logic
    const resetInactivityTimer = () => {
        setShowEngagementPopup(false);

        if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
        if (popupTimerRef.current) clearTimeout(popupTimerRef.current);

        // Timer 1: Auto-collapse after 3 seconds
        collapseTimerRef.current = setTimeout(() => {
            setIsExpanded(false);
        }, 3000);

        // Timer 2: Show popup after 10 seconds (if not in Aura mode)
        popupTimerRef.current = setTimeout(() => {
            const now = Date.now();
            const timeSinceLastPopup = now - lastPopupTimeRef.current;
            const COOLDOWN = 60000; // 60 seconds cooldown

            if (!showAura && matchNotifications.length === 0 && timeSinceLastPopup > COOLDOWN) {
                setShowEngagementPopup(true);
                lastPopupTimeRef.current = now;
            }
        }, 10000);
    };

    // Force collapse when match notification arrives
    useEffect(() => {
        if (matchNotifications.length > 0) {
            setIsExpanded(false);
        }
    }, [matchNotifications]);

    useEffect(() => {
        resetInactivityTimer();
        return () => {
            if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
            if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
        };
    }, [isExpanded, showAura, matchNotifications]);

    // Clear notifications when entering Activity screen
    useEffect(() => {
        if (location.pathname === '/activity') {
            clearNotification();
        }
    }, [location.pathname]);

    const handleMatchClick = () => {
        clearNotification();
        navigate('/search'); // Or to a specific chat/profile
        setIsExpanded(true);
    };

    const navItems = [
        { icon: Home, path: '/', label: 'Home' },
        { icon: Search, path: '/search', label: 'Search' },
        { icon: Sparkles, path: 'aura', label: 'Aura', isSpecial: true },
        { icon: Heart, path: '/activity', label: 'Activity' },
        { icon: User, path: '/profile', label: 'Profile' },
    ];

    const activeItem = navItems.find(item => item.path === location.pathname) || navItems[0];

    return (
        <>
            <motion.nav
                className={styles.nav}
                initial={false}
                animate={{
                    width: isExpanded ? '360px' : '60px',
                    height: isExpanded ? '70px' : '60px',
                    borderRadius: '35px',
                    bottom: '20px',
                    // New Strategy: Left + Negative Margin
                    left: isExpanded ? '50%' : '100%',
                    marginLeft: isExpanded ? '-180px' : '-80px', // -180 is half of 360, -80 is 60w + 20margin
                    x: 0, // Reset transform
                }}
                transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                    mass: 0.8 // Slightly lighter feel
                }}
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                <div className={styles.contentContainer}>
                    {/* Full Menu */}
                    <motion.div
                        className={styles.fullMenu}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            pointerEvents: isExpanded ? 'auto' : 'none'
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            if (item.isSpecial) {
                                return (
                                    <div key="aura" className={styles.auraWrapper}>
                                        <button
                                            className={styles.auraButton}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowAura(true);
                                            }}
                                        >
                                            <div className={styles.auraOrb}>
                                                <Icon size={24} color="white" />
                                            </div>
                                        </button>
                                    </div>
                                );
                            }

                            return (
                                <button
                                    key={item.path}
                                    className={`${styles.item} ${isActive ? styles.active : ''} `}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(item.path);
                                    }}
                                >
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Collapsed Icon (Active Page) */}
                    <motion.div
                        className={styles.collapsedIcon}
                        animate={{
                            opacity: isExpanded ? 0 : 1,
                            scale: isExpanded ? 0.5 : 1
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <activeItem.icon size={28} color="black" />
                    </motion.div>
                </div>
            </motion.nav>

            {/* Engagement Popup */}
            <AnimatePresence>
                {showEngagementPopup && !isExpanded && matchNotifications.length === 0 && (
                    <motion.div
                        className={styles.engagementPopup}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        onClick={() => setIsExpanded(true)}
                    >
                        <span className={styles.popupText}>✨ Explore more?</span>
                        <div className={styles.popupArrow} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Match Notification Popup - Only show if NOT on Search page */}
            <AnimatePresence>
                {matchNotifications.length > 0 && !isExpanded && location.pathname !== '/search' && (
                    <motion.div
                        className={styles.matchPopup}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        onClick={handleMatchClick}
                    >
                        <div className={styles.matchContent}>
                            {matchNotifications.length === 1 ? (
                                <>
                                    <img src={matchNotifications[0].avatar} alt="" className={styles.matchAvatarSmall} />
                                    <span className={styles.matchTitle}>Match: {matchNotifications[0].name}</span>
                                </>
                            ) : (
                                <span className={styles.matchTitle}>❤️ {matchNotifications.length} Matches Made</span>
                            )}
                        </div>
                        <div className={styles.popupArrowMatch} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showAura && <AuraOverlay onClose={() => setShowAura(false)} />}
            </AnimatePresence>
        </>
    );
};

export default BottomNav;
