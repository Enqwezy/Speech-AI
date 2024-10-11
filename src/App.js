import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, History, Mic, Settings, ShoppingCart, Home as HomeIcon, AccountCircle } from '@mui/icons-material';
import Home from './components/Home';
import Record from './components/Record';
import Results from './components/Results';
import Cart from './components/Cart';
import HistoryPage from './components/History';
import SettingsPage from './components/Settings';
import Feedback from './components/Feedback'; 
import { HistoryProvider } from './contexts/HistoryContext'; // Импортируем контекст истории
import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Басты бет', icon: <HomeIcon />, path: '/' },
    { text: 'Жазба жасау', icon: <Mic />, path: '/record' },
    { text: 'Нәтиже беті', icon: <History />, path: '/results' },
    { text: 'Тарих беті', icon: <History />, path: '/history' },
    { text: 'Параметрлер беті', icon: <Settings />, path: '/settings' },
    { text: 'Корзина', icon: <ShoppingCart />, path: '/cart' },
    { text: 'Обратная связь', icon: <AccountCircle />, path: '/feedback' },
  ];

  return (
    <HistoryProvider>
      <Router>
        <div className="App">
          <AppBar position="fixed" className="app-bar">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <h2 className="app-title">Speech AI Platform</h2>
            </Toolbar>
          </AppBar>

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div className="menu-header">
              <h3>Меню</h3>
            </div>
            <List className="menu-list">
              {menuItems.map((item, index) => (
                <ListItem button key={index} component={Link} to={item.path} className="menu-item">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/record" element={<Record />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </div>
        </div>
      </Router>
    </HistoryProvider>
  );
}

export default App;