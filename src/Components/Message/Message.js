import React, {useState, useEffect} from 'react';
import './Message.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Message(props) {
    const {messageId} = useParams();
    const {messages, setMessages} = props;
    const [selectedMessage, setSelectedMessage] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        setSelectedMessage(messages.filter((message) => message.message_id == messageId)[0])
        axios.delete(`http://localhost:8080/api/deleteMessage/${messageId}`)
            .then(()=>{
                axios.get(`http://localhost:8080/api/getMessages`)
                    .then(result => {
                        setMessages(result.data);
                    })
            })
    }, [])
//setMessages(messages.filter((message) => message.message_id !== messageId)
   return (
    <div className="Message">
        <Modal
        open={true}
        onClose={()=>navigate(`/`)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedMessage.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {selectedMessage.body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}