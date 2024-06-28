import React, {useState} from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//Creates the list of existing messages
function messageGrid(messages, navigate){
  let jsxMessages = messages.map((message) => {
    return(
      <ListItem onClick={() => {
        //On click navigates to a unique URL based on the message ID using react-router-dom routing
        navigate(`/message/${message.message_id}`)
      }}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText
          primary={message.title}
        />
      </ListItem>
    )
  })
  return jsxMessages
}

export default function Home(props) {
  const {messages, setMessages} = props;
  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const navigate = useNavigate()
  
  return (
    <div className="Home">
      <h1>TMWSD Challenge</h1>
      <div className='form-container'>
        <h3>New Message</h3>
        <TextField
          id="outlined-text"
          label="Title"
          value={newTitle}
          onChange={e => {
            setNewTitle(e.target.value)
          }}
        />
        <TextField
          id="outlined-multiline-text"
          label="Message"
          multiline
          rows={4}
          value={newMessage}
          onChange={e => {
            setNewMessage(e.target.value)
          }}
        />
        <Button 
          variant="contained" 
          onClick={()=>{
            //Adds the message to the database and updates messages displayed in the app, resets title and message input fields
            axios.post(`http://localhost:8080/api/createMessage`, {title: newTitle, body: newMessage}).then(result => {
              setMessages(result.data)
              setNewTitle('')
              setNewMessage('')
            })
          }}
        >
          Submit
        </Button>
      </div>
      <div className='messages-container'>
        <h3>Messages</h3>
        <List>
          {messages.length > 0 ? messageGrid(messages, navigate) : <h4>No messages</h4>}
        </List>
      </div>
    </div>
  );
}