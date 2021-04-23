import React, { useState } from 'react'
import "./JoinCall.css"

function JoinCall() {

    let onFormSubmit = () => {}
    const [key, setKey] = useState("");


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
