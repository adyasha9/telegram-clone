import React, { forwardRef }  from 'react'
import {Avatar} from '@material-ui/core'
import './Message.css'
import {selectUser} from '../features/userSlice'
import {useSelector} from 'react-redux'

const Message = forwardRef(({
    id,data:
    {
        timestamp,
        displayName,
        email,
        message,
        photo,
        uid
    }
}, ref) => {
    const user = useSelector(selectUser);
    return (
        <div ref={ref} className={`message ${user.email === email && `message_sender`}`}>
            <Avatar src={photo} className='message_photo'/>
            <div className="message_contents">
                <p>{message}</p>
                <small className="message_timestamp">{new Date(timestamp?.toDate()).toLocaleDateString()}</small>
            </div>
        </div>
    )
})

export default Message
