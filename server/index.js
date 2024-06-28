const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const port = 8080;

//middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../build'));
 
/* Connection to postgresql DB
*
*NOTE: I would never typically leave the connection string in the code like this, I would hide it in a .env.
*Same with the axios URLs on the front end. However I will leave them like this to make it easier for other people to run the app themselves.
*Nothing else is stored on this postgresql server
*/
massive({
    connectionString: 'postgresql://clarapricechallenge_owner:eVnIGhmM2cv8@ep-snowy-mud-a6j7b06a.us-west-2.aws.neon.tech/clarapricechallenge?sslmode=require',
    ssl: {
        rejectUnauthorized: false
    }
})
  .then((db) => {
    console.log('Connected to PostgreSQL Database');
    app.set('db', db);
  })
  .catch((err) => console.log(err));

//endpoints
app.get(`/api/getMessages`, (req, res) => {
  const db = req.app.get('db');
  db.get_messages().then((messages) => {
    res.status(200).send(messages)
  })
})
app.delete(`/api/deleteMessage/:message`, (req, res) => {
  const db = req.app.get('db');
  db.delete_message(req.params.message).then(() => {
    db.get_messages().then((messages) => {
      res.status(200).send(messages)
    })
  })
})
app.post(`/api/createMessage`, (req, res) => {
  const db = req.app.get('db');
  db.create_message(req.body.title, req.body.body).then(() => {
    db.get_messages().then((messages) => {
      res.status(200).send(messages)
    })
  })
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});