import * as React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import Home from './home/home';
import Community from './community/community';
import Saved from './saved/saved';
import Login from './login/login';
// import Command from './command/command';
import {VideoOptions} from './command/command';

const App: React.FC = () => <BrowserRouter>
  <header>
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-brand">
        <img src='logo.svg' width="64" height="64" />
        <h1>FFmpeg Helper</h1>
      </div>
      <menu className="navbar-nav container-fluid">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="community">Community</NavLink>
        <NavLink className="nav-link" to="saved">Saved</NavLink>
        <NavLink className="nav-link" to="login">Log In</NavLink>
      </menu>
    </nav>
  </header>
  <Routes>
    <Route path="/community" element={<Community />} />
    <Route path="/saved" element={<Saved />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Home />} />
  </Routes>
  <footer>
    <span>
      FFmpeg Helper by Joel Demars <a href='https://github.com/joeldemars/startup'>Source</a> [ BADGE ]
    </span>
    <span>
      <a href='https://github.com/FFmpeg/FFmpeg'>FFmpeg source</a> [ BADGE ]
    </span>
  </footer>
</BrowserRouter>;

export default App;
