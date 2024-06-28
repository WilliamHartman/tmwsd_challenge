import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Home from './Components/Home/Home.js'
import Message from './Components/Message/Message.js'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {  
  const [messages, setMessages] = useState([])
  
  //Gets existing messages on app load
  useEffect(() => {
    axios.get(`http://localhost:8080/api/getMessages`)
      .then(result => {
        setMessages(result.data);
      })
  }, [])

  //Contains the router so we can navigate to and from individual messages at unique URLs
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="" element={<Home messages={messages} setMessages={setMessages}/>}/>
          <Route path="/message/:messageId" element={<Message messages={messages} setMessages={setMessages}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
