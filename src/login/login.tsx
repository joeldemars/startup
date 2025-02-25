import * as React from 'react';
import './login.css';

interface Account {
    email: string,
    password: string,
}

const Login: React.FC<Account | {}> = (props) => {
    const [email, updateEmail] = React.useState((props as Account).email ?? "");
    const [password, updatePassword] = React.useState((props as Account).password ?? "");

    return <main id="login">
        <div className="card login-card">
            <h2>Log In/Sign Up</h2>
            <div>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <br />
                    <input className="login-text" type='email' name='email' value={email} onChange={(event) => updateEmail(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <br />
                    <input className="login-text" type='password' name='password' value={password} onChange={(event) => updatePassword(event.target.value)}/>
                </div>
                <div className="login-buttons">
                    <input type='submit' value='Create Account' className="btn btn-outline-light login-button" onClick={() => createAccount(email, password)}/>
                    <input type='submit' value='Sign In' className="btn btn-outline-light login-button" />
                </div>
            </div>
        </div>
    </main>;
}

function createAccount(email: string, password: string) {
    let accounts: Account[] = JSON.parse(localStorage.getItem("accounts") ?? "[]");
    if (accounts.some((account) => account.email == email)) {
        alert("A user has already registered with the given email address");
    } else {
        accounts.push({
            email: email,
            password: password,
        });
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }
}

function logIn(email: string, password: string) {
    let accounts: Account[] = JSON.parse(localStorage.getItem("accounts") ?? "[]");
    let account = accounts.find((account) => account.email == email);
    if (account != null) {
        if (account.password != password) {
            alert("Password incorrect");
        } else {
            localStorage.setItem("loggedIn", "true");
        }
    } else {
        alert("Email not found");
    }
}

export default Login;