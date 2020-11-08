import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSingIn, handleFbSignIn, handleSingOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from './loginManager';


function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSingIn = () => {
        handleGoogleSingIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .teen(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const signOut = () => {
        handleSingOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.value === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })

        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }
        e.preventDefault();
    }


    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignIn ? <button onClick={signOut}>Sign out</button> :
                    <button onClick={googleSingIn}>Sign in with Google</button>
            }
            <br /> <br />
            <button onClick={fbSignIn}>Sign in with Facebook</button>
            {
                user.isSignIn &&
                <div>
                    <p>Welcome {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h1>Our Own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Enter your name" />}<br /><br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Enter your email" required /><br /><br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required /><br /><br />
                <input type="submit" value={newUser ? "Sign Up" : "Login"} />
            </form>
            <button onclick{() => resetPassword(user.email)}>Reset Password</button>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>{newUser ? 'Create' : 'Login'} Successfully</p>}
        </div >
    );
}

export default Login;
