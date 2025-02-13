import React from 'react';
import './login.css';

const Login: React.FC = () => <main id="login">
    <div className="card login-card">
        <h2>Log In/Sign Up</h2>
        <form method='GET' action='saved.html'>
            <div>
                <label htmlFor='email'>Email Address</label>
                <br />
                <input className="login-text" type='email' name='email' />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <br />
                <input className="login-text" type='password' name='password' />
            </div>
            <div className="login-buttons">
                <input type='submit' value='Create Account' className="btn btn-outline-light login-button" />
                <input type='submit' value='Sign In' className="btn btn-outline-light login-button" />
            </div>
        </form>
    </div>
</main>;

export default Login;