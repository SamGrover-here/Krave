import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [matchNotifications, setMatchNotifications] = useState([]);

    const notifyMatch = (profile) => {
        setMatchNotifications(prev => [...prev, profile]);
    };

    const clearNotification = () => {
        setMatchNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ matchNotifications, notifyMatch, clearNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
