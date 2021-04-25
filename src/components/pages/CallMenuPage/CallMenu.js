import React from 'react'
import Peer from 'simple-peer'
import { useEffect } from 'react'
import "./CallMenu.css"
import { FaUserFriends, FaVideo } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom';






function CallMenu() {





    return (
        <div className="CallMenu-container">
            <div className="CallMenu-wrapper">
                <div className="CallMenu-button--wrapper">
                    <Link to="/VideoCall:host" className="CallMenu-button"> <FaVideo color="white" size={70}/> </Link>
                    <label className="CallMenu-button--label">Host a call</label>
                </div>
                <div className="CallMenu-button--wrapper">
                    <Link to="/JoinCall" className="CallMenu-button"> <FaUserFriends color="white" size={70}/> </Link>
                    <label className="CallMenu-button--label">Join a call</label>
                </div>
            </div>
        </div>
    )
}

export default CallMenu
