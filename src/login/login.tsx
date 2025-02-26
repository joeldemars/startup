import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

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

    const tryCreateAccount = (email: string, password: string) => {
        if (createAccount(email, password)) {
            if (logIn(email, password)) {
                callback(email);
                navigate("/home");
            }
        }
    };

    const tryLogIn = (email: string, password: string) => {
        if (logIn(email, password)) {
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

function createAccount(email: string, password: string): boolean {
    let accounts: Account[] = JSON.parse(localStorage.getItem("accounts") ?? "[]");
    if (accounts.some((account) => account.email == email)) {
        alert("A user has already registered with the given email address");
        return false;
    } else {
        accounts.push({
            email: email,
            password: password,
        });
        localStorage.setItem("accounts", JSON.stringify(accounts));
        return true;
    }
}

function logIn(email: string, password: string): boolean {
    let accounts: Account[] = JSON.parse(localStorage.getItem("accounts") ?? "[]");
    let account = accounts.find((account) => account.email == email);
    if (account != null) {
        if (account.password != password) {
            alert("Password incorrect");
            return false;
        } else {
            localStorage.setItem("loggedIn", "true");
            return true;
        }
    } else {
        alert("Email not found");
        return true;
    }
}

export default Login;