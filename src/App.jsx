import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import AddPost from './pages/AddPost';
import Activity from './pages/Activity';
import Profile from './pages/Profile';

import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="app-container">
          {/* Assuming TopBar, AnimatedRoutes, and BottomNav are new components */}
          {/* You might need to import them if they are not already */}
          {/* <TopBar /> */}
          <main className="main-content">
            {/* <AnimatedRoutes /> */}
            {/* The original Routes structure is replaced by AnimatedRoutes in this example */}
            {/* If you still need the original routes, you'd integrate them within AnimatedRoutes or here */}
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="add" element={<AddPost />} />
                <Route path="activity" element={<Activity />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </main>
          {/* <BottomNav /> */}
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
