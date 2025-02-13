import React from 'react';
import './login';

export default function Login() {
    return <main>
        <div className="card">
            <h2>Log In/Sign Up</h2>
            <form method='GET' action='saved.html'>
                <div>
                    <label for='email'>Email Address</label>
                    <br />
                    <input type='email' name='email' />
                </div>
                <div>
                    <label for='password'>Password</label>
                    <br />
                    <input type='password' name='password' />
                </div>
                <div className="buttons">
                    <input type='submit' value='Create Account' className="btn btn-outline-light" />
                    <input type='submit' value='Sign In' className="btn btn-outline-light" />
                </div>
            </form>
        </div>
    </main>;
}