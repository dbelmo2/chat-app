import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import "./JoinCall.css"
import {SocketContext} from '../../../context/socket';

function JoinCall() {
    const socket = useContext(SocketContext);
    let onFormSubmit = (e) => {
        e.preventDefault();
        let inputEl = document.getElementById("key-input");
        socket.emit("sessKey-submit", inputEl.value);
        inputEl.value = "";
        
    }
    const [sessFound, setSessFound] = useState(false);

    useEffect(() => {
        socket.on("no-matching-sess", () => {
            console.log("No matching session found");
        });
        socket.on("matching-sess", () => {
            setSessFound(true);
        });
    }, []);

    if(sessFound) {
        console.log("in sessFound, redirecting to VideoCall:guest");
        return <Redirect to='/VideoCall:guest'/>;
        
    }

    return (
        <div className="JoinCall-container">
            <div className="JoinCall-wrapper">
                <div className="JoinCall-form--wrapper">
                <h1 className="JoinCall-header"> Got a call key?</h1>

                    <form className="JoinCall-form" onSubmit={onFormSubmit}>
                        <input
                            id="key-input"
                            className='JoinCall-input'
                            name='key'
                            type='text'
                            placeholder='Enter key Here'
                        />
                        <button className="ripple" > Join </button>
                    </form>
                </div>
            
            </div>
            
        </div>
    )
}

export default JoinCall
