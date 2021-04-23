import React, { useEffect, useState } from "react";
import { auth } from "../../../services/firebase";
import { db } from "../../../services/firebase";
import { signOut } from '../../../helpers/auth';
import './Chat.css';
import { FaPaperPlane, FaSignOutAlt } from 'react-icons/fa'




function Chat() {
    /*
    async function signOutHandler() {
        try {
            await signOut();
          } catch (error) {
                console.log("sign out failed");
          }
    }
    */


    const [user, setUser] = useState(auth().currentUser);
    const [chats, setChats] = useState([]);
    const [readError, setReadError] = useState(null);
    const [userName, setUserName] = useState(user.email);
    const [writeError, setWriteError] = useState(null);

    

    const scrollBottom = () => {
        let scrollBox = document.getElementById('scrollBox');
        scrollBox.scrollTop = scrollBox.scrollHeight;
    }
   

    async function handleSubmit(e){
        e.preventDefault();
        let content = document.getElementById("message-input").value;
        if(content === '') return;
        setWriteError(null);
        try {
            await db.ref("chats").push({
              content: content,
              timestamp: Date.now(),
              sender: userName
            });
            document.getElementById("message-input").value='';
          } catch (error) {
            setWriteError(error.message);
          }


    }

    useEffect(() => {
        setReadError(null);
        try{
            
            db.ref('/users/' + user.uid).once('value').then((snapshot) => {
                
                if(snapshot.val() != null) {
                
                
                    setUserName(snapshot.val());
                }
                console.log("Username set to: " + userName);



                
              });


            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                setChats([...chats]);
                

                setTimeout(scrollBottom, 200);
        

            });

        }
        catch(error) {
            console.log(error);
            setReadError(error.message);
        }
      }, [user.id, userName]);

    return (
        <div className="Chat--container">
            <div className="Chat--navbar">
                <h1 className="Chat--header">the Lounge</h1>
                <button onClick={signOut} style={{alignSelf:'flex-end', marginLeft: 0, marginTop: 0}} className="signout ripple"> <FaSignOutAlt size={30}/></button>
            </div>
            <div id="scrollBox" className="Chat--wrapper">
                {chats.map((item, index) => {
                    console.log("Sender: " + item.sender + " content: " + item.content);
                    return (

                        <div style={{alignSelf: item.sender === userName ? "flex-end" : "flex-start"}} className="Chat--message-wrapper">
                           
                            <div style={{display: 'flex', justifyContent: item.sender === userName ?  'flex-end':'flex-start'}} >
                                <p style={{marginLeft: item.sender === userName ? 0 : 7, marginRight: item.sender === userName? 7:0} } className="Chat--sender-name"> {item.sender} </p>
                            </div>
                            <div style={{justifyContent: item.sender === userName ? 'flex-end':'flex-start'}} className="Chat--message-bubble">
                                <p className="Chat--message" key={item.timestamp}>{item.content}</p>
                            </div>
                        </div>
                    )





                })}
            </div>
            <div className="Chat--input-wrapper">
                <form onSubmit={handleSubmit}>
                    <input
                    id="message-input"
                    className='Chat--message-input'
                    name='message'
                    type='message'
                    placeholder='Aa'
                    />

                    <button className="send-button ripple" >
                        <FaPaperPlane size={20} style={{marginRight:1}}/>
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Chat
