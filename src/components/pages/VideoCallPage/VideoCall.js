import React, { useEffect, useState } from 'react'
import "./VideoCall.css"
import { FaMicrophone, FaVideo, FaPhoneSlash } from 'react-icons/fa'
import Peer from 'simple-peer'



function VideoCall() {
    const [participants, setParticipants] = useState([]);
    
    function gotMedia(stream) {
        var peer1 = new Peer({ initiator: true, stream: stream })
        setParticipants(participants => [...participants, peer1]);
    }


    useEffect(() => {
        console.log('before getUserMedia');
        console.log(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia({
            audio: true,
            
        }).then(gotMedia).catch(() => {});
        console.log('after getUserMedia');

    }, []);
    
    return (
        <div className="VideoCall-container">
            <div className="VideoCall-wrapper">
                {participants.map((participant, index) => (
                    <div className="VideoCall-stream--wrapper">
                        <video id={index} autoPlay>
                            <source src={participant.stream} type='video/mp4' />
                        </video>
                    </div>
                ))}
            </div>
            <div className="VideoCall-bar">

                <div className="VideoCall-bar--button--wrapper">
                    <button className="VideoCall-bar--button ripple"><FaMicrophone size={30} color="white"/></button>
                </div>
                <div className="VideoCall-bar--button--wrapper">
                    <button className="VideoCall-bar--button ripple"><FaPhoneSlash size={30} color="white"/></button>
                </div>
                <div className="VideoCall-bar--button--wrapper">
                    <button className="VideoCall-bar--button ripple"><FaVideo color="white" size={30}/></button>
                </div>

            </div>
        </div>
    )
}

export default VideoCall
