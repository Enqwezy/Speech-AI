import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu as MenuIcon, History, Mic, Settings, ShoppingCart, Home as HomeIcon, AccountCircle } from '@mui/icons-material';
import Home from './components/Home';
import UsersList from './components/UsersList';
import Record from './components/Record';
import Results from './components/Results';
import HistoryPage from './components/History';
import SettingsPage from './components/Settings';
import Cart from './components/Cart';
import Feedback from './components/Feedback';
import Login from './components/Login';
import Register from './components/Register';
import { HistoryProvider } from './contexts/HistoryContext';
import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) setUser(storedUser);
  }, []);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const menuItems = [
    { text: 'Басты бет', icon: <HomeIcon />, path: '/' },
    { text: 'Жазба жасау', icon: <Mic />, path: '/record' },
    { text: 'Нәтиже беті', icon: <History />, path: '/results' },
    { text: 'Тарих беті', icon: <History />, path: '/history' },
    { text: 'Параметрлер беті', icon: <Settings />, path: '/settings' },
    { text: 'Корзина', icon: <ShoppingCart />, path: '/cart' },
    { text: 'Обратная связь', icon: <AccountCircle />, path: '/feedback' },
    { text: 'Пользователи', icon: <AccountCircle />, path: '/users' },
  ];

  return (
    <HistoryProvider currentUser={user}>
      <Router>
        <div className="App">
          <AppBar position="fixed" className="app-bar">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <h2 className="app-title">Speech AI Platform</h2>
              {user ? (
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                  <Avatar style={{ marginRight: 10 }}>{user.name[0]}</Avatar>
                  <span>{user.name}</span>
                  <button onClick={handleLogout} style={{ marginLeft: 20 }}>Выйти</button>
                </div>
              ) : (
                <Link to="/login" style={{ marginLeft: 'auto', color: '#fff' }}>Войти</Link>
              )}
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
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              <Route path="/record" element={user ? <Record /> : <Navigate to="/login" />} />
              <Route path="/results" element={user ? <Results /> : <Navigate to="/login" />} />
              <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" />} />
              <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
              <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
              <Route path="/feedback" element={user ? <Feedback /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users" element={user ? <UsersList /> : <Navigate to="/login" />} /> {/* Новый маршрут */}
            </Routes>
          </div>
        </div>
      </Router>
    </HistoryProvider>
  );
}

export default App;
