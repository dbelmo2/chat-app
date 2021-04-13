import React, { useState } from 'react'
import "./Form.css";
import { Link } from 'react-router-dom';
import { signup, signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth';
import { auth, db } from '../services/firebase';



function Form({isSignUp}) {


    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    async function googleSignIn() {
        try {
          await signInWithGoogle();
        } catch (error) {
          setError(true);
          setErrorMessage("Google sign in failed");
        }
    }
    async function githubSignIn() {
        try {
          await signInWithGitHub();
        } catch (error) {
          setError(true);
          setErrorMessage("Github sign in failed");
        }
    }


    async function buttonPress(e) {
        e.preventDefault();
        var emailInput = document.getElementById("email-input");
        var passwordInput = document.getElementById("password-input");

        console.log("Email: " + emailInput.value);
        console.log("Password: " + passwordInput.value);

        if(isSignUp === true ) {
            var screenNameInput = document.getElementById("screen-name-input");
                setError(false);
                try {
                    await signup(emailInput.value, passwordInput.value);
                    await db.ref("users").child(auth().currentUser.uid).set(screenNameInput.value);
        
                } catch (error) {
                    console.log(error);
                    setErrorMessage("Sign up failed");
                }
            

        }
        else {
            try {
                await signin(emailInput.value, passwordInput.value);
              } catch (error) {
                setError(true);
                setErrorMessage("Login failed");
              }
        }
        
    }




    return (
        <div className="page--container">
            <div className="page--wrapper">
                <div className="form--pane">


                    <div className="form--header-wrapper">
                        <h1 className="form--header" >The Lounge</h1>
                    </div>
                    {error ? (
                        <>
                            <p className="form--error">{errorMessage}</p>
                        </>
                    ) : null}
                    <form className="form--style" onSubmit={buttonPress}>
                        <input
                        id="email-input"
                        className='email--input-style'
                        name='email'
                        type='email'
                        placeholder='Email'
                        />
                        <input
                        id="password-input"
                        height="50px"
                        className={isSignUp ? 'email--input-style' : 'password--input-style'}
                        name='password'
                        type='password'
                        placeholder='Password'
                        />
                        {isSignUp ? (
                            <input
                                id="screen-name-input"
                                height="50px"
                                className='email--input-style'
                                name='name'
                                type='name'
                                placeholder='User Name'
                            />
                        ):(
                            null
                        )}

                        <button className="ripple" type='submit'>{isSignUp ? "Sign up" : "Log in"}</button>
                    </form>


                </div>
                <div className="form--bottom-wrapper"> 
                    <button onClick={googleSignIn} className="g ripple2" >{isSignUp ? "Sign up with Google" : "Log in with Google"}</button>
                    <button onClick={githubSignIn} className="f ripple3" >{isSignUp ? "Sign Up with Github" : "Log In with Github"}</button>
                </div>
                <div className="form--bottom-text-wrapper"> 
                    <p className="form--bottom-text"> {isSignUp ? "Already have an account?" : "Don't have an account?" } </p>
                    <Link className="form--bottom-text-link" to={isSignUp ? "/LogIn" : "/SignUp"}> {isSignUp ? "Log in" : "Sign up" } </Link>
                </div>
            </div>
        </div>
    )
}

export default Form
