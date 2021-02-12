import React from 'react'
import {Avatar} from '@material-ui/core'
import './SidebarThread.scss';

const SidebarThread = () => {
    return (
        <div className="sidebarThread">
            <Avatar/>
            <div className="sidebarThread_details">
            <h3>Thread Name</h3>
            <p>This is the info </p>
            <small className="sidebarThread_timestamp">timestamp</small>
        </div>
        </div>
    )
}

export default SidebarThread
