import { useState, useEffect } from 'react';
import './App.css';
import Input from './components/input'
import axios from 'axios';
const BASE_URL = 'https://he-llo-app.onrender.com';

function App() {
  const [chats, setChats] = useState([])
  // from submit action --input component
  let message = (val) => {
    setChats(val)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchData();


  console.log('chats', chats);
  return (
    <div className="App">
      <h1 title='hello App'>hello <i>{localStorage.getItem('user')}</i></h1>
      <Input message={message} />
      <div className='chatBox'>
        {chats.map((mes, i) => {
          return (<div key={i}><b>{mes.user}</b>:{mes.message}</div>)
        })}
      </div>
        
    </div>
  );
}

export default App;
