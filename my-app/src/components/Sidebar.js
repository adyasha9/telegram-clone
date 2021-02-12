import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import {IconButton,Avatar} from '@material-ui/core';
import './Sidebar.css'
import SidebarThread from './SidebarThread'
import {PhoneOutlined,QuestionAnswerOutlined,Settings} from '@material-ui/icons'

const Sidebar = () => {
    return (
        <div className="sidebar">
          <div className="sidebar_header">
              <div className="sidebar_search">
                  <SearchIcon className="sidebar_searchIcon" />
                  <input
                  placeholder="Search"
                  className="sidebar_input"/>
              </div>
              <IconButton variant="outlined" id="sidebar_button">
              <BorderColorOutlinedIcon />
              </IconButton>
          </div>
          <div className="sidebar_threads">
              <SidebarThread/>
              <SidebarThread/>
              <SidebarThread/>
             
          </div>
          <div className="sidebar_bottom">
              <Avatar/>
              <IconButton>
                  <PhoneOutlined/>
              </IconButton>
              <IconButton>
                  <QuestionAnswerOutlined/>
              </IconButton>
              <IconButton>
                  <Settings/>
              </IconButton>
          </div>
        </div>
    )
}

export default Sidebar
