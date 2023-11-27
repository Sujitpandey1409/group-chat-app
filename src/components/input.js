import React, { useState, useRef } from "react";
import axios from 'axios';
const BASE_URL = 'https://he-llo-app-by-sujit.onrender.com';
// const BASE_URL = 'http://localhost:4001/';

import './input.css'
const Input = (props) => {
    const [buttonValue, setbuttonValue] = useState('login')
    const [placeholder, setPlaceholder] = useState('Type your name')
    const [message, setMessage] = useState([])
    const inputdata = useRef(null)
    window.addEventListener('beforeunload', async() => {props.message(['lgn wth ur nme'], '', false);})
    let handleSubmit = async (e) => {
        e.preventDefault()
        if (buttonValue == 'login') {
            setbuttonValue('Send')
            setPlaceholder('Type your message')
            const input_val = inputdata.current.value
            inputdata.current.value = ''
            localStorage.setItem('user', input_val)
            props.message([], 'Adding a new member...' , false)
            try {
                const response = await axios.delete(BASE_URL)
                console.log('Message deleted:', response.data);
            }
            catch (error) {
                console.error('error deleting message:', error);
            }
            props.message([], "you're Added, "+input_val+' 😎' , true)
            // inputdata.current.value = ''
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