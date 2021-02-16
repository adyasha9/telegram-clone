import { Avatar, IconButton } from '@material-ui/core'
import  MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import React, { useEffect, useState } from 'react'
import './Thread.css'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import  MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined'
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined'
import {AttachFileOutlined} from '@material-ui/icons'
import db from '../firebase'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { selectThreadId, selectThreadName } from '../features/threadSlice'
import { selectUser } from '../features/userSlice'
import Message from './Message'
import * as timeago from 'timeago.js'
import FlipMove from 'react-flip-move'

const Thread = () => {

    const[input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [notEmpty, setNotEmpty] = useState(false);
    const threadName = useSelector(selectThreadName)
    const threadId = useSelector(selectThreadId)
    const user = useSelector(selectUser)
    const [selfDestruct, setSelfDestruct] = useState(0);

    useEffect(() =>{
        if(threadId){
            db
            .collection('threads')
            .doc(threadId)
            .collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) =>({
                id : doc.id,
                data: doc.data()
        }))))
        }
    },[threadId])

    const sendMessage = (e) => {
        e.preventDefault();
         handleTimeOut(input,user.uid);
            db
            .collection('threads')
            .doc(threadId)
            .collection('messages')
            .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        })

        setInput('')
        
        //console.log(messages)
    };

    useEffect(() =>{
        if(input !==''){
         setNotEmpty(true);
        } else{
            setNotEmpty(false);
        }
    },[input]);

    const startTimeOut = (input,uid)=>{
        handleTimeOut(input,user.uid);
        console.log('this worked');
        db.collection('threads')
        .doc(threadId)
        .collection('messages')
        .where('message' ,'==' , input)
        .where('uid' ,'==' , uid)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                doc.ref
                .delete()
                .then(()=>{
                    console.log('Message deleted');
                })
                .catch((error)=>{
                    console.log('Error', error); 
                })
            })
        })
    }
    const handleTimeOut = (input,uid)=>{
        console.log(selfDestruct);
        if(selfDestruct !== null && selfDestruct !== '' && selfDestruct !=='0'){
            setTimeout(()=> startTimeOut(input,uid),parseInt(selfDestruct))
        }
    };

    return (
        <div className = "thread">
            <div className = "thread__header">
                <div className = "thread__headerDetails">
                    {threadId ? (<Avatar 
                        src = {user.photo}
                    />) : (<Avatar />)}
                    
                    <div className = "thread__headerDetails_info">
                        <h4>{ threadId ? threadName : "Click on any chat Name"}</h4>
    <h5>{ threadId ? (timeago.format(messages[0]?.timestamp?.toDate().toLocaleString())) : "last seen"}</h5>
                    </div>
                </div>
                <IconButton>
                    <MoreHorizIcon className = "thread__headerMoreHoriz"/>
                </IconButton>
            </div>
                <div className = "thread__messages">
                    <FlipMove>
                        { messages.map(({ id, data }) =>(
                        <Message key = {id} id = {id} data = {data} />
                    ))}
                    </FlipMove>
                    
                </div>
                <div className = "thread__input">
                    <form>
                        <IconButton>
                            <AttachFileOutlined/>
                        </IconButton>
                    <input 
                        placeholder = "Enter a message..." 
                        type = "text" 
                        value = {input}
                        onChange = {(e) => setInput(e.target.value)}
                    /> 
                    <IconButton
                    onClick = {() => setSelfDestruct(
                        prompt("Enter the delay in seconds to self destruct the message")
                    )}>
                            <TimerOutlinedIcon />
                        </IconButton> 
                    <IconButton 
                        onClick = {sendMessage} type = "submit">
                            <SendRoundedIcon />
                    </IconButton>       
                    <IconButton>
                            <MicNoneOutlinedIcon />
                        </IconButton>           
                    </form>
                </div>
        </div>
    )
}

export default Thread