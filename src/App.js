import { useState, useEffect } from 'react';
import './App.css';
import Input from './components/input'
import axios from 'axios';
const BASE_URL = 'https://he-llo-app-by-sujit.onrender.com';
// const BASE_URL = 'http://localhost:4001/';

function App() {
  const [chats, setChats] = useState([])
  const [users, setusers] = useState([])
  const [isLoading, setLoading] = useState()
  const [isLogged, setlogged] = useState(false)
  // from submit action --input component
  let message = (chatVal,loadingStatus, setLogged) => {
    setChats(chatVal)
    setLoading(loadingStatus)
    setlogged(setLogged)
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setChats(response.data);
      let newUser = [...new Set(chats.map((el)=> {return "'"+el.user.trim()+"'"}))]
      if(!isLogged){newUser = newUser.filter(item => item !== "'"+localStorage.getItem('user')+"'");}
      setusers(newUser)
      // setusers([...new Set(chats.map((el)=> {return el.user}))])
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchData();


  // console.log('chats', chats);
  return (
    <div className="App">
      <header>
      <h1 title='HelloApp'>hello <i>{localStorage.getItem('user')}</i></h1>
      <h6>A Private Goup Chat App</h6>
      </header>
      <div><i>{isLoading}</i></div>
      <Input message={message} />
      <div className='chatBox'>{isLogged?(<b>your chatting zone:</b>):(<b>currently chatting:</b>)}
             {isLogged?(chats.map((mes, i) => {
          return (<div key={i}><b>{mes.user}</b>:{mes.message}</div>)
        })):(users.map((el,i)=>{return((<div key={i}><i> {el}</i>'' '</div>))}))}
      </div>
        
    </div>
  );
}

export default App;
