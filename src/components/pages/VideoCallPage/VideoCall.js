import React, { useContext, useEffect, useState } from 'react'
import "./VideoCall.css"
import { FaMicrophone, FaVideo, FaPhoneSlash } from 'react-icons/fa'
import Peer from 'simple-peer'
import {SocketContext} from '../../../context/socket';
import { Link, useParams } from 'react-router-dom';




function VideoCall() {
    const socket = useContext(SocketContext);
    const {PeerType} = useParams();
    const isHost = PeerType === ":host" ? true : false;
    const [participants, setParticipants] = useState([{name: "host", stream: null}]);
    const [stream, setStream] = useState(undefined);
    const [peer, setPeer] = useState(undefined);
    const [sessKey, setSessKey] = useState("");
    const [mute, setMute] = useState(false);
    const [cameraOff, setCameraOff] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    

    // Called when the user grants media access
    function gotMedia(stream) {
        setStream(stream);
        console.log("in got media()");
        const thisPeer = new Peer({ initiator: isHost, stream: stream, trickle: false });
        setPeer(thisPeer);
        thisPeer.on('signal', data => {
            console.log(PeerType);
            console.log(isHost);
            if(isHost) { 
                socket.emit("host-signal", data);
            } else {
                console.log("firing geust-signal");
                
                socket.emit("guest-signal", data); 
            }

        });
        var videoElement = document.getElementById("stream:0");
        videoElement.srcObject = stream;

        thisPeer.on('stream', stream => {
            console.log("adding foreign stream");
            var vidEl = document.getElementById('stream:1');
            vidEl.srcObject = stream;

        });
        socket.on("signal-data", (data) => {
            console.log("in signal-data");
            var newParticipants = participants => [...participants, {name: "guest", stream: null}];
            setParticipants(newParticipants);
            try {
               thisPeer.signal(data);
               console.log("accepted the peers signal");
            }
            catch(error) {
                console.log(error);
            }

        });
        thisPeer.on('close' ,() => {
            setCallEnded(true);
        })
    }

    useEffect(() => {
        console.log("In useeffect, peer: " + peer);
        if(!isHost && peer) { 
            console.log("In useEffect, emitting get-host-data");
            socket.emit("get-host-data");
        }
    }, [peer]);

    
    useEffect(() => {
        
        socket.emit(PeerType === ":host" ? 
         "hosting-video-call" :
         "joining-video-call");

        socket.on("session-key", (data) => {
            setSessKey(data);
            console.log("received sessKey: " + data);
        });
       

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
            
        }).then(gotMedia).catch(() => {});

    }, []);

    const handleMuteClick = () => {
        stream.getAudioTracks()[0].enabled = mute;
        setMute(!mute);
    }

    const handleCameraClick = () => {
        stream.getVideoTracks()[0].enabled = cameraOff;
        setCameraOff(!cameraOff);
    }
    const handleEndCall = () => {
        peer.destroy();
        setCallEnded(true);
    };
    return (
        <div className="VideoCall-container">
            {callEnded ? 
            <div className="VideoCall-callEnded--wrapper">
            <h1 style={{color:'white'}}>
                Call ended
            </h1>
            <Link to="/CallMenu" className="VideoCall-back--button ripple">Back to Menu</Link>
            </div>: 
            <div className="VideoCall-wrapper">
                {participants.map((participant, index) => (
                    <div id={participant.name} className="VideoCall-stream--wrapper">
                        <video className="VideoCall-stream--player" id={"stream:"+index} muted={index < 1 ? true : false} autoPlay={true}>
                            <source src={participant.stream} type='video/mp4' />
                        </video>
                    </div>
                ))}
            </div>}

            <div className="VideoCall-bar">
                <h3 className="VideoCall-bar--key">
                    {sessKey === "" ? "" : "Session Key: " + sessKey}
                </h3>
                <div className="VideoCall-bar--buttons-wrapper">
                    <div className="VideoCall-bar--button--wrapper">
                        <button onClick={handleMuteClick} className="VideoCall-bar--button ripple"><FaMicrophone size={30} color={mute ? "#242424":"#fff"}/></button>
                    </div>
                    <div className="VideoCall-bar--button--wrapper">
                        <button onClick={handleEndCall} className="VideoCall-bar--button ripple"><FaPhoneSlash size={30} color="#fff"/></button>
                    </div>
                    <div className="VideoCall-bar--button--wrapper">
                        <button onClick={handleCameraClick} className="VideoCall-bar--button ripple"><FaVideo color={cameraOff ? "#242424" : "#fff"} size={30}/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCall
