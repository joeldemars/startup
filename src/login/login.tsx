import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { authenticate, register } from '../api/api';

interface Account {
    email: string,
    password: string,
}

interface LoginProps {
    callback: (user: string) => void,
}

const Login: React.FC<LoginProps> = ({callback}) => {
    const [email, updateEmail] = React.useState("");
    const [password, updatePassword] = React.useState("");

    const navigate = useNavigate();

    const tryCreateAccount = async (email: string, password: string) => {
        let response = await register(email, password);
        if (response.status == 409) {
            alert("A user has already registered with the given email address");
        } else if (response.status == 200) {
            callback(email);
            navigate("/home");
        }
    };

    const tryLogIn = async (email: string, password: string) => {
        let response = await authenticate(email, password);
        if (response.status == 400) {
            alert("Email not found");
        } else if (response.status == 403) {
            alert("Password incorrect");
        } else if (response.status == 200) {
            callback(email);
            navigate("/home");
        }
    };

    return <main id="login">
        <div className="card login-card">
            <h2>Log In/Sign Up</h2>
            <div>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <br />
                    <input className="login-text" type='email' id='email' value={email} onChange={(event) => updateEmail(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <br />
                    <input className="login-text" type='password' id='password' value={password} onChange={(event) => updatePassword(event.target.value)}/>
                </div>
                <div className="login-buttons">
                    <input type='submit' value='Create Account' className="btn btn-outline-light login-button" onClick={() => tryCreateAccount(email, password)}/>
                    <input type='submit' value='Log In' className="btn btn-outline-light login-button" onClick={() => tryLogIn(email, password)} />
                </div>
            </div>
        </div>
    </main>;
}

export default Login;