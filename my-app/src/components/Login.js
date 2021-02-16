import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core'
import {auth,provider} from '../firebase'

const Login = () => {
    const signIn =()=>{
        auth.signInWithPopup(provider).catch((error)=> alert(error.message))
    }
    return (
        <div className="login">
            <div className="login_telegram">
            <img 
                    src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/100px-Telegram_2019_Logo.svg.png"
                    alt = "telgram logo"
                />
                <h1>Telegram</h1><br/><br/>
                {/* <img
                src={`${process.env.PUBLIC_URL}logo.webp`}/> */}
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
