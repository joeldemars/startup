import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div>
    <header>
      <nav className="navbar navbar-expand-lg">
          <div className="navbar-brand">
              <img src='logo.svg' width="64" height="64"/>
              <h1>FFmpeg Helper</h1>
          </div>
          <menu className="navbar-nav container-fluid">
              <a className="nav-link active" href='index.html'>Home</a>
              <a className="nav-link" href='community.html'>Community</a>
              <a className="nav-link" href='saved.html'>Saved</a>
              <a className="nav-link" href='login.html'>Log In</a>
          </menu>
      </nav>
    </header>
    <main>App content goes here</main>
    <footer>
      <span>
          FFmpeg Helper by Joel Demars <a href='https://github.com/joeldemars/startup'>Source</a> [ BADGE ]
      </span>
      <span>
          <a href='https://github.com/FFmpeg/FFmpeg'>FFmpeg source</a> [ BADGE ]
      </span>
    </footer>
  </div>;
  // <div className='body bg-dark text-light'>App will display here</div>;
}
