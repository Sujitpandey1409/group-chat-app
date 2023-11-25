import React, { useState, useRef } from "react";
import axios from 'axios';
const BASE_URL = 'https://he-llo-app-by-sujit.onrender.com';

import './input.css'
const Input = (props) => {
    const [buttonValue, setbuttonValue] = useState('login')
    const [placeholder, setPlaceholder] = useState('Type your name')
    const [message, setMessage] = useState([])
    const inputdata = useRef(null)
    let handleSubmit = async (e) => {
        e.preventDefault()
        if (buttonValue == 'login') {
            setbuttonValue('Send')
            setPlaceholder('Type your message')
            localStorage.setItem('user', inputdata.current.value)
            try {
                const response = await axios.delete(BASE_URL)
                console.log('Message added:', response.data);
            }
            catch (error) {
                console.error('error adding message:', error);
            }
            props.message(['lgn wth ur nme'])
            inputdata.current.value = ''
        }
        else {
            // props.message([...message,localStorage.getItem('user')+':'+inputdata.current.value])
            setMessage([...message, { user: localStorage.getItem('user'), message: inputdata.current.value }]);
            console.log(message,'%%')
            try {
                const response = axios.post(BASE_URL, { user: localStorage.getItem('user'), message: inputdata.current.value })
                console.log('Message added:', response.data);
            }
            catch (error) {
                console.error('error adding message:', error);
            }
            
            const response = await axios.get(BASE_URL)
            // props.message(response.data)

            inputdata.current.value = ''
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="input-container">
                <input ref={inputdata} type="text" placeholder={placeholder} className="input-field" />
                <button className="send-button">{buttonValue}</button>
            </form>
        </div>
    )
}
export default Input