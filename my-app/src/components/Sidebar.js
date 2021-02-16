import React , {useState, useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import {IconButton,Avatar} from '@material-ui/core';
import './Sidebar.css'
import SidebarThread from './SidebarThread'
import db,{auth} from '../firebase'
import {PhoneOutlined,QuestionAnswerOutlined,Settings} from '@material-ui/icons'
import {useSelector} from 'react-redux'
import {selectUser} from '../features/userSlice'

const Sidebar = () => {
    const user = useSelector(selectUser)
    const [thread, setThreads] = useState([]);

    useEffect(()=>{
        db.collection('threads').onSnapshot((snapshot)=> setThreads(snapshot.docs.map((doc)=>({
            id:doc.id, 
            data: doc.data(),
        }))))
    },[]);

    const addThread = () =>{
        const threadName = prompt('Enter a thread name' );
        if(threadName){
            db.collection('threads').add({
                threadName:threadName,
            })
        }
    };    
    
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
              <BorderColorOutlinedIcon onClick ={addThread}/>
              </IconButton>
          </div>
          <div className="sidebar_threads">
        {thread.map(({id,data:{threadName}}) => (
            <SidebarThread key={id} id={id} threadName={threadName}/>
        ))}
             
          </div>
          <div className="sidebar_bottom">
              <Avatar className="sidebar_bottom_avatar" onClick={()=> auth.signOut()}/>
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
