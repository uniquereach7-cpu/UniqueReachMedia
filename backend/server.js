const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const { name, email, phone, message } = req.body;
  const log = `Name: ${name}, Email: ${email}, Phone: ${phone}, Message: ${message}\n`;

  fs.appendFile('contact-data.txt', log, (err) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Message saved');
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
