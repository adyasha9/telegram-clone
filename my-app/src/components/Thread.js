import React from 'react'
import {Avatar,IconButton} from '@material-ui/core'
import {MoreHoriz} from '@material-ui/icons'
import './Thread.css'
import {useState} from 'react'
const Thread = () => {
    const [input,setInput]= useState('');
    const sendMessage = (event) => {
        event.preventDefault();
        //firebase event
        setInput('')
    }

    console.log(input);
    return (
        <div className="thread">
           <div className="thread_header">
               <div className="thread_header_contents">
                   <Avatar/>
                   <div className="thread_header_content_info">
                       <h4>ThreadName</h4>
                       <h5>Last seen</h5>
                   </div>
               </div>
               <IconButton>
               <MoreHoriz className="thread_header_details"/>
           </IconButton>
           </div>
           <div className="thread_messages">

           </div>
           <div className="thread_input">
               <input placeholder="Write Message ..." type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
               <button onClick={sendMessage}>Send Message</button>
           </div>
        </div>
    )
}

export default Thread
