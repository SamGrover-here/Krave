import React from 'react';
import { Users, MessageCircle, Heart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ExploreMore.module.css';

const ExploreMore = () => {
    const navigate = useNavigate();

    const cards = [
        {
            id: 'friends',
            title: 'Find more friends',
            subtitle: 'Discover people who share your vibe and interests.',
            icon: Users,
            cta: 'Make matches',
            link: '/search',
            variant: styles.cardFriends
        },
        {
            id: 'message',
            title: 'Recent message',
            subtitle: 'Sarah sent you a photo from her trip to Bali.',
            icon: MessageCircle,
            cta: 'Reply',
            link: '/activity',
            variant: styles.cardMessage
        },
        {
            id: 'match',
            title: 'New Match',
            subtitle: 'You and Alex matched! Say hello before the timer runs out.',
            icon: Heart,
            cta: 'View Profile',
            link: '/search',
            variant: styles.cardMatch
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Explore more in Krave</span>
            </div>
            <div className={styles.scrollContainer}>
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.id} className={`${styles.card} ${card.variant}`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={20} />
                                </div>
                                <span className={styles.cardTitle}>{card.title}</span>
                            </div>
                            <p className={styles.cardSubtitle}>{card.subtitle}</p>
                            <button
                                className={styles.ctaButton}
                                onClick={() => navigate(card.link)}
                            >
                                {card.cta}
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExploreMore;
