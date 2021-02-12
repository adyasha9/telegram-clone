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
                <img/>
                <h1>Telegram</h1>
            </div>
            <Button onclick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
