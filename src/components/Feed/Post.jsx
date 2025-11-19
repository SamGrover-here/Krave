import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles } from 'lucide-react';
import styles from './Post.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const Post = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAiActions, setShowAiActions] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const aiActions = [
        { label: 'Remix this', icon: '🎨' },
        { label: 'Ask Aura', icon: '✨' },
        { label: 'Caption', icon: '📝' },
    ];

    return (
        <article className={styles.post}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <div className={styles.avatarRing}>
                        <img src={post.user.avatar} alt={post.user.username} className={styles.avatar} />
                    </div>
                    <div className={styles.userMeta}>
                        <span className={styles.username}>{post.user.username}</span>
                        {post.user.isAI && <span className={styles.aiBadge}>AI</span>}
                    </div>
                </div>
                <button className={styles.moreBtn}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Image */}
            <div className={styles.imageContainer} onDoubleClick={handleLike}>
                <img src={post.image} alt="Post content" className={styles.image} />
                {liked && (
                    <div className={`${styles.heartAnimation} animate-fade-in`}>
                        <Heart size={80} fill="white" color="white" />
                    </div>
                )}

                {/* AI Actions Overlay */}
                <AnimatePresence>
                    {showAiActions && (
                        <motion.div
                            className={styles.aiOverlay}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            {aiActions.map((action) => (
                                <button key={action.label} className={styles.aiActionBtn}>
                                    <span className={styles.aiActionIcon}>{action.icon}</span>
                                    <span className={styles.aiActionLabel}>{action.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <div className={styles.leftActions}>
                    <button onClick={handleLike} className={styles.actionBtn}>
                        <Heart
                            size={24}
                            className={liked ? styles.liked : ''}
                            fill={liked ? '#ff3b30' : 'none'}
                            color={liked ? '#ff3b30' : 'currentColor'}
                        />
                    </button>
                    <button className={styles.actionBtn}>
                        <MessageCircle size={24} />
                    </button>
                    <button className={styles.actionBtn}>
                        <Send size={24} />
                    </button>
                    <button
                        className={`${styles.actionBtn} ${showAiActions ? styles.activeAi : ''}`}
                        onClick={() => setShowAiActions(!showAiActions)}
                    >
                        <Sparkles size={24} className={styles.sparkleIcon} />
                    </button>
                </div>
                <button onClick={() => setSaved(!saved)} className={styles.actionBtn}>
                    <Bookmark
                        size={24}
                        fill={saved ? 'currentColor' : 'none'}
                    />
                </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.likes}>
                    {liked ? post.likes + 1 : post.likes} likes
                </div>
                <div className={styles.caption}>
                    <span className={styles.username}>{post.user.username}</span>
                    <span className={styles.captionText}>{post.caption}</span>
                </div>
                <button className={styles.viewComments}>
                    View all {post.comments} comments
                </button>
                <div className={styles.timeAgo}>{post.timeAgo} ago</div>
            </div>
        </article>
    );
};

export default Post;
