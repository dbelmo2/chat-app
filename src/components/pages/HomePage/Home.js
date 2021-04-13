import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div className="home--container">
            <div className="home--wrapper">
                <div className="header--wrapper">
                    <h1 className="header--style"> the Lounge </h1>
                </div>
                <div className="buttons--wrapper">
                    <Link to="/LogIn">
                        <button class="ripple"> Log In </button>
                    </Link>
                    <Link to="/SignUp">
                        <button class="ripple"> Sign Up </button>
                    </Link>

                </div>
            </div>
            
        </div>
    )
}

export default Home
